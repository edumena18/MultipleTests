import { $ } from '@wdio/globals';
import { expect } from '@wdio/globals';
import bottomClass from './bottomClass.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends bottomClass {
    /**
     * define selectors using getter methods
     */
    get usernameField () {
        return $('#user-name');
    }

    get passwordField () {
        return $('#password');
    }

    get menuShowing () {
        return $('[aria-hidden="false"]');
    }

    get menuNotShowing () {
        return $('[hidden="true"]');
    }

    get loginButton () {
        return $('[name="login-button"]');
    }

    get addItem () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get shoppingCar () {
        return $('#shopping_cart_container');
    }

    get checkoutButton (){
        return $('#checkout');
    }

    get firstNameField (){
        return $('#first-name');
    }

    get lastNameField (){
        return $('#last-name');
    }

    get zipCodeField (){
        return $('#postal-code');
    }

    get continueButton (){
        return $('#continue');
    }

    get finishButton (){
        return $('[name="finish"]');
    }

    get failCredsAlert () {
        return $('[data-test="error"]')
    }

    get burgerMenu(){
        return $('.bm-burger-button')
    }

    get productPageTitle () {
        return $('//span[@class="title"][contains(text(), "Products")]')
    }

    get logoutButtom () {
        return $('#logout_sidebar_link')
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username,password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }

    async failCredentialsAlert(username,password){
        await this.login(username,password)
        await expect(this.failCredsAlert).toExist()
    }

    async correctUserLogin(username,password){
        await this.login(username,password);
        await expect(this.productPageTitle).toExist();
    }

    async logout(){
        await this.menuNotShowing.waitForEnabled({ timeout: 3000 })
        await this.burgerMenu.click();
        await this.burgerMenu.moveTo();
        await this.menuShowing.waitForEnabled({ timeout: 3000 }) 
        await this.logoutButtom.click();
    }

    async burguerMenu (){
        await this.burgerMenu.click()
    }

    async addItemCar(){
        await this.addItem.click()
        await browser.pause(1000)
    }

    async shopCarContainer(){
        await this.shoppingCar.click()
        await browser.pause(1000)

    }

    async checkout(){
        await this.checkoutButton.click()
    
    }

    async yourInfo(firstName, LastName, zipCode){
        await this.firstNameField.setValue(firstName)
        await this.lastNameField.setValue(LastName)
        await this.zipCodeField.setValue(zipCode)

    }

    async continuePurchaseStep(){
        (await this.continueButton).click()
    }

    async lastPurchaseStep(){
        await this.finishButton.click()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    goToUrl () {
        return super.goToUrl();
    }
}

export default new LoginPage();