const puppeteer = require('puppeteer');

async function scrapeEdenJellyFish() {
    const browser = await puppeteer.launch({
    headless: "new", // Set to true for headless mode, false for a visible browser
  });
    const page = await browser.newPage();
    await page.goto('https://edenxi.com/tools/item/4443?stack=true');

    const pageTitle = await page.title();

    // xpath
    const [productNamePath] = await page.$x('//*[@id="root"]/div/div[1]/div/div/div/div/div/div/div[2]/div/div[2]/div[1]/div[1]/div/text()');
    const productTextContent = await productNamePath?.getProperty('textContent')
    const productName = await productTextContent?.jsonValue()
    // this worked as of 11/10/2023 but it sometimes doesn't work? Just note that it seems to not always work
    
    // const [pricePath] = await page.$x('');
    // const priceContent = await pricePath.getProperty('textContent')
    // const priceContent = await pricePath.innerHTML()
    // const rawPrice = await priceContent.jsonValue()

    // before table is accessible, need to click the dropdown. Maybe don't need to click? just need to use waitForSelector with the table element?
    await page.waitForSelector('.title');

    const dropDownElement = await page.$$('[class="title"]');
    if (dropDownElement) {
      await dropDownElement[0].click();
      const firstElementText = await page.evaluate(el => el.textContent, dropDownElement[0]);
      console.log(firstElementText);
    } else {
      console.error('Element not found');
    }

    const priceCellText = await page.$eval('table tbody tr:nth-child(1) td:nth-child(4)', (cell) => {
      return cell.textContent.trim();
    });

    const seller = await page.$eval('table tbody tr:nth-child(1) td:nth-child(2)', (cell) => {
      return cell.textContent.trim();
    });

    const dateSold = await page.$eval('table tbody tr:nth-child(1) td:nth-child(1)', (cell) => {
      return cell.textContent.trim();
    });

    console.log('Eden Page Title:', pageTitle);
    console.log(`Item: ${productName} Price: ${priceCellText} Seller: ${seller} Date: ${dateSold}`);

    await browser.close();
};

module.exports = scrapeEdenJellyFish