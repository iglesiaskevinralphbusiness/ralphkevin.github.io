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
					waitUntil: "domcontentloaded",
					timeout: 0
				});

				if (pageResult._status == "404") {
					list_banned.push(rendered_list[i]);
					fs.writeFileSync(`src/json/list_banned.json`, JSON.stringify(list_banned));
					console.log(`PAGE NOT FOUND: ${rendered_list[i]}`);
				} else {

					const pageTitle = await page.title();
					if (pageTitle == "Database Error") {
						fs.writeFileSync(`src/json/list_banned.json`, JSON.stringify(list_banned));
						console.log(`DATABASE ERROR: ${rendered_list[i]}`);
					}
					else if (pageTitle == "Hata") {
						fs.writeFileSync(`src/json/list_banned.json`, JSON.stringify(list_banned));
						console.log(`DATABASE ERROR: ${rendered_list[i]}`);
					}
					else if (pageTitle == "503 Service Unavailable") {
						fs.writeFileSync(`src/json/list_banned.json`, JSON.stringify(list_banned));
						console.log(`DATABASE ERROR: ${rendered_list[i]}`);
					}
					else {

						await page.waitForSelector(".content", {
							waitUntil: "domcontentloaded",
							timeout: 0
						});

						const filter_chapters = rendered_chapters.filter(r => r.url == rendered_list[i]);
						if (filter_chapters.length <= 0) {

							console.log("NEW MANGA: " + rendered_list[i]);
							//NEW MANGA
							const data = await page.evaluate((rendered_list) => {
								const id = Date.now() + Math.floor(Math.random() * 9999999 + 1);
								const photo = document.querySelector("div.row.movie-meta > div > div > div.panel-body > div.col-md-3 > img").src;
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

									let date = e.querySelector(".dte").textContent;
									date = date.trim();
									const splitDate = date.split(" ");
									const todayNew = new Date();
									if (splitDate[1] == "Years" || splitDate[1] == "Year" || splitDate[1] == "years" || splitDate[1] == "year") {
										todayNew.setFullYear(todayNew.getFullYear() - splitDate[0]);
									}
									if (splitDate[1] == "Months" || splitDate[1] == "Month" || splitDate[1] == "months" || splitDate[1] == "month") {
										todayNew.setMonth(todayNew.getMonth() - splitDate[0]);
									}
									else if (splitDate[1] == "Weeks" || splitDate[1] == "Week" || splitDate[1] == "weeks" || splitDate[1] == "week") {
										const total_weeks = 7 * splitDate[0];
										todayNew.setDate(todayNew.getDate() - total_weeks);
									}
									else if (splitDate[1] == "Days" || splitDate[1] == "Day" || splitDate[1] == "days" || splitDate[1] == "day") {
										todayNew.setDate(todayNew.getDate() - splitDate[0]);
									}
									var dd = todayNew.getDate();
									var mm = todayNew.getMonth() + 1;
									var yyyy = todayNew.getFullYear();
									if (dd < 10) { dd = '0' + dd; }
									if (mm < 10) { mm = '0' + mm; }
									date = yyyy + '/' + mm + '/' + dd;

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
									photo: photo,
									status: status.trim(),
									type: type.trim(),
									total_views: total_views,
									date_crawled: today,
									authors: authors,
									categories: categories,
									chapters: chapters,
									date_last_crawled: new Date().getTime(),
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

							const dataEvaluated = await page.evaluate((existing_chapters, filter_id) => {
								const photo = document.querySelector("div.row.movie-meta > div > div > div.panel-body > div.col-md-3 > img").src;
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
									let date = e.querySelector(".dte").textContent;
									date = date.trim();

									//for temporary update
									const splitDate = date.split(" ");
									const todayNew = new Date();
									console.log(splitDate[0], 'splitDate');
									console.log(splitDate[1], 'splitDate');
									if (splitDate[1] == "Years" || splitDate[1] == "Year" || splitDate[1] == "years" || splitDate[1] == "year") {
										todayNew.setFullYear(todayNew.getFullYear() - splitDate[0]);
									}
									if (splitDate[1] == "Months" || splitDate[1] == "Month" || splitDate[1] == "months" || splitDate[1] == "month") {
										todayNew.setMonth(todayNew.getMonth() - splitDate[0]);
									}
									else if (splitDate[1] == "Weeks" || splitDate[1] == "Week" || splitDate[1] == "weeks" || splitDate[1] == "week") {
										const total_weeks = 7 * splitDate[0];
										todayNew.setDate(todayNew.getDate() - total_weeks);
									}
									else if (splitDate[1] == "Days" || splitDate[1] == "Day" || splitDate[1] == "days" || splitDate[1] == "day") {
										todayNew.setDate(todayNew.getDate() - splitDate[0]);
									}
									var dd = todayNew.getDate();
									var mm = todayNew.getMonth() + 1;
									var yyyy = todayNew.getFullYear();
									if (dd < 10) { dd = '0' + dd; }
									if (mm < 10) { mm = '0' + mm; }
									date = yyyy + '/' + mm + '/' + dd;
									console.log(date);
									//for temporary update

									filter_item_chapter = existing_chapters.find(c => c.url == e.href);
									if (filter_item_chapter) {
										filter_item_chapter.date = date;
										return filter_item_chapter;
									}

									return {
										id: filter_id + '_' + chapter_id,
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
									date_last_crawled: new Date().getTime(),
								}
							}, datas[index].chapters, filter_id);

							datas[index].total_views = dataEvaluated.total_views;
							datas[index].status = dataEvaluated.status;
							datas[index].chapters = dataEvaluated.chapters;
							datas[index].date_last_crawled = dataEvaluated.date_last_crawled;
							rendered_chapters = [...datas];

							list_updated.push(rendered_list[i]);
							fs.writeFileSync(`src/json/chapters.json`, JSON.stringify(rendered_chapters));
							fs.writeFileSync(`src/json/list_updated.json`, JSON.stringify(list_updated));
							console.log("pushed.");
						}
					}
				}
			}
		}
	});
});
