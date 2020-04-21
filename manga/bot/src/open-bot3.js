const puppeteer = require('puppeteer')
const expect = require("chai").expect;
const fs = require("fs");
//const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//puppeteer.use(StealthPlugin());

//https://free-proxy-list.net/
//https://www.proxynova.com/proxy-server-list/country-sg/


(async () => {
	let working_proxies = JSON.parse(await fs.readFileSync(__dirname + "/proxies_working.json", "utf8"));
	const proxies = JSON.parse(JSON.stringify(working_proxies));
	console.log('TOTAL ================================================ : ' + proxies.length);

	for (let i = 0; i < proxies.length; i++) {

		const browser = await puppeteer.launch({
			headless: false,
			args: [`--proxy-server=http://${proxies[i]}`]
		});
		const page = await browser.newPage();



		try {
			await page.goto('http://mangariot.com/ads/pop1.html', { waitUntil: "domcontentloaded", timeout: 90000 });

			const elements_total = await page.evaluate(() => {
				const elements = Array.from(document.querySelectorAll("div"));
				return elements.length;
			});

			if (elements_total > 0) {
				await autoScroll(page);
				await page.waitFor(40000);
				console.log(`done ${proxies[i]}`);
			} else {
				working_proxies = working_proxies.filter(proxy => proxy != proxies[i]);
				fs.writeFileSync(`src/proxies_working.json`, JSON.stringify(working_proxies));
				console.log('removed no element' + proxies[i]);
			}
		} catch (err) {
			working_proxies = working_proxies.filter(proxy => proxy != proxies[i]);
			fs.writeFileSync(`src/proxies_working.json`, JSON.stringify(working_proxies));
			console.log('removed catch ' + proxies[i]);
		}

		console.log('LOOP ================================================ : ' + i);
		await browser.close();
	}

})();


async function autoScroll(page) {
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			var totalHeight = 0;
			var distance = 100;
			var timer = setInterval(() => {
				var scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}