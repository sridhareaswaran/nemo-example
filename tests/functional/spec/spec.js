
import { assert } from 'chai'
import GooglePage from '../flow/GooglePage'
import ResultsPage from '../flow/ResultsPage'

let chai = require('chai')
chai.use(require('chai-string'))

let nemo, google, results

describe('my test suite', _ => {
  before(async function () {
    nemo = this.nemo
    google = new GooglePage(nemo)
    results = new ResultsPage(nemo)
  })

  after(async function () {
  })

  it('@some test no 1', async function () {
    await google.navigateToHome()
    await google.searchFor(77)
    await nemo.driver.sleep(3000)
    assert.startsWith(await results.getPageTitle(), '77')
  })

  it('test no 2', async function () {
    assert.equal('foo', 'foo')
  })

  it('@some test no 3', async function () {
    let nemo = this.nemo
    let google = new GooglePage(nemo)
    await google.navigateToHome()
    await google.searchFor('Paypal')
    assert.startsWith(await results.getPageTitle(), 'Paypal')
  })

  it('test no 4', async function () {
    assert.equal('foo', 'foo')
  })

  it('@some test no 5', async function () {
    assert.equal('foo', 'foo')
  })
})
