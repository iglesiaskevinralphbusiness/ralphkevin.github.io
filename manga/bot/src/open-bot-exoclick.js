const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const fs = require("fs");

//https://free-proxy-list.net/

(async () => {

	let working_proxies = JSON.parse(await fs.readFileSync(__dirname + "/proxies_working.json", "utf8"));
	const proxies = JSON.parse(await fs.readFileSync(__dirname + "/proxies.json", "utf8"));

	let total = 1000;
	let done = 0;
	for (let start = 0; start < total; start++) {

		for (let i = 0; i < proxies.length; i++) {

			const browser = await puppeteer.launch({
				headless: false, //for debuging
				args: [`--proxy-server=http://${proxies[i]}`]
			});

			const page = await browser.newPage();
			try {
				await page.goto('http://mangariot.com/manga-list', { waitUntil: "domcontentloaded", timeout: 0 });
				await page.waitForSelector("body", {
					waitUntil: "domcontentloaded",
					timeout: 0
				});
				await page.evaluate(() => {
					let frames = Array.from(document.querySelectorAll("iframe"));
					frames.map(frame => {
						frame.click();
					})
				});
				await page.waitFor(15000);

				done++;
				total = total - 1;
				console.log(done + '/' + total + ' - ' + proxies[i]);

				const working_find = working_proxies.find(proxy => proxy == proxies[i]);
				if (!working_find) {
					working_proxies.push(proxies[i]);
					fs.writeFileSync(`src/proxies_working.json`, JSON.stringify(working_proxies));
					console.log('saved ' + proxies[i]);
				}

			} catch (err) {
				const working_filter = working_proxies.filter(proxy => proxy != proxies[i]);
				fs.writeFileSync(`src/proxies_working.json`, JSON.stringify(working_filter));
				console.log('removed ' + proxies[i]);
				//console.log(err);
			}



			await browser.close();

		}




	}

})();