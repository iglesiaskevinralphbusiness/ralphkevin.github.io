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
	});

	after(async function () {
		await browser.close();
	});



	it('Get chapters', async () => {
		const m_chapters = JSON.parse(await fs.readFileSync(__dirname + '/json/chapters.json', 'utf8'));
		const roots = [
			"https://www.readmng.com/manga-list",
			"https://www.readmng.com/manga-list/a",
			"https://www.readmng.com/manga-list/b",
			"https://www.readmng.com/manga-list/c",
			"https://www.readmng.com/manga-list/d",
			"https://www.readmng.com/manga-list/e",
			"https://www.readmng.com/manga-list/f",
			"https://www.readmng.com/manga-list/g",
			"https://www.readmng.com/manga-list/h",
			"https://www.readmng.com/manga-list/i",
			"https://www.readmng.com/manga-list/j",
			"https://www.readmng.com/manga-list/k",
			"https://www.readmng.com/manga-list/l",
			"https://www.readmng.com/manga-list/m",
			"https://www.readmng.com/manga-list/n",
			"https://www.readmng.com/manga-list/o",
			"https://www.readmng.com/manga-list/p",
			"https://www.readmng.com/manga-list/q",
			"https://www.readmng.com/manga-list/r",
			"https://www.readmng.com/manga-list/s",
			"https://www.readmng.com/manga-list/t",
			"https://www.readmng.com/manga-list/u",
			"https://www.readmng.com/manga-list/v",
			"https://www.readmng.com/manga-list/w",
			"https://www.readmng.com/manga-list/x",
			"https://www.readmng.com/manga-list/y",
			"https://www.readmng.com/manga-list/z",
		];
		let rendered_list = [];

		

		console.log(rendered_list);
		




		

});
