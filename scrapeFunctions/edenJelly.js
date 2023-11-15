const dotenv = require('dotenv').config(); 

const puppeteer = require('puppeteer');

const { Pool } = require('pg')

const connectionESQL = process.env.DB_API_KEY

const pool = new Pool({
    connectionString: connectionESQL,
  });

async function scrapeEdenJellyFish() {
    const browser = await puppeteer.launch({
    headless: "new", // Set to true for headless mode, false for a visible browser
  });
    const page = await browser.newPage();
    await page.goto('https://edenxi.com/tools/item/4443?stack=true');

    const pageTitle = await page.title();

    // xpath
    await page.waitForSelector('.gm_item-name');
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

    await page.waitForSelector('table.ui.table');

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
    // console.log(`Item: ${productName} Price: ${priceCellText} Seller: ${seller} Date: ${dateSold}`);
    console.log(productName, priceCellText, seller, dateSold)

    await browser.close();
    
    // add date into ElephantSQL database
    pool.query(`
    INSERT INTO users (username, email)
    VALUES
      ('${seller}', '${dateSold}')
  `, (err, result) => {
    if (err) {
      console.error('Error entering data to users table', err);
    } else {
      console.log('Data inserted successfully');
    }
  });
};

module.exports = scrapeEdenJellyFish