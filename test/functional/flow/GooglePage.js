// @flow

const BasePage = require('./BasePage')

class GooglePage extends BasePage {

  async navigateToHome () {
    let nemo = this.nemo
    await nemo.driver.get(nemo.data.baseURL)
  }

  async searchFor (data) {
    await this.nemo.view.google.searchBox().sendKeys(data)
  }
}

module.exports = GooglePage
