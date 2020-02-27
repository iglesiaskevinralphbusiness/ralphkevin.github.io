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

        top = [];
        pages = [
            "http://www.mangareader.net/popular",
            "http://www.mangareader.net/popular/30",
            "http://www.mangareader.net/popular/60",
            "http://www.mangareader.net/popular/90",
            "http://www.mangareader.net/popular/120"
        ];
    });

    after(async function(){
        await browser.close();
    });

    it('Get series', async () => {
        //generate date today
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd; } 
        if (mm < 10) { mm = '0' + mm; } 
        var today = dd + '_' + mm + '_' + yyyy;

        let index_inc = 0;
        for (let i = 0; i < pages.length; i++) {
            const url = pages[i];
            console.log(url)
            const page1 = await page.goto(url, { waitUntil: 'load', timeout: 0 });
            if (page1._status == '200') {
                await page.waitForSelector('#mangaresults');

                const get_list = await page.evaluate((index_inc) => {
                    const mangas = Array.from(document.querySelectorAll('#mangaresults .mangaresultinner'));
                    return mangas.map((manga, index) => {
                        index_inc = index_inc + 1;
                        return {
                            order_id: index_inc,
                            name: manga.querySelector('.manga_name > div:nth-child(1) > h3 > a').textContent,
                            url: manga.querySelector('.manga_name > div:nth-child(1) > h3 > a').href,
                        }
                    });
                },index_inc);
                top = top.concat(get_list);
                console.log('gotcha!');
            }
            else {
                i = 0;
                top = [];
                console.log('failed to open page: ' + page1._status + '. Recrawling...');
            }

        }

        
        
        fs.writeFileSync(`src/json/top.json`, JSON.stringify(top));
        fs.writeFileSync(`src/json/_top/top_${ today }.json`, JSON.stringify(top));
    });
});