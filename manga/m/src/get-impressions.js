const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const fs = require("fs");

(async () => {
  for (i = 0; i <= 300; i++) {
    let browser;
    let page;
    browser = await puppeteer.launch({
      headless: false, //for debuging
      slowMo: 0, //delay beetween puppeteer actions
      devtools: false, //opens developer tools to browser
      timeout: 10000, //max time of the browser to launch
      args: ["--incognito"]
    });
    [page] = await browser.pages();
    await page.setViewport({
      width: 800,
      height: 600
    });
    await page.goto("http://mangariot.com/ads/all.html", {
      waitUntil: "load",
      timeout: 0
    });
    await page.waitForSelector("body", {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 0
    });
    console.log(`browser: ${i + 1}`);
    await page.waitFor(400000);

    await browser.close();
  }
})();
