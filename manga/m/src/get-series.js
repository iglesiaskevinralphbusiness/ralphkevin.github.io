const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const fs = require('fs');


describe('Handling Hooks', () => {
    let browser;
    let page;

    //hooks content here
    before(async function(){
        browser = await puppeteer.launch({
            headless: true,       //for debuging
            slowMo: 0,             //delay beetween puppeteer actions
            devtools: false,       //opens developer tools to browser
            timeout: 10000         //max time of the browser to launch
        });
        page = await browser.newPage();
        await page.setViewport({
            width: 800,
            height: 600
        });

        m_series = [];
        m_list = [];
        m_chapters = [];
    });

    after(async function(){
        await browser.close();
    });

    it('Get series', async () => {
        await page.goto('http://www.mangareader.net/alphabetical', { waitUntil: 'load', timeout: 0 });
        await page.waitForSelector('div.series_alpha');

        //generate date today
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd; } 
        if (mm < 10) { mm = '0' + mm; } 
        var today = dd + '_' + mm + '_' + yyyy;

        const result_list = await page.evaluate(() => {
            const results = Array.from(document.querySelectorAll('div.series_alpha'));
            return results.map(result => {
                const lists = Array.from(result.querySelectorAll('ul.series_alpha li'));
                const listings = lists.map(list => {
                    const name = list.querySelector('a').textContent;
                    const link = list.querySelector('a').href;
                    return {
                        name: name,
                        link: link,
                    }
                });
                return {
                    series: result.querySelector('h2.series_alpha a').textContent,
                    lists: listings
                }
            });
        });
        m_series = result_list;
        fs.writeFileSync(`src/json/series.json`, JSON.stringify(result_list));
        fs.writeFileSync(`src/json/_series/series_${ today }.json`, JSON.stringify(result_list));
    });
});