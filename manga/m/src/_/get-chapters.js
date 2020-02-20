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

        //generate date today
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd; } 
        if (mm < 10) { mm = '0' + mm; } 
        var today = dd + '_' + mm + '_' + yyyy;

        m_series = [];
        m_list = [];
        m_chapters = [];
    });

    after(async function(){
        await browser.close();
    });
    

    
    it('Get chapters', async () => {
        m_list = JSON.parse(await fs.readFileSync(__dirname + '/json/list.json', 'utf8'));
        m_chapters = JSON.parse(await fs.readFileSync(__dirname + '/json/chapters.json', 'utf8'));

        let result_list = m_chapters;

        for (let i = 0; i < m_list.length; i++) {
            const manga_url = m_list[i].url;
            const chapters = m_list[i].chapters;
            const chapters_result = [];

            const filter_exist = result_list.find(l => l.manga_url == manga_url);
            if(!filter_exist){

                for (let j = 0; j < chapters.length; j++) {
                    const chapter_order_id = chapters[j].order_id;
                    const chapter_name = chapters[j].name;
                    const chapter_url = chapters[j].link;
                    const chapter_release_date = chapters[j].release_date;
                    console.log(chapter_url);
                    await page.goto(chapter_url, { waitUntil: 'load', timeout: 0 });
                    await page.waitForSelector('#chapterMenu option', { waitUntil: 'load', timeout: 0 });

                    const episodes_list = await page.evaluate(() => {
                        const episodes = Array.from(document.querySelectorAll('#chapterMenu option'));
                        return episodes.map((e,index) => {
                            return {
                                order_id: index,
                                name: e.textContent,
                                link: 'http://www.mangareader.net' + e.getAttribute('value')
                            }
                        });
                    });
                    console.log('catch all episodes');
                    
                    let episodes_list_compiled = [];
                    for (let k = 0; k < episodes_list.length; k++) {
                        const episode_url = episodes_list[k].link;

                        await page.goto(episode_url, { waitUntil: 'load', timeout: 0 });
                        await page.waitForSelector('#img', { waitUntil: 'load', timeout: 0 });
                        const episodes_img = await page.evaluate(() => {
                            return document.querySelector('#img').src;
                        });
                        episodes_list_compiled.push({
                            order_id: episodes_list[k].e_order_id,
                            name: episodes_list[k].name,
                            url: episodes_list[k].link,
                            image: episodes_img
                        });
                    }
                    console.log(`compiled successfull - ${j + 1} out of ${chapters.length}`);

                    chapters_result.push({
                        order_id: chapter_order_id,
                        name: chapter_name,
                        release_date: chapter_release_date,
                        url: chapter_url,
                        episodes: episodes_list_compiled
                    });
                }
                result_list.push({
                        manga_url: manga_url,
                        chapters: chapters_result
                });
                fs.writeFileSync(`src/json/chapters.json`, JSON.stringify(result_list));
                fs.writeFileSync(`src/json/_chapters/chapters_${ today }.json`, JSON.stringify(result_list));
                console.log('pushed successfull one manga complete chapter');
            }
        }

    });

});