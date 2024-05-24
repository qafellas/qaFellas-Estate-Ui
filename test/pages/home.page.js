class HomePage{
    /**
     * Holds page locators
     */
    async initialize(){
        this.searchIcon = await $('//*[@class="text-slate-600"]')
        this.aboutPageBtn = await $('a[href="/about"]')
        this.searchPageBtn = await $('//a[text()="Let\'s get started..."]')
        this.basicSearchBox = await $('[placeholder="Search..."]')
        this.searchListingTitle = await $('(//a[contains(@href, "/listing")]//p)[1]')
        this.signInPageBtn = await $('//li[text()=" Sign in"]')
        this.userIcon = await $('a[href="/profile"]')
    }

    //specific actions if necessary
}
export default new HomePage()