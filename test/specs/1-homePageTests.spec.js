import { browser} from '@wdio/globals'
import { expect} from 'chai'
import HomePage from '../pages/home.page.js'

describe('Home Page Tests', () => {
    
    beforeEach('', async()=> {
        await HomePage.initialize()
        await browser.url('https://qafellas-estate.onrender.com/')
        const title = await browser.getTitle()
        expect(title).to.equal('QaFellas Estate')
        const url = await browser.getUrl()
        expect(url.includes('qafellas-estate')).to.be.true
    })

    it('should see required web elements on Home Page', async () => {
         //await browser.pause(5000)
        expect(await HomePage.searchIcon.isDisplayed()).to.be.true
        expect(await HomePage.aboutPageBtn.isClickable()).to.be.true
        expect(await HomePage.searchPageBtn.isDisplayed()).to.be.true
        expect(await HomePage.basicSearchBox.isDisplayed()).to.be.true
    })

    it('should search a listing on Home Page', async () => {
        const searchWord = 'Green stylish'
        await HomePage.basicSearchBox.addValue(searchWord)
        await HomePage.searchIcon.click()
        const resultText = await HomePage.searchListingTitle.getText()
        expect(resultText.includes(searchWord)).to.be.true
    })
})