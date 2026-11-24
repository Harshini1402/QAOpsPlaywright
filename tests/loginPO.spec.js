
const { test, expect } = require('@playwright/test');
const { Login } = require('../utils/login');

test('End-to-End testing using POM', async ({ page }) => {

    const login = new Login(page);

    const email = "RHARSHINI14@GMAIL.COM";
    const password = "H@rshini14";
    const productName = "iphone 13 pro";

    // Login
    await login.goTo();
    await login.validLogin(email, password);

    // Add product to cart
    await login.addProductToCart(productName);

    // Verify product in cart
    await login.openCart();

    await expect(page.locator("h3:has-text('iphone 13 pro')")).toBeVisible();

    // Checkout
    await login.checkoutProduct();

    // Apply coupon
    await login.applyCoupon();

    await expect(login.couponApplied).toBeVisible();

    /// Select country
await login.selectCountry("India");

// Verify email
await expect(page.locator(".user__name input[type='text']")).toHaveValue(email);

// Place order
const orderId = await login.placeYourOrder();

// Navigate to My Orders
await login.openMyOrders();

// Verify order ID
const orderFound = await login.verifyOrder(orderId);

console.log("Order matched:", orderFound);

expect(orderFound).toBeTruthy();

});


