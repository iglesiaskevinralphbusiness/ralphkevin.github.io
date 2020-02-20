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

    
    it('Get listing', async () => {
        m_series = JSON.parse(await fs.readFileSync(__dirname + '/json/series.json', 'utf8'));
        m_list = JSON.parse(await fs.readFileSync(__dirname + '/json/list.json', 'utf8'));

        //generate date today
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd; } 
        if (mm < 10) { mm = '0' + mm; } 
        var today = dd + '_' + mm + '_' + yyyy;

        const link_list = [];
        let result_list = m_list;
        
        m_series.map(serie => {
            serie.lists.map(list => {
                link_list.push(list.link);
            });
        });

        for (let i = 0; i < link_list.length; i++) {
        //for (let i = 0; i < 2; i++) {

            const filter_exist = result_list.find(l => l.url == link_list[i]);
            if(!filter_exist){
                const pageResult = await page.goto(link_list[i],{ waitUntil: 'load', timeout: 0 });
                
                if(pageResult._status != '404'){
                    await page.waitForSelector('#wrapper_body', { waitUntil: 'load', timeout: 0 });
                    const url = await page.url();

                    const list = await page.evaluate((url) => {
                        const properties = document.querySelector('#mangaproperties');
                        const image = document.querySelector('#mangaimg > img').src;
                        const name = properties.querySelector('table > tbody > tr:nth-child(1) > td:nth-child(2) h2').textContent;
                        const alternative_name = properties.querySelector('table > tbody > tr:nth-child(2) > td:nth-child(2)').textContent;
                        const year_release = properties.querySelector('table > tbody > tr:nth-child(3) > td:nth-child(2)').textContent;
                        const status = properties.querySelector('table > tbody > tr:nth-child(4) > td:nth-child(2)').textContent;
                        const author = properties.querySelector('table > tbody > tr:nth-child(5) > td:nth-child(2)').textContent;
                        const artist = properties.querySelector('table > tbody > tr:nth-child(6) > td:nth-child(2)').textContent;
                        const reading_direction = properties.querySelector('table > tbody > tr:nth-child(7) > td:nth-child(2)').textContent;

                        const genres = Array.from(properties.querySelectorAll('table > tbody > tr:nth-child(8) > td:nth-child(2) > a'));
                        const genre_list = genres.map(genre => {
                            return {
                                name: genre.querySelector('span').textContent,
                                link: genre.href,
                            }
                        });

                        const chapters = document.querySelector('#listing');
                        const chapters_rows = Array.from(chapters.querySelectorAll('tr:not(.table_head)'));
                        const chapters_list = chapters_rows.map((chapter, index) => {
                            return {
                                order_id: index,
                                name: chapter.querySelector('td:nth-child(1) > a').innerHTML,
                                link: chapter.querySelector('td:nth-child(1) > a').href,
                                release_date: chapter.querySelector('td:nth-child(2)').textContent,
                            }
                        });
                        
                        return {
                            url: url,
                            name: name,
                            image: image,
                            alternative_name: alternative_name,
                            year_release: year_release,
                            status: status,
                            author: author,
                            artist: artist,
                            reading_direction: reading_direction,
                            genre: genre_list,
                            chapters: chapters_list
                        }
                    }, url);
                    
                    result_list.push(list);
                    fs.writeFileSync(`src/json/list.json`, JSON.stringify(result_list));
                    fs.writeFileSync(`src/json/_list/list_${ today }.json`, JSON.stringify(result_list));
                    console.log(list['name']);
                }
            }
        }
        
    });
    


});