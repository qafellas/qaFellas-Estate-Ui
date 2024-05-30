class ProfilePage{

    /**
     * Holds page locators
     */
    async initialize(){
        this.signOut = await $('//span[text()="Sign out"]')
        this.deleteUserBtn = await $('//span[text()="Delete account"]')
    }

}
export default new ProfilePage()