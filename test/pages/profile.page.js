class ProfilePage{
    async initialize(){
        this.signOut = await $('//span[text()="Sign out"]')
    }

}
export default new ProfilePage()