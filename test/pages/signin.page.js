class SignInPage{

    async initialize(){
        this.emailBox = await $('#email')
        this.passwordBox = await $('#password')
        this.signInBtn =  await $('//input[@id="password"]//following-sibling::button[1]')
        this.errorNotice = await $('.text-red-500.mt-5')
    
    }
}
export default new SignInPage()