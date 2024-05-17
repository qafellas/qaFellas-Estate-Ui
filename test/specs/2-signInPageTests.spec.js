import { browser, $, $$ } from '@wdio/globals'
import { expect} from 'chai'

describe('Sign in Tests', ()=>{

    beforeEach('', async()=> {
        await browser.url('https://qafellas-estate.onrender.com/')
        const title = await browser.getTitle()
        expect(title).to.equal('QaFellas Estate')
        const url = await browser.getUrl()
        expect(url.includes('qafellas-estate')).to.be.true
    })

    it('should get error message when user email is invalid', async()=>{
        await $('//li[text()=" Sign in"]').click()
        await $('#email').setValue("wert@gmail.com")
        await $('#password').setValue('xyz123')
        await $('//input[@id="password"]//following-sibling::button[1]').click()
        const warningMessage = await $('.text-red-500.mt-5').getText()
        expect(warningMessage).to.equal('User not found!')
    })

    it('should get error message when password is invalid', async()=>{
        await $('//li[text()=" Sign in"]').click()
        await $('#email').setValue("xyz@gmail.com")
        await $('#password').setValue('ededdbdb')
        const signInButton = await $('//input[@id="password"]//following-sibling::button[1]')
        await signInButton.click()
        await browser.waitUntil(async function () {
            return (await signInButton.isEnabled()) === true
          }, {
            timeout: 5000,
            timeoutMsg: 'wait condition is not satisfied during 5s'
          })
        const warningMessage = await $('.text-red-500.mt-5').getText()
        expect(warningMessage).to.equal('Wrong credentials!')
    })

    it('should login successfuly with valid email and password', async()=>{
        await $('//li[text()=" Sign in"]').click()
        await $('#email').setValue("xyz@gmail.com")
        await $('#password').setValue('xyz123')
        await $('//input[@id="password"]//following-sibling::button[1]').click()
        await browser.pause(2000)
        const userIcon = await $('a[href="/profile"]')
        expect(await userIcon.isDisplayed()).to.be.true
        await userIcon.click( {force: true} )
        await $('//span[text()="Sign out"]').waitForDisplayed()
        await $('//span[text()="Sign out"]').click()
    })

})