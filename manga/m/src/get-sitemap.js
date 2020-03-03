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

        m_list = [];
        m_chapters = [];
    });

    after(async function(){
        await browser.close();
    });

    it('Generate Sitemap', async () => {
        m_list = JSON.parse(await fs.readFileSync(__dirname + '/json/list.json', 'utf8'));
        m_chapters = JSON.parse(await fs.readFileSync(__dirname + '/json/chapters.json', 'utf8'));

        //generate date today
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) { dd = '0' + dd; }
		if (mm < 10) { mm = '0' + mm; }
        
        const last_mod = yyyy + '-' + mm + '-' + dd;
        const defaultStart = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            <url>
                <loc>http://mangariot.com/</loc>
                <lastmod>${last_mod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>http://mangariot.com/top-manga/</loc>
                <lastmod>${last_mod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>http://mangariot.com/latest-release/</loc>
                <lastmod>${last_mod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>http://mangariot.com/manga-list/</loc>
                <lastmod>${last_mod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>`;
        const defaultEnd = `</urlset>`;
        let defaultValue = '';

        m_list.map(l => {
            const url = l.url;
            const manga_url = 'http://mangariot.com' + url.replace("http://www.mangareader.net", "");

            defaultValue = defaultValue + `<url>
                <loc>${manga_url}</loc>
                <lastmod>${last_mod}</lastmod>
                <priority>0.9</priority>
            </url>`;

            l.chapters.map(c => {
                m_chapters.filter(mc => mc.url == c.link).map(mcc => {
                    const url = mcc.url;
                    const chapter_url = 'http://mangariot.com' + url.replace("http://www.mangareader.net", "");

                    defaultValue = defaultValue + `<url>
                        <loc>${chapter_url}</loc>
                        <lastmod>${last_mod}</lastmod>
                        <priority>0.8</priority>
                    </url>`;
                })
            })
        })

        defaultValue
        let defaultCompiled = defaultStart + defaultValue + defaultEnd;

        fs.writeFileSync(`src/xml/sitemap_index.xml`, defaultCompiled);
        fs.writeFileSync(`src/xml/_sitemap/sitemap_${last_mod}.xml`, defaultCompiled);
    });
});