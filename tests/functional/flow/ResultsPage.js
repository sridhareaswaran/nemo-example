import BasePage from './BasePage'

export default class ResultsPage extends BasePage {

  async getPageTitle () {
    return await this.nemo.driver.getTitle()
  }
}
