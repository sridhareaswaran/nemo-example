/* @flow */

import BasePage from './BasePage'
import { Key } from 'selenium-webdriver'

export default class GooglePage extends BasePage {

  async navigate () {
    let nemo = this.nemo
    await nemo.driver.manage().window().maximize()
    await nemo.driver.get(nemo.data.baseUrl)
  }

  async searchFor (data) {
    let nemo = this.nemo
    let google = nemo.view.google

    await google.searchBox().sendKeys(data)
    await this.pressEnter()
  }

  async clickOnAppsIcon () {
    let nemo = this.nemo
    let google = nemo.view.google

    await google.appsIcon().click()
  }
}
