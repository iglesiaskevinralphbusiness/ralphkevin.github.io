const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const fs = require("fs");
const https = require('https');
var path = require('path');

const download = (url, destination) => new Promise((resolve, reject) => {
	const file = fs.createWriteStream(destination);

	https.get(url, response => {
		response.pipe(file);

		file.on('finish', () => {
			file.close(resolve(true));
		});
	})

		.on('error', error => {
			fs.unlink(destination);

			reject(error.message);
		});
});


(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const m_chapters = JSON.parse(await fs.readFileSync(__dirname + "/json/chapters.json", "utf8"));

	const images = m_chapters.map(c => {
		return c.photo;
	}).filter(c => c != undefined);


	for (i = 0; i <= images.length - 1; i++) {
		const imageName = images[i].replace("https://www.readmng.com", "");
		const newImage = __dirname + imageName;

		const existImage = await fs.existsSync(newImage);

		if (existImage) {
			console.log('Done: ' + images[i]);
		}
		else {
			console.log('Downloading...' + images[i]);
			result = await download(images[i], newImage);
			if (result === true) {
				console.log('Success');
			}
			else {
				console.log('Error');
				console.error(result);
			}
		}
	}

	console.log('ALL FILE DOWNLOADED!')




	await browser.close();
})();


