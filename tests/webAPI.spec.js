const { test, expect,request } = require('@playwright/test');
const loginpayload={"userEmail":"RHARSHINI14@GMAIL.COM","userPassword":"H@rshini14"}
let token;
const orderpayload={"orders":[{"country":"India","productOrderedId":"6960eac0c941646b7a8b3e68"}]}
let orderId;

test.beforeAll(async()=>
{
const apicontext=await request.newContext();
const loginresponse= await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginpayload
    })
    expect((loginresponse).ok()).toBeTruthy();
    const loginresponsejson=  await loginresponse.json();
    token= loginresponsejson.token;
    console.log(token);
    const orderReponse=await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderpayload,
            headers:{
                  authorization:token,
                  'Content-Type':'application/json'

            },
        })
        const orderReponsejson=await orderReponse.json();
        console.log(orderReponsejson);
       orderId = orderReponsejson.orders[0];

})


test("app end to end automation", async ({page})=>
 {
     await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token);
 await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
});

