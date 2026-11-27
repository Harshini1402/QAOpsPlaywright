
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { Login } = require('../../utils/login');

let login;
let orderId;

Given('login Ecommerce application with {string} and {string}', async function (username, password) {

    login = new Login(this.page);

    await login.goTo();

    await login.validLogin(username, password);

});

When('Add {string} to the cart', async function (productName) {

    await login.addProductToCart(productName);

});

Then('verify {string} should be displayed in the cart', async function (productName) {

    await login.openCart();

    await expect(
        this.page.locator(`h3:has-text("${productName}")`)
    ).toBeVisible();

});

When('Enter valid details and Place the order', async function () {

    await login.checkoutProduct();

    await login.applyCoupon();

    await expect(login.couponApplied).toBeVisible();

    await login.selectCountry("India");

    await expect(this.page.locator(".user__name input[type='text']")).toHaveValue("RHARSHINI14@GMAIL.COM");

    orderId = await login.placeYourOrder();

});

Then('Verify order is present in the OrderHistory', async function () {

    await login.openMyOrders();

    const orderFound = await login.verifyOrder(orderId);

    expect(orderFound).toBeTruthy();

});
