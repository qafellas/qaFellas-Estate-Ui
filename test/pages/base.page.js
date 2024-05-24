import { browser } from '@wdio/globals'
import { expect } from 'chai'
import testData from '../data/testData.js'
export default class Base{
    async open(){
        await browser.url(testData.url)
        const title = await browser.getTitle()
        expect(title).to.equal('QaFellas Estate')
        const url = await browser.getUrl()
        expect(url.includes('qafellas-estate')).to.be.true
    }
}