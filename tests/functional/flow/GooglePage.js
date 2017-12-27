// @flow

import BasePage from './BasePage'

export default class GooglePage extends BasePage {

  async navigateToHome () {
    let nemo = this.nemo
    await nemo.driver.get(nemo.data.baseUrl)
  }

  async searchFor (data: any) {
    await this.nemo.view.google.searchBox().sendKeys(data)
  }
}
