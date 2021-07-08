//Dependencies
const Puppeteer = require("puppeteer")

//Variables
var URL_WPayload = "http://testphp.vulnweb.com/listproducts.php?cat=s"

//Main
Main()
async function Main(){
    const browser = await Puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    var is_vulnerable = false
    
    page.on("dialog", dialog =>{
        is_vulnerable = true
        dialog.accept()
    })

    await page.goto(URL_WPayload)

    browser.close()
    if(is_vulnerable){
        console.log("It's vulnerable to XSS.")
    }else{
        console.log("It's not vulnerable to XSS.")
    }
}
