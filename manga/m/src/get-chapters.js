const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const fs = require('fs');


describe('Handling Hooks', () => {
	let browser;
	let page;

	//hooks content here
	before(async function () {
		browser = await puppeteer.launch({
			headless: false,       //for debuging
			slowMo: 0,             //delay beetween puppeteer actions
			devtools: false,       //opens developer tools to browser
			timeout: 15000,         //max time of the browser to launch
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			ignoreHTTPSErrors: true,
			dumpio: false
		});
		page = await browser.newPage();
		await page.setViewport({
			width: 800,
			height: 600
		});

		await page.setRequestInterception(true);
		page.on('request', request => {
			if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet' || request.resourceType() === 'font')
				request.abort();
			else
				request.continue();
		});

		m_series = [];
		m_list = [];
		m_chapters = [];
	});

	after(async function () {
		await browser.close();
	});



	it('Get chapters', async () => {
		m_list = JSON.parse(await fs.readFileSync(__dirname + '/json/list.json', 'utf8'));
		m_chapters = JSON.parse(await fs.readFileSync(__dirname + '/json/chapters.json', 'utf8'));
		let result_list = m_chapters;

		//generate date today
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) { dd = '0' + dd; }
		if (mm < 10) { mm = '0' + mm; }
		var today = dd + '_' + mm + '_' + yyyy;


		for (let i = 0; i < m_list.length; i++) {
			const manga_url = m_list[i].url;
			const chapters = m_list[i].chapters;


			for (let j = 0; j < chapters.length; j++) {
				const chapter_order_id = chapters[j].order_id;
				const chapter_name = chapters[j].name;
				const chapter_url = chapters[j].link;
				const chapter_release_date = chapters[j].release_date;

				const filter_exist = result_list.find(l => l.manga_url == manga_url && l.url == chapter_url);
				if (!filter_exist) {

					const pageResult = await page.goto(chapter_url, { waitUntil: 'load', timeout: 0 });
					console.log(chapter_url + " -> response:" + pageResult._status);
					if (pageResult._status != '404') {
						await page.waitForSelector('#chapterMenu option', { waitUntil: 'load', timeout: 0 });

						const episodes_list = await page.evaluate(() => {
							const episodes = Array.from(document.querySelectorAll('#chapterMenu option'));
							return episodes.map((e, index) => {
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
							console.log(`${k} loop`);
							const episode_url = episodes_list[k].link;
							console.log(`${episode_url}`);

							const pageResult = await page.goto(episode_url, { waitUntil: 'networkidle2', timeout: 60000 });
							console.log('response: ' + pageResult._status);
							if (pageResult._status == '200') {
								console.log('await start');
								const waiting = await page.waitForSelector('#img', { waitUntil: 'networkidle2', timeout: 60000 });
								console.log('await finished: ' + waiting);
								const episodes_img = await page.evaluate(() => {
									return document.querySelector('#img').src;
								});
								episodes_list_compiled.push({
									order_id: episodes_list[k].order_id,
									name: episodes_list[k].name,
									url: episodes_list[k].link,
									image: episodes_img
								});
								console.log(`catch image - ${k + 1} out of ${episodes_list.length}`);
							}
							else if (pageResult._status == '500') {
								console.log(`500 image - ${k + 1} out of ${episodes_list.length}`);
								k--;
							}
							else if (pageResult._status == '404') {
								console.log(`404 image - ${k + 1} out of ${episodes_list.length}`);
							}
							else {
								console.log(`${pageResult._status} image - ${k + 1} out of ${episodes_list.length}`);
							}
						}

						let n = Date.now();
						result_list.push({
							order_id: n + '_' + chapter_order_id,
							name: chapter_name,
							release_date: chapter_release_date,
							url: chapter_url,
							manga_url: manga_url,
							episodes: episodes_list_compiled
						});

						fs.writeFileSync(`src/json/chapters.json`, JSON.stringify(result_list));
						fs.writeFileSync(`src/json/_chapters/chapters_${today}.json`, JSON.stringify(result_list));
						console.log(`pushed - ${j} out of ${chapters.length}`);
					}
					else {
						console.log(chapter_name + ' - 404')
					}
				}
				else {
					console.log(chapter_name + ' - chapter exist')
				}
			}


		}


	});

});
