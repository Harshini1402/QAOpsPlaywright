const { test, expect } = require('@playwright/test');
{
   test('playwright locators', async({page})=>
     {
        const slowexpect=expect.configure({timeout:9000})
        await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").click();
    await page.getByPlaceholder("Password").fill("H@rshini14");
    await page.getByRole("button",{name :'submit'}).click();
    slowexpect(page.locator(".my-4").first()).toHaveTex("Shop");
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout:10_000});
    await page.getByRole("link",{name :"Shop"}).click();
    await page.locator("app-card").filter({hasText:'Samsung Note 8'}).getByRole("button").click();

})
}