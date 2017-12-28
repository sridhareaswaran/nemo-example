/* @flow */

import BasePage from './BasePage'

export default class ResultsPage extends BasePage {

  async getTitle () {
    return await this.nemo.driver.getTitle()
  }
}
