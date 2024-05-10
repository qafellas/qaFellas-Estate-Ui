import { browser, $, $$ } from '@wdio/globals'
import { expect} from 'chai'

describe('Home Page Tests', () => {

    beforeEach('', async()=> {
        await browser.url('https://qafellas-estate.onrender.com/')
        const title = await browser.getTitle()
        expect(title).to.equal('QaFellas Estate')
        const url = await browser.getUrl()
        expect(url.includes('qafellas-estate')).to.be.true
    })

    it('should see required web elements on Home Page', async () => {
         //await browser.pause(5000)
        expect(await $('//*[@class="text-slate-600"]').isDisplayed()).to.be.true
        expect(await $('a[href="/about"]').isClickable()).to.be.true
        expect(await $('//a[text()="Let\'s get started..."]').isDisplayed()).to.be.true
        expect(await $('[placeholder="Search..."]').isDisplayed()).to.be.true
    })

    it('should search a listing on Home Page', async () => {
        const searchWord = 'Green stylish'
        await $('[placeholder="Search..."]').addValue(searchWord)
        await $('//*[@class="text-slate-600"]').click()
        const resultText = await $('(//a[contains(@href, "/listing")]//p)[1]').getText()
        expect(resultText.includes(searchWord)).to.be.true
    })
})