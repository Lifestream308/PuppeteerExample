const puppeteer = require('puppeteer');

async function scrapeFunction() {

    const browser = await puppeteer.launch({
    headless: "new", // Set to true for headless mode, false for a visible browser
  });
    const page = await browser.newPage();
    await page.goto('https://www.supercheats.com/');
    // await page.goto('https://www.target.com/p/coca-cola-10pk-7-5-fl-oz-mini-cans/-/A-51139832');

    const pageTitle = await page.title();

    // xpath
    const [element] = await page.$x('//*[@id="pdp-product-title-id"]');

    // const text = await element.getProperty('textContent')
    // const rawText = await text.jsonValue()


    console.log('Page Title:', pageTitle);
    // console.log('Text:', rawText);

    await browser.close();
};

scrapeFunction()