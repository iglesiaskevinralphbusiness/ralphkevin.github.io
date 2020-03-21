const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const fs = require("fs");

describe("Handling Hooks", () => {
	let browser;
	let page;

	//hooks content here
	before(async function () {
		browser = await puppeteer.launch({
			headless: false, //for debuging
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
		const list_banned = JSON.parse(await fs.readFileSync(__dirname + "/json/list_banned.json", "utf8"));
		const list_updated = JSON.parse(await fs.readFileSync(__dirname + "/json/list_updated.json", "utf8"));
		const m_list = JSON.parse(await fs.readFileSync(__dirname + "/json/list.json", "utf8"));
		const m_chapters = JSON.parse(await fs.readFileSync(__dirname + "/json/chapters.json", "utf8"));
		let rendered_list = m_list;
		let rendered_chapters = m_chapters;

		//get all chapters
		for (let i = 0; i < rendered_list.length; i++) {

			filter_updated = list_updated.find(l => l == rendered_list[i]);
			filter_banned = list_banned.find(l => l == rendered_list[i]);
			if (filter_banned) {
				console.log('BANNED: ' + rendered_list[i])
			}
			else if (filter_updated) {
				console.log('DONE: ' + rendered_list[i])
			}
			else {
				const pageResult = await page.goto(rendered_list[i], {
					waitUntil: "load",
					timeout: 0
				});
				if (pageResult._status == "404") {
					console.log(`PAGE NOT FOUND: ${rendered_list[i]}`);
				} else {
					await page.waitForSelector(".content", {
						waitUntil: "load",
						timeout: 0
					});


					const filter_chapters = rendered_chapters.filter(r => r.url == rendered_list[i]);
					if (filter_chapters.length <= 0) {

						console.log("NEW MANGA: " + rendered_list[i]);
						//NEW MANGA
						const data = await page.evaluate((rendered_list) => {
							const id = Date.now() + Math.floor(Math.random() * 9999999 + 1);
							const name = document.querySelector("h1").textContent;
							const alternative_name = document.querySelector("div.panel-body > div.col-md-9 > dl > dd:nth-child(2)").textContent;
							const status = document.querySelector("div.panel-body > div.col-md-9 > dl > dd:nth-child(4)").textContent;
							const type = document.querySelector("div.panel-body > div.col-md-9 > dl > dd:nth-child(8)").textContent;
							const total_views = document.querySelector("div.panel-body > div.col-md-9 > dl > dd:nth-child(10)").textContent;
							const category_list = Array.from(document.querySelectorAll("div.panel-body > div.col-md-9 > dl > dd:nth-child(6) > a"));
							const categories = category_list.map(e => {
								return {
									name: e.textContent,
									url: e.href
								};
							});
							const author_list = Array.from(document.querySelectorAll("li.director > ul > li:nth-child(1) > a"));
							const authors = author_list.map(a => {
								const name = a.textContent;
								const url = a.href;
								return {
									name: name.trim(),
									url: url
								};
							});
							const chapter_list = Array.from(document.querySelectorAll("div.panel-body > ul > li > a"));
							const chapters = chapter_list.filter(e => {
								const valid = e.querySelector(".val");
								if (valid != null) {
									return true;
								}
								return false;
							}).reverse().map((e, index) => {
								//generate date today
								var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth() + 1;
								var yyyy = today.getFullYear();
								if (dd < 10) { dd = '0' + dd; }
								if (mm < 10) { mm = '0' + mm; }
								var today = yyyy + '/' + mm + '/' + dd;

								const chapter_id = index + 1;
								const name = e.querySelector(".val").textContent;
								let date = e.querySelector(".dte").getAttribute("title");
								date = date.replace("Published on ", "");

								return {
									id: id + '_' + chapter_id,
									date: date,
									date_crawled: today,
									name: name.trim(),
									url: e.href,
								};
							});

							//generate date today
							var today = new Date();
							var dd = today.getDate();
							var mm = today.getMonth() + 1;
							var yyyy = today.getFullYear();
							if (dd < 10) { dd = '0' + dd; }
							if (mm < 10) { mm = '0' + mm; }
							var today = yyyy + '/' + mm + '/' + dd;

							return {
								id: id,
								name: name.trim(),
								alternative_name: alternative_name.trim(),
								url: rendered_list,
								status: status.trim(),
								type: type.trim(),
								total_views: total_views,
								date_crawled: today,
								authors: authors,
								categories: categories,
								chapters: chapters
							};
						}, rendered_list[i]);

						rendered_chapters.push(data);
						list_updated.push(rendered_list[i]);
						fs.writeFileSync(`src/json/chapters.json`, JSON.stringify(rendered_chapters));
						fs.writeFileSync(`src/json/list_updated.json`, JSON.stringify(list_updated));
						console.log("pushed.");
					}
					else {
						console.log("UPDATING MANGA: " + rendered_list[i]);
						//UPDATE MANGA
						const filter_id = filter_chapters[0].id;
						const datas = [...rendered_chapters];
						const item = datas.find(data => data.id == filter_id);
						const index = datas.indexOf(item);

						const dataEvaluated = await page.evaluate((existing_chapters) => {
							const total_views = document.querySelector("div.panel-body > div.col-md-9 > dl > dd:nth-child(10)").textContent;
							const status = document.querySelector("div.panel-body > div.col-md-9 > dl > dd:nth-child(4)").textContent;

							const chapter_list = Array.from(document.querySelectorAll("div.panel-body > ul > li > a"));
							const chapters = chapter_list.filter(e => {
								const valid = e.querySelector(".val");
								if (valid != null) {
									return true;
								}
								return false;
							}).reverse().map((e, index) => {
								//generate date today
								var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth() + 1;
								var yyyy = today.getFullYear();
								if (dd < 10) { dd = '0' + dd; }
								if (mm < 10) { mm = '0' + mm; }
								var today = yyyy + '/' + mm + '/' + dd;

								const chapter_id = index + 1;
								const name = e.querySelector(".val").textContent;
								let date = e.querySelector(".dte").getAttribute("title");
								date = date.replace("Published on ", "");

								filter_item_chapter = existing_chapters.find(c => c.url == e.href);
								if (filter_item_chapter) {
									return filter_item_chapter;
								}

								return {
									id: id + '_' + chapter_id,
									date: date,
									date_crawled: today,
									name: name.trim(),
									url: e.href,
								};
							});


							return {
								total_views: total_views,
								status: status,
								chapters: chapters,
							}
						}, datas[index].chapters);

						datas[index].total_views = dataEvaluated.total_views;
						datas[index].status = dataEvaluated.status;
						datas[index].chapters = dataEvaluated.chapters;
						rendered_chapters = [...datas];

						list_updated.push(rendered_list[i]);
						fs.writeFileSync(`src/json/chapters.json`, JSON.stringify(rendered_chapters));
						fs.writeFileSync(`src/json/list_updated.json`, JSON.stringify(list_updated));
						console.log("pushed.");
					}
				}
			}
		}
	});
});
