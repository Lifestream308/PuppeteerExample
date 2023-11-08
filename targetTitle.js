const puppeteer = require('puppeteer');

async function scrapeTarget() {
    const browser = await puppeteer.launch({
    headless: "new", // Set to true for headless mode, false for a visible browser
  });
    const page = await browser.newPage();
    await page.goto('https://www.target.com/p/coca-cola-10pk-7-5-fl-oz-mini-cans/-/A-51139832');

    const pageTitle = await page.title();

    // xpath
    const [element] = await page.$x('//*[@id="pdp-product-title-id"]');
    const [price] = await page.$x('//*[@id="above-the-fold-information"]/div[4]/div/span/span[1]');

    const text = await element.getProperty('textContent')
    const rawText = await text.jsonValue()

    const priceContent = await price.getProperty('textContent')
    const rawPrice = await priceContent.jsonValue()


    console.log('Page Title:', pageTitle);
    console.log('Text:', rawText);
    console.log('Price:', rawPrice);

    await browser.close();
};

module.exports = scrapeTarget