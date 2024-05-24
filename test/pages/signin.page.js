import Base from "./base.page.js";

class SignInPage extends Base {
  /**
   * Holds page locators
   */
  async initialize() {
    this.emailBox = await $("#email");
    this.passwordBox = await $("#password");
    this.signInBtn = await $(
      '//input[@id="password"]//following-sibling::button[1]'
    );
    this.errorNotice = await $(".text-red-500.mt-5");
    this.signUpNavBtn = await $('//span[text()="Sign up"]')
    this.usernameBox = await $('#username')
    this.signUpBtn = await $('//button[text()="Sign Up"]')
  }

  /**
   * Navigate to the website
   */
  async open() {
    super.open();
  }

  /**
   *Login the website 
   * @param {*} email
   * @param {*} password 
   */
  async login(email, password) {
    await this.emailBox.setValue(email);
    await this.passwordBox.setValue(password);
    await this.signInBtn.click();
    this.loginHeader = await $('//h1[text()="Sign In"]')
  }
 
  /**
   * Sign up with new user
   * @param {*} username 
   * @param {*} email 
   * @param {*} password 
   */
  async signUp(username, email, password){
    await this.usernameBox.setValue(username)
    await this.emailBox.setValue(email)
    await this.passwordBox.setValue(password)
    await this.signUpBtn.click()
  }

}
export default new SignInPage();
