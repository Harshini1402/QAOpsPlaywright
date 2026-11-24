const{test,expect}=require('playwright/test');
let webContext;

test.beforeAll(async({browser})=>

{
    const context=await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("RHARSHINI14@GMAIL.COM");
   await page.getByPlaceholder("enter your passsword").fill("H@rshini14");
   await page.locator("[type='submit']").click();
   await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'auth.json' });
   webContext=await browser.newContext({storageState:'auth.json'});

})
test('client app',async()=>
{
     const page =await webContext.newPage();
     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
     const titles= page.locator(".card-body b");
   await page.locator("#userEmail").fill("RHARSHINI14@GMAIL.COM");
   await page.getByPlaceholder("enter your passsword").fill("H@rshini14");
   await page.locator("[type='submit']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").nth(0).textContent());
      //console.log (await titles.allTextContents());
      const allcard=await titles.allTextContents();
      console.log(allcard);
    });
    
   test('playwright locators', async({page})=>
     {
        const slowexpect=expect.configure({timeout:9000})
        await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").click();
    await page.getByPlaceholder("Password").fill("H@rshini14");
    await page.getByRole("button",{name :'submit'}).click();
    slowexpect(page.locator(".my-4").first()).toHaveText("Shop");
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout:10_000});
    await page.getByRole("link",{name :"Shop"}).click();
    await page.locator("app-card").filter({hasText:'Samsung Note 8'}).getByRole("button").click();

});

