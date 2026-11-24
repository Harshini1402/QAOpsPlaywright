

const { test: base } = require('@playwright/test');

exports.test = base.extend({

    login: async ({ page }, use) => {

        // Login setup
        await page.goto('https://rahulshettyacademy.com/client');

        await page.locator("#userEmail").fill("RHARSHINI14@GMAIL.COM");
   await page.locator("[placeholder='enter your passsword']").fill("H@rshini14");
   await page.locator("[type='submit']").click();
        await page.locator('[type="submit"]').click();
        await use(page);
        
        console.log('Login fixture completed');
    }

});
