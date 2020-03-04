const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const fs = require('fs');

(async () => {
    let browser;
    let page;
    browser = await puppeteer.launch({
        headless: false,       //for debuging
        slowMo: 0,             //delay beetween puppeteer actions
        devtools: false,       //opens developer tools to browser
        timeout: 10000,         //max time of the browser to launch
    });
    page = await browser.newPage();
    await page.setViewport({
        width: 800,
        height: 600
    });

    m_list = JSON.parse(await fs.readFileSync(__dirname + '/xml/sitemap_index.json', 'utf8'));


    const checkip = 'https://proxybot.io/api/v1/QkCgBmZ9OChzXSgIFgmIjO0pFgm2?url=https://whatismyipaddress.com/';
    await page.goto(checkip, {timeout: 180000});

    for (let i = 0; i < m_list.length; i++) {
        const prox = 'https://proxybot.io/api/v1/QkCgBmZ9OChzXSgIFgmIjO0pFgm2?url=';
        const url = m_list[i];
        const path = prox + url;

        await page.goto(path, {timeout: 180000});
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });
        await autoScroll(page);
        const rand = 0 + Math.random() * (3000 - 0);
        await page.waitFor(rand);
        console.log(url);
    }

    await browser.close();
})();


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}