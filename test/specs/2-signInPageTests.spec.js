import { browser } from '@wdio/globals'
import { expect} from 'chai'
import HomePage from '../pages/home.page.js'
import SignInPage from '../pages/signin.page.js'
import ProfilePage from '../pages/profile.page.js'

describe('Sign in Tests', ()=>{

    beforeEach('', async()=> {
        await HomePage.initialize()
        await SignInPage.initialize()
        await ProfilePage.initialize()
        await browser.url('https://qafellas-estate.onrender.com/')
        const title = await browser.getTitle()
        expect(title).to.equal('QaFellas Estate')
        const url = await browser.getUrl()
        expect(url.includes('qafellas-estate')).to.be.true
    })

    it('should get error message when user email is invalid', async()=>{
        await HomePage.signInPageBtn.click()
        await SignInPage.emailBox.setValue("wert@gmail.com")
        await SignInPage.passwordBox.setValue('xyz123')
        await SignInPage.signInBtn.click()
        const warningMessage = await SignInPage.errorNotice.getText()
        expect(warningMessage).to.equal('User not found!')
    })

    it('should get error message when password is invalid', async()=>{
        await HomePage.signInPageBtn.click()
        await SignInPage.emailBox.setValue("xyz@gmail.com")
        await SignInPage.passwordBox.setValue('ededdbdb')
        const signInButton = SignInPage.signInBtn
        await signInButton.click()
        await browser.waitUntil(async function () {
            return (await signInButton.isEnabled()) === true
          }, {
            timeout: 5000,
            timeoutMsg: 'wait condition is not satisfied during 5s'
          })
        const warningMessage = await SignInPage.errorNotice.getText()
        expect(warningMessage).to.equal('Wrong credentials!')
    })

    it('should login successfuly with valid email and password', async()=>{
        await HomePage.signInPageBtn.click()
        await SignInPage.emailBox.setValue("xyz@gmail.com")
        await SignInPage.passwordBox.setValue('xyz123')
        await SignInPage.signInBtn.click()
        await browser.pause(2000)
        const userIcon = HomePage.userIcon
        expect(await userIcon.isDisplayed()).to.be.true
        await userIcon.click( {force: true} )
        await ProfilePage.signOut.waitForDisplayed()
        await ProfilePage.signOut.click()
    })

})