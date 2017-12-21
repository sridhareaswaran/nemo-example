// @flow

import BasePage from './BasePage'

export default class GooglePage extends BasePage {
  page = this.nemo.view.google

  async navigateToHome () {
    await this.nemo.driver.get(this.nemo.data.baseURL)
  }

  async searchFor (data: string | number) {
    await this.page.searchBox().sendKeys(data)
  }
}
