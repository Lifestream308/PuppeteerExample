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

async function scrapeEdenJellyFish() {
    const browser = await puppeteer.launch({
    headless: "new", // Set to true for headless mode, false for a visible browser
  });
    const page = await browser.newPage();
    await page.goto('https://edenxi.com/tools/item/4443?stack=true');

    const pageTitle = await page.title();

    // xpath
    const [productNamePath] = await page.$x('//*[@id="root"]/div/div[1]/div/div/div/div/div/div/div[2]/div/div[2]/div[1]/div[1]/div/text()');
    const text = await productNamePath.getProperty('textContent')
    const rawText = await text.jsonValue()
    
    // const [pricePath] = await page.$x('');
    // const priceContent = await pricePath.getProperty('textContent')
    // const priceContent = await pricePath.innerHTML()
    // const rawPrice = await priceContent.jsonValue()

    const tbodyElement = await page.$('table tbody tr:nth-child(1) td:nth-child(4)');
    const cellText = await page.evaluate(tableData => tableData.textContent, tbodyElement);

    console.log('Eden Page Title:', pageTitle);
    console.log('Item Text:', rawText);
    console.log('Price:', cellText);

    await browser.close();
};

// scrapeTarget()
scrapeEdenJellyFish()