import BasePage from '../flow/BasePage'
import {
  logging
} from 'selenium-webdriver'
const os = require('os')
const moment = require('moment-timezone')
const dt = moment().tz('America/Los_Angeles')
const Promise = require('bluebird')
const cmd = require('node-cmd')
const color = require('colors/safe')

const getAsync = Promise.promisify(cmd.get, {
  multiArgs: true,
  context: cmd
})

export default class Util extends BasePage {

  /* Nemo way of taking screenshots, saved in 'report' dir */
  async snap(name) {
    await this.nemo.screenshot.snap(name || 'screenshot')
  }

  /* Selenium way of taking screenshots, attached to allure report */
  async attachScreenshot(_allure, _name) {
    const img = await this.driver.takeScreenshot()
    _allure.createAttachment(_name, new Buffer(img, 'base64'))
  }

  async takeScreenshot() {
    return await this.driver.takeScreenshot()
  }

  async getOSType() {
    let data = await os.type()
    return data.replace('_', ' ')
  }

  async getOSRelease() {
    return await os.release()
  }

  async getNodeVersion() {
    return await process.version
  }

  async getBrowser() {
    let mapObj = await this.driver.getCapabilities()
    let data = mapObj.get('browserName')
    return data === undefined ? 'not specified' : data
  }

  async getBrowserVer() {
    let data
    let mapObj = await this.driver.getCapabilities()
    let browser = await this.getBrowser()
    browser = browser.toUpperCase()
    if (browser === 'CHROME') {
      data = mapObj.get('version')
    } else if (browser === 'FIREFOX') {
      data = mapObj.get('browserVersion')
    }
    return data === undefined ? 'not specified' : data
  }

  async getDriverVersion() {
    let version
    let browser = await this.getBrowser()
    browser = browser.toUpperCase()
    if (browser === 'CHROME') {
      version = await getAsync('chromedriver --version').then(info => {
        return info[0].replace(/\s\([0-9a-z]*\)/g, '').trim()
      }).catch(err => {
        let msg = err
      })
    } else if (browser === 'FIREFOX') {
      /* getting firefox driver version via cmd-line */
      version = await getAsync('geckodriver --version').then(info => {
        return `${info[0].split('\n')[0].replace(/[a-z]+/g, '').trim()}`
      }).catch(err => {
        let msg = err
      })
    }
    return version === undefined ? 'Unable to fetch driver details' : version
  }

  async getPageTitle() {
    return await this.nemo.driver.getTitle()
  }

  async getUrlOf(webElement) {
    let data = await this.nemo.view._waitVisible(webElement).getAttribute('href')
    return data.trim()
  }

  async deleteAllCookies() {
    await this.nemo.driver.manage().deleteAllCookies()
  }

  async getBaseDir() {
    let baseDir = await __dirname
    baseDir = baseDir.replace('util', '')
    baseDir = baseDir.replace('functional\\', '')
    baseDir = baseDir.replace('tests\\', '')
    return baseDir
  }

  async getTodayDate() {
    return dt.format('MM/DD/YYYY')
  }

  async getFutureDate(daysToAdd) {
    return dt.add(daysToAdd, 'days').format('MM/DD/YYYY')
  }

  async getPastDate(daysToSub) {
    return dt.subtract(daysToSub, 'days').format('MM/DD/YYYY')
  }

  async getTodayDateForSiteCreation() {
    return dt.format('MM-DD-YYYY')
  }

  /* Takes Unix timestamp and returns human readable timestamp */
  async getTimeStamp(data) {
    return moment(data).format('HH:mm:ss:SSS')
  }

  async getBrowserLog() {
    let browserLog = await this.driver.manage().logs().get(logging.Type.BROWSER)
    let attachmentLog = ''
    for (let bLog of browserLog) {
      let tStamp = await this.getTimeStamp(bLog.timestamp)
      attachmentLog = attachmentLog + '[' + bLog.level.name_ + '] ' + tStamp + '  ' + bLog.message + '\n'
    }
    return attachmentLog
  }

  async beforeEachTest() {}

  async beforeAllTest(test) {
    console.log(color.yellow('\n\t►► ') + test.parent.title)
  }

  async afterEachTest(allure, test) {
    if (test.state === 'passed') {
      console.log(color.green('\n\t\t✔ ') + test.title)

      /* clear browser log for CHROME browser */
      if (await this.getBrowser() === 'chrome') {
        await this.driver.manage().logs().get('browser')
      }
    }

    if (test.state === 'failed') {
      console.log(color.red('\n\t\t✘ ') + test.title)
      const img = await this.takeScreenshot()
      allure.createAttachment(test.title, new Buffer(img, 'base64'))

      /* fetch browser log for CHROME browser */
      if (await this.getBrowser() === 'chrome') {
        let attachmentLog = await this.getBrowserLog()
        allure.createAttachment('Browser log', new Buffer(attachmentLog))
      }
    }
  }


}
