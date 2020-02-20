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
        m_chapters_compiled = [];
    });

    after(async function(){
        await browser.close();
    });
    

    it('Compiled chapters', async () => {
        m_chapters = JSON.parse(await fs.readFileSync(__dirname + '/json/chapters.json', 'utf8'));
        let result_list = [];

        for (let i = 0; i < m_chapters.length; i++) {
            const manga_url = m_chapters[i].manga_url;
            const chapters = m_chapters[i].chapters;
            let chapters_list = [];
            
            for (let j = 0; j < chapters.length; j++) {
                const c_order_id = chapters[j].order_id;
                const c_name = chapters[j].name;
                const c_release_date = chapters[j].release_date;
                const c_url = chapters[j].url;
                const c_episodes = chapters[j].episodes;
                let episodes_list = [];

                for (let k = 0; k < c_episodes.length; k++) {
                    const e_order_id = c_episodes[k].order_id;
                    const e_name = c_episodes[k].name;
                    const e_url = c_episodes[k].link;

                    await page.goto(e_url, { waitUntil: 'load', timeout: 0 });
                    await page.waitForSelector('#img');

                    const episodes_img = await page.evaluate(() => {
                        return document.querySelector('#img').src;
                    });
                    console.log(episodes_img)
                    episodes_list.push({
                        order_id: e_order_id,
                        name: e_name,
                        url: e_url,
                        image: episodes_img
                    });
                }

                chapters_list.push({
                    order_id: c_order_id,
                    name: c_name,
                    release_date: c_release_date,
                    url: c_url,
                    episodes: episodes_list
                });

            }

            result_list.push({
                manga_url: manga_url,
                chapters: chapters_list
            });
        }

        m_chapters_compiled = result_list;
        fs.writeFileSync(`src/json/chapters_compiled.json`, JSON.stringify(result_list));
        fs.writeFileSync(`src/json/_chapters_compiled/chapters_compiled_${ Date.now() }.json`, JSON.stringify(result_list));
    });

});