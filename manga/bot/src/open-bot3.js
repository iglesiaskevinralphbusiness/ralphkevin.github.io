const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const fs = require("fs");

//https://free-proxy-list.net/
//https://www.proxynova.com/proxy-server-list/country-sg/

(async () => {

	for (let start = 0; start < 10000; start++) {

		const browserHead = await puppeteer.launch({
			headless: false, //for debuging
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const pageHead = await browserHead.newPage();
		await pageHead.goto('https://www.proxynova.com/proxy-server-list/', { waitUntil: "domcontentloaded", timeout: 0 });
		await pageHead.waitForSelector("#tbl_proxy_list", {
			waitUntil: "domcontentloaded",
			timeout: 0
		});
		const proxies = await pageHead.evaluate(() => {
			const trs = Array.from(document.querySelectorAll("#tbl_proxy_list > tbody:nth-child(2) > tr"));
			return trs.slice(0,10).map(tr => {
				const td = tr.querySelectorAll("td");
				const address = td[0].textContent.trim();
				const port = td[1].textContent.trim();

				const address_item = address.split(';')
				const ip = address_item[1].trim();

				return ip + ':' + port;
			});
		});
		console.log(proxies);
		await browserHead.close();




		for (let i = 0; i < proxies.length; i++) {

			const browser = await puppeteer.launch({
				headless: false, //for debuging
				args: [`--proxy-server=http://${proxies[i]}`]
			});

			const page = await browser.newPage();
			await page.setViewport({
				width: 1100,
				height: 800
			});

			try {
				await page.goto('http://gestyy.com/w9XWgV', { waitUntil: "domcontentloaded", timeout: 0 });

				const elements_total = await page.evaluate(() => {
					const elements = Array.from(document.querySelectorAll("div"));
					return elements.length;
				});

				if(elements_total > 0){
					await page.waitFor(35000);
					console.log('done 0' + proxies[i]);
				}
				else {
					console.log('failed ' + proxies[i]);
				}
			} catch (err) {
				console.log('failed ' + proxies[i]);
			}



			await browser.close();

		}
		

	}

})();