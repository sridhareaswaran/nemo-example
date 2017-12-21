// @flow

import BasePage from './BasePage'

export default class GooglePage extends BasePage {

  async navigateToHome () {
    await this.nemo.driver.get(this.nemo.data.baseURL)
  }

  async searchFor (data: string | number) {
    await this.nemo.view.google.searchBox().sendKeys(data)
  }
}
