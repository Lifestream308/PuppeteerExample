const puppeteer = require('puppeteer');

async function testSite(website) {
    const browser = await puppeteer.launch({
    headless: "new", // Set to true for headless mode, false for a visible browser
  });
    const page = await browser.newPage();
    await page.goto(website);

    const pageTitle = await page.title();

    console.log(`Page Title: ${pageTitle}`);

    await browser.close();
};

module.exports = testSite