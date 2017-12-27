// @flow

import { assert } from 'chai'
import GooglePage from '../flow/GooglePage'

describe('my test suite', _ => {
  before(async function () {
  })

  after(async function () {
  })

  it('@some test no 1', async function () {
    let nemo = this.nemo
    let google = new GooglePage(nemo)
    await google.navigateToHome()
    await google.searchFor(77)
  })

  it('test no 2', async function () {
    assert.equal('foo', 'foo')
  })

  it('@some test no 3', async function () {
    let nemo = this.nemo
    let google = new GooglePage(nemo)
    await google.navigateToHome()
    await google.searchFor('Paypal')
  })

  it('test no 4', async function () {
    assert.equal('foo', 'foo')
  })

  it('@some test no 5', async function () {
    assert.equal('foo', 'foo')
  })
})
