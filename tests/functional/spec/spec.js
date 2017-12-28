/* @flow */

import { assert } from 'chai'
import GooglePage from '../flow/GooglePage'
import ResultsPage from '../flow/ResultsPage'

let chai = require('chai')
chai.use(require('chai-string'))

let nemo, googlePG, resultsPG

describe('my test suite', _ => {
  before(async function () {
    nemo = this.nemo
    googlePG = new GooglePage(nemo)
    resultsPG = new ResultsPage(nemo)
  })

  after(async function () {
  })

  it('@some test no 1', async function () {
    await googlePG.navigate()
    await googlePG.searchFor(77)
    await nemo.driver.sleep(3000)
    assert.startsWith(await resultsPG.getTitle(), '77')
  })

  it('test no 2', async function () {
    assert.equal('foo', 'foo')
  })

  it('@some test no 3', async function () {
    await googlePG.navigate()
    await googlePG.clickOnAppsIcon()
    await googlePG.clickOnAppsIcon()
    await googlePG.searchFor('Paypal')
    assert.startsWith(await resultsPG.getTitle(), 'Paypal')
  })

  it('test no 4', async function () {
    assert.equal('foo', 'foo')
  })

  it('@some test no 5', async function () {
    assert.equal('foo', 'foo')
  })
})
