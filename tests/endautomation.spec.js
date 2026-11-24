const { test, expect } = require('@playwright/test');
const path = require('node:path');
{
    test('playwright locators', async({page})=>
    {
     const text=page.getByText("Your tickets are reserved.");
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
     await page.getByPlaceholder("you@email.com").fill("rharshini14@gmail.com");
     await page.getByPlaceholder("••••••").fill("H@rshini1431");
     await page.getByRole("button", {name :'Sign In ' }).click();
     await page.getByRole("link",{name :'Events',exact:true}).click();
     await page.getByRole("link",{name:'Book Now'}).nth(0).click();
     await page.getByRole("button",{name :'+'}).click();
     await expect(page.getByText('2', { exact: true })).toBeVisible();
     await page.locator("#customerName").fill("Harshini");
     await page.locator('#customer-email').fill("rharshini14@gmail.com");
     await page.locator("#phone").fill("1234567890");
     await page.getByRole("button",{name :'Confirm Booking'}).click();
     await page.getByText("Your tickets are reserved.").isVisible();
      await expect(page.getByText("Your tickets are reserved.")).toBeVisible 
     await page.pause();

    })

  test('playwright end-to end events',async ({page})=>
     {
     await page.goto("https://eventhub.rahulshettyacademy.com/login");
     await page.getByPlaceholder("you@email.com").fill("rharshini14@gmail.com");
     await page.getByPlaceholder("••••••").fill("H@rshini1431");
     await page.getByRole("button", {name :'Sign In ' }).click();
    await expect(page.getByText('Browse Events →')).toBeVisible();
    await page.getByRole("button",{name :'Admin'}).click();
    await page.getByRole("link",{name :'Manage Events'}).nth(0).click();
    await page.getByPlaceholder("Event title").fill("Hip-Hop Aadhi Concert");
    await page.getByPlaceholder("Describe the event…").fill("Music concert of aadhi bro ");
    await page.locator("#category").selectOption("Concert");
    await page.getByPlaceholder("e.g. Bangalore").fill("Chennai");
    await page.getByPlaceholder("Venue name & address").fill("YMCA Nandanam");
   await page.locator('[id="event-date-&-time"]').fill('2026-10-31T18:30');
    await page.getByPlaceholder("0.00").fill("1623");
    await page.locator("#total-seats").fill("500");
    await page.getByRole( "button",{name :"+ Add Event"}).click();
    await expect(page.getByText('Event created!')).toBeVisible();
    await page.getByRole("link",{name :"Events"}).first().click();
    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(eventCards.first()).toBeVisible();
    const eventTitle = "Hip-Hop Aadhi Concert";
    const matchedCard = eventCards.filter({ hasText: eventTitle });
    await expect(matchedCard).toBeVisible();
    const seats = await matchedCard.locator("span.text-emerald-600").innerText();
const seatsBeforeBooking =await parseInt(seats);
console.log("Seats before booking:", seatsBeforeBooking);
const matchedtitle = page.locator('[data-testid="event-card"]') .filter({ hasText: "Hip-Hop Aadhi Concert" });
await matchedtitle.getByRole('link', { name: 'Book Now' }).click();
await expect(page.locator('#ticket-count')).toHaveText('1')
await page. getByPlaceholder("Your full name").fill("Harshini");
await page.getByPlaceholder("you@email.com").fill("rharshini14@gmail.com");
await page.getByPlaceholder("+91 98765 43210").fill( "98765 43210");
await page.getByRole("button",{name :'Confirm Booking'}).click();
const bookingRefElement = page.locator('.booking-ref').first();
await expect(bookingRefElement).toBeVisible();
const bookingRef = (await bookingRefElement.innerText()).trim();
console.log('Booking Reference:', bookingRef);
await page.getByRole("button",{name :"View My Bookings"}).click();
await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    const bookingCards = page.locator('#booking-card');
    await expect(bookingCards.first()).toBeVisible();
    const matchedBooking = bookingCards.filter({has: page.locator('.booking-ref').filter({hasText: bookingRef }) });
    await expect(matchedBooking).toBeVisible();
    await expect(matchedBooking).toContainText(eventTitle);
    console.log('Booking verified successfully:', bookingRef);
    console.log('Event title verified:', eventTitle);
     await page.goto("https://eventhub.rahulshettyacademy.com/events");
     const eventCardsAfterBooking = page.locator('[data-testid="event-card"]');
    await expect(eventCardsAfterBooking.first()).toBeVisible();
    const matchedCardAfterBooking = eventCardsAfterBooking.filter({ hasText: eventTitle});
    await expect(matchedCardAfterBooking).toHaveCount(1);
    await expect(matchedCardAfterBooking).toBeVisible();
    const seatsAfter = await matchedCardAfterBooking  .locator('span.text-emerald-600')  .innerText();
    const seatsAfterBooking = parseInt(seatsAfter);
    console.log('Seats before booking:', seatsBeforeBooking);
    console.log('Seats after booking:', seatsAfterBooking);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
    console.log('Seat reduction verified successfully!');
    await page.pause();
     })



     test("validation",async({page})=>
    {
       await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
       await page.goto("https://chatgpt.com/");
     await page.goBack();
       await page.goForward();
       await page.goBack();
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#displayed-text").screenshot({ path: 'partialscreenhot.png' });
        await page.locator("#hide-textbox").click();
        await page.screenshot({ path: 'screenshot.png' });
        
          await expect(page.locator("#displayed-text")).toBeHidden();
          await page.locator("#confirmbtn").click();
          page.on('dialog',dialog=>dialog.accept());
         const framepage = page.frameLocator("#courses-iframe");
         await framepage.getByRole("link", { name: "All Access Plan" }).click();
         // const textxheck =await page.getByText("13,522");
        //  console.log(textxheck);
          await page.pause()
})


 test.only("visual testing",async({page})=>
{
  await page.goto("https://rahulshettyacademy.com/");
  expect(await page.screenshot()).toMatchSnapshot("screen.png");
})
}