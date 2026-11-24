const { test,expect}=require('@playwright/test');
test('Browser context Playwright',async({browser})=>
{
const Context=await browser.newContext();
const page=await Context.newPage();
await page.goto("https://www.google.com/");
 await expect(page).toHaveTitle("Google")
 console.log(await page.title("Google"))
});

test('Page Context playwright',async function({page})
{
  await page.goto("https://www.amazon.com/");
});

test('Page firstn playwright',async function({page})
{
  await page.goto("https://web.whatsapp.com/");
   
  
});


test('client app',async({page})=>
{
  const titles= page.locator(".card-body b");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill("RHARSHINI14@GMAIL.COM");
   await page.locator("[placeholder='enter your passsword']").fill("H@rshini14");
   await page.locator("[type='submit']").click();
   //await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").nth(0).textContent());
      //console.log (await titles.allTextContents());
      const allcard=await titles.allTextContents();
      console.log(allcard);
    });
    test('UI Basics',async({page})=>
    {
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator("select.form-control").selectOption("consult");
       //await page.pause();
       await page.locator(".radiotextsty").last().click();
       await page.locator("#okayBtn").click();
       await expect(  page.locator(".radiotextsty").last()).toBeChecked();
        console.log( await page.locator(".radiotextsty").last().isChecked());
       await page.locator("#terms").click();
        await expect (page.locator("#terms")).toBeChecked();
       console.log(await page.locator('#terms').isChecked());
       await page.locator("#terms").uncheck();
      expect(await page.locator('#terms')).not.toBeChecked();
      await  expect(page.locator("a.blinkingText").first()).toHaveAttribute("class","blinkingText");

    });
test('@Child windows handling', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),
      documentLink.click(),
     await page.pause()
   ])
  })
  /* const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(text);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })*/
 /*test("app end to end automation", async ({page})=>
 {
 await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
const username=page.locator("#userEmail");
const password=page.locator("#userPassword");
const sigin=page.locator("#login");
const ProductName='ZARA COAT 3'
const products=page.locator(".card-body");
const CardTitles=page.locator('.card-body b');
 await username.fill("RHARSHINI14@GMAIL.COM");
 await password.fill("H@rshini14");
 await sigin.click();
 await CardTitles.first().waitFor();
 const allTitles=await CardTitles.allTextContents();
  console.log(allTitles);
 const count=await products.count();

 for(let i=0; i<count; ++i)
 {
   if(await products.nth(i).locator("b").textContent()===ProductName)
   {
       await products.nth(i).locator("text= Add To Cart").click();
       console.log(ProductName);
       
       break;
   }

}
await page.locator("button.btn.btn-custom").nth(2).click();

// Wait for the cart item to appear
await page.locator("div li").first().waitFor();

// Verify the product is present in the cart
await expect(page.locator('h3:has-text("ZARA COAT 3")')).toBeVisible();
await page.locator('input[type="button"]').click();
await page.pause();

});*/



/*test.only("End-to-End testing", async ({ page }) => {

    const email = "gunashreel@gmail.com";
    const productName = "iphone 13 pro";

    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");

    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");

    // Login
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill(email);
    await password.fill("Gunashree@2003");
    await login.click();

    await cardTitles.first().waitFor();

    // Select product and add to cart
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const title = await products.nth(i).locator("b").textContent();

        if (title.trim() === productName) {
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }

    // Verify product in cart
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    await expect(
        page.locator("h3:has-text('iphone 13 pro')")
    ).toBeVisible();

    // Checkout
    await page.getByText("Checkout", { exact: true }).click();

    await page.locator("[type='text']").nth(1).fill("86438675");
    await page.locator("[type='text']").nth(2).fill("Gunashree");
    await page.locator("[type='text']").nth(3).fill("rahulshettyacademy");

    await page.locator("[type='submit']").click();

    // Verify coupon applied
    await page.getByText("* Coupon Applied").waitFor();
    await expect(page.getByText("* Coupon Applied")).toBeVisible();

    // Country dropdown
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");

    const options = page.locator(".ta-results");
    await options.waitFor();

    const dropdownCount = await options.locator("button").count();

    for (let i = 0; i < dropdownCount; i++) {
        const country = await options.locator("button").nth(i).textContent();

        if (country.trim() === "India") {
            await options.locator("button").nth(i).click();
            break;
        }
    }

    // Verify email
    await expect(
        page.locator(".user__name [type='text']").first()).toHaveValue(email);

    // Place order
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary"))
        .toHaveText(" Thankyou for the order. ");

    // Capture order ID
    const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).trim();

    console.log("Placed Order ID:", orderId);

    // Navigate to My Orders
    await page.locator("[routerlink*='myorders']").last().click();

    const orders = page.locator("tbody tr");
    await orders.first().waitFor();

    const productCount = await orders.count();
    console.log("Total orders:", productCount);

    // Find the matching order ID
    let orderFound = false;

    for (let i = 0; i < productCount; i++) {
        const id = (await orders.nth(i).locator("th").textContent()).trim();

        console.log("Current Order ID:", id);

        if (id === orderId) {
            console.log("Order ID matched:", id);
            orderFound = true;
            await page.pause();
            break;
        }
    }

    expect(orderFound).toBeTruthy();

});*/


