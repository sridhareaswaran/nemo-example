/* @flow */

import { Key } from 'selenium-webdriver'

export default class BasePage {
  nemo

  constructor (resolvedNemo) {
    this.nemo = resolvedNemo
  }

  async pressEnter () {
    await this.nemo.driver.actions().sendKeys(Key.ENTER).perform()
  }
  
  async pressTAB () {
    await this.nemo.driver.actions().sendKeys(Key.TAB).perform()
  }

}
