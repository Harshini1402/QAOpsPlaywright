
class Login {

    constructor(page) {
        this.page = page;

        // Login
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");

        // Products
        this.products = page.locator(".card-body");
        this.cardTitles = page.locator(".card-body b");

        // Cart
        this.cart = page.locator("[routerlink*='cart']");

        // Checkout
        this.checkout = page.getByText("Checkout", { exact: true });
        this.couponApplied = page.getByText("* Coupon Applied");

        // Country
        this.country = page.locator("[placeholder*='Country']");
        this.countryOptions = page.locator(".ta-results");

        // Order
        this.placeOrder = page.locator(".action__submit");
        this.orderConfirmation = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

        // My Orders
        this.myOrders = page.locator("[routerlink*='myorders']");
        this.orders = page.locator("tbody tr");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email, password) {
        await this.username.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.cardTitles.first().waitFor();
    }

    async addProductToCart(productName) {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const title = await this.products.nth(i)
                .locator("b").textContent();

            if (title.trim() === productName) {
                await this.products.nth(i)
                    .locator("text=Add To Cart").click();
                return;
            }
        }

        throw new Error("Product not found: " + productName);
    }

    async openCart() {
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();
    }

    async checkoutProduct() {
        await this.checkout.click();
    }

    async applyCoupon() {
        await this.page.locator("[type='text']").nth(1).fill("86438675");
        await this.page.locator("[type='text']").nth(2).fill("Gunashree");
        await this.page.locator("[type='text']").nth(3).fill("rahulshettyacademy");

        await this.page.locator("[type='submit']").click();
        await this.couponApplied.waitFor();
    }

    async selectCountry(countryName) {
        await this.country.pressSequentially("Ind");
        await this.countryOptions.waitFor();

        const count = await this.countryOptions.locator("button").count();

        for (let i = 0; i < count; i++) {
            const country = await this.countryOptions
                .locator("button").nth(i).textContent();

            if (country.trim() === countryName) {
                await this.countryOptions.locator("button").nth(i).click();
                return;
            }
        }

        throw new Error("Country not found: " + countryName);
    }

   async placeYourOrder() {
    await this.placeOrder.click();
    await this.orderConfirmation.waitFor();

    const confirmationText = await this.orderId.textContent();
    const match = confirmationText.match(/[a-f0-9]{24}/i);

    if (!match) {
        throw new Error("Order ID not found");
    }

    const orderId = match[0];
    console.log("Placed Order ID:", orderId);

    return orderId;
}

    async openMyOrders() {
        await this.myOrders.last().click();
        await this.orders.first().waitFor();
    }

  async verifyOrder(orderId) {
    const count = await this.orders.count();

    for (let i = 0; i < count; i++) {
        const id = (await this.orders.nth(i)
            .locator("th").textContent()).trim();

        console.log("Current Order ID:", id);

        if (id === orderId) {
            return true;
        }
    }

    return false;
}
}

module.exports = { Login };

