const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const fs = require("fs");

describe("Handling Hooks", () => {
	let browser;
	let page;

	//hooks content here
	before(async function () {
		browser = await puppeteer.launch({
			headless: true, //for debuging
			slowMo: 0, //delay beetween puppeteer actions
			devtools: false, //opens developer tools to browser
			timeout: 15000, //max time of the browser to launch
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			ignoreHTTPSErrors: true,
			dumpio: false
		});
		page = await browser.newPage();
		await page.setViewport({
			width: 800,
			height: 600
		});

		await page.setRequestInterception(true);
		page.on("request", request => {
			if (
				request.resourceType() === "image" ||
				request.resourceType() === "stylesheet" ||
				request.resourceType() === "font"
			)
				request.abort();
			else request.continue();
		});
	});

	after(async function () {
		await browser.close();
	});

	it("Get chapters", async () => {
		//variables
		const m_chapters = JSON.parse(await fs.readFileSync(__dirname + "/json/chapters.json", "utf8"));

		m_chapters.map(l => {
			const url = l.url;
			const photo = l.photo ? l.photo : '';
			l.url = url.replace('https://www.readmng.com', '');
			l.photo = photo.replace('https://www.readmng.com', '');
			l.authors.map(a => {
				const aurl = a.url;
				a.url = aurl.replace('https://www.readmng.com', '');
			});
			l.categories.map(ct => {
				const cturl = ct.url;
				ct.url = cturl.replace('https://www.readmng.com', '');
			});
			l.chapters.map(c => {
				const curl = c.url;
				c.url = curl.replace('https://www.readmng.com', '');
			});

			console.log('replaced ' + url);
			return l;
		});

		fs.writeFileSync(`src/json/chapters_cleaned.json`, JSON.stringify(m_chapters));
	});
});
