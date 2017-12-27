// @flow

import BasePage from './BasePage'
import { Key } from 'selenium-webdriver'

export default class GooglePage extends BasePage {

  async navigateToHome () {
    let nemo = this.nemo
    await nemo.driver.manage().window().maximize()
    await nemo.driver.get(nemo.data.baseUrl)
  }

  async searchFor (data: any) {
    let nemo = this.nemo
    await nemo.view.google.searchBox().sendKeys(data)
    await this.pressEnter()
  }
}
