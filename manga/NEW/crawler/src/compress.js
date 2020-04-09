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
		const m_chapters = JSON.parse(await fs.readFileSync(__dirname + "/json/chapters_cleaned.json", "utf8"));
		let chapter_index = 0;
		let chapters = [];

		for (let i = 0; i < m_chapters.length; i++) {
			const mod = (i + 1) % 4000;
			if (mod == 0) {
				chapter_index++;
				fs.writeFileSync(`src/json/compress/chapters_${chapter_index}.json`, JSON.stringify(chapters));
				chapters = [];
			}
			else {
				chapters.push(m_chapters[i]);
			}
		}


	});
});
