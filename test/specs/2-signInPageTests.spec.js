import { browser } from '@wdio/globals'
import { expect} from 'chai'
import testData from '../data/testData.js'
import HomePage from '../pages/home.page.js'
import SignInPage from '../pages/signin.page.js'
import ProfilePage from '../pages/profile.page.js'
import { generateNum } from '../utils/generateRandomNum.js'

describe('Sign in Tests', ()=>{

    beforeEach('', async()=> {
        await HomePage.initialize()
        await SignInPage.initialize()
        await ProfilePage.initialize()
        await SignInPage.open()
        
    })

    it('should get error message when user email is invalid', async()=>{
        await HomePage.signInPageBtn.click()
        await SignInPage.login(testData.invalidEmail, testData.password)
        const warningMessage = await SignInPage.errorNotice.getText()
        expect(warningMessage).to.equal('User not found!')
    })

    it('should get error message when password is invalid', async()=>{
        await HomePage.signInPageBtn.click()
        await SignInPage.login(testData.email, testData.invalidPassword)
        await browser.waitUntil(async function () {
            return (await SignInPage.signInBtn.isEnabled()) === true
          }, {
            timeout: 5000,
            timeoutMsg: 'wait condition is not satisfied during 5s'
          })
        const warningMessage = await SignInPage.errorNotice.getText()
        expect(warningMessage).to.equal('Wrong credentials!')
    })

    it('should login successfuly with valid email and password', async()=>{
        await HomePage.signInPageBtn.click()
        await SignInPage.login(testData.email, testData.password)
        await browser.pause(2000)
        const userIcon = HomePage.userIcon
        expect(await userIcon.isDisplayed()).to.be.true
        await userIcon.click( {force: true} )
        await ProfilePage.signOut.waitForDisplayed()
        await ProfilePage.signOut.click()
    })

    it('should sign up new user', async()=>{
        const randomNum = generateNum()
        const user = 'user15' + randomNum
        const password = 'pwd15' + randomNum
        console.log(`User ==> ${user} and password ==> ${password}`)
        await HomePage.signInPageBtn.click()
        await SignInPage.signUpNavBtn.click()
        await SignInPage.signUp(user, `${user}@gmail.com`, password)
        await SignInPage.loginHeader.waitForDisplayed()
        expect(await SignInPage.loginHeader.isDisplayed()).to.be.true
        await SignInPage.login(`${user}@gmail.com`, password )
        await browser.refresh()
        await browser.pause(2000)
        await HomePage.initialize()
        const userIcon = HomePage.userIcon
        expect(await userIcon.isDisplayed()).to.be.true
        await userIcon.click({force: true})
        await ProfilePage.deleteUserBtn.waitForDisplayed()
        await ProfilePage.deleteUserBtn.click()
    })

})