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

    const list_banned = JSON.parse(await fs.readFileSync(__dirname + "/json/list_banned.json", "utf8"));
    const m_chapters = JSON.parse(await fs.readFileSync(__dirname + "/json/chapters.json", "utf8"));
    const update_items = JSON.parse(await fs.readFileSync(__dirname + "/json/updates/update_items.json", "utf8"));
    let rendered_chapters = m_chapters;
    let to_upload = update_items;


    const list_daily = JSON.parse(await fs.readFileSync(__dirname + "/json/list_daily.json", "utf8"));

    const rootsURL = [
      //"https://www.readmng.com/latest-releases/10",
      //"https://www.readmng.com/latest-releases/9",
      //"https://www.readmng.com/latest-releases/8",
      //"https://www.readmng.com/latest-releases/7",
      //"https://www.readmng.com/latest-releases/6",
      //"https://www.readmng.com/latest-releases/5",
      //"https://www.readmng.com/latest-releases/4",
      "https://www.readmng.com/latest-releases/3",
      "https://www.readmng.com/latest-releases/2",
      "https://www.readmng.com/latest-releases/1",
    ];
    let rendered_list = list_daily;

    //get all list manga
    for (let i = 0; i < rootsURL.length; i++) {
      console.log('rendering ' + rootsURL[i]);
      await page.goto(rootsURL[i], { waitUntil: "domcontentloaded", timeout: 0 });
      await page.waitForSelector(".content-list", {
        waitUntil: "domcontentloaded",
        timeout: 0
      });

      const list_manga = await page.evaluate((list_daily) => {
        const manga = Array.from(document.querySelectorAll(".manga_updates dl"));

        return manga.map(e => {
          let url = e.querySelector("dt a").href;
          let date = e.querySelector("dt .time").textContent;


          console.log(list_daily);
          const filter = list_daily.find(l => l.url == url && l.date == date);
          if (!filter) {
            return {
              url: url,
              date: date,
              crawled: false,
            };
          }

          return null;

        });
      }, list_daily);

      const list_manga_clean = list_manga.filter(l => l != null);

      rendered_list = [...rendered_list, ...list_manga_clean];
    }

    rendered_list = rendered_list.reverse();
    total_to_render = rendered_list.filter(r => r.crawled == false);


    //////////////////////////////////////////////////////////
    console.log("TOTAL TO RENDER IS: " + total_to_render.length);
    //////////////////////////////////////////////////////////


    //get all chapters
    for (let i = 0; i < rendered_list.length; i++) {

      if (rendered_list[i].crawled == false) {


        filter_banned = list_banned.find(l => l == rendered_list[i].url);
        if (filter_banned) {
          console.log('BANNED: ' + rendered_list[i].url)
        }
        else {

          const pageResult = await page.goto(rendered_list[i].url, {
            waitUntil: "domcontentloaded",
            timeout: 0
          });

          if (pageResult._status == "404") {
            console.log(`PAGE NOT FOUND: ${rendered_list[i].url}`);
          } else {

            const pageTitle = await page.title();
            if (pageTitle == "Database Error") {
              console.log(`DATABASE ERROR: ${rendered_list[i].url}`);
            }
            else if (pageTitle == "Hata") {
              console.log(`DATABASE ERROR: ${rendered_list[i].url}`);
            }
            else if (pageTitle == "503 Service Unavailable") {
              console.log(`DATABASE ERROR: ${rendered_list[i].url}`);
            }
            else {

              await page.waitForSelector(".content", {
                waitUntil: "domcontentloaded",
                timeout: 0
              });

              const filter_chapters = rendered_chapters.filter(r => r.url == rendered_list[i].url);
              if (filter_chapters.length <= 0) {

                console.log("NEW MANGA: " + rendered_list[i].url);
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

                  //get description
                  let description = '';
                  if (document.querySelector(".movie-detail") != null) {
                    description = document.querySelector(".movie-detail").innerText;
                    description = description.trim();
                  }

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
                    description: description,
                  };
                }, rendered_list[i].url);

                rendered_chapters.push(data);
                to_upload.push(data);
                rendered_list[i].crawled = true;
                fs.writeFileSync(`src/json/chapters.json`, JSON.stringify(rendered_chapters));
                fs.writeFileSync(`src/json/updates/update_items.json`, JSON.stringify(to_upload));
                console.log("pushed. " + i);
              }
              else {
                console.log("UPDATING MANGA: " + rendered_list[i].url);
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
                  let is_there_an_update = false;
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
                    else {
                      is_there_an_update = true;
                    }


                    return {
                      id: filter_id + '_' + chapter_id,
                      date: date,
                      date_crawled: today,
                      name: name.trim(),
                      url: e.href,
                    };
                  });


                  //get description
                  let description = '';
                  if (document.querySelector(".movie-detail") != null) {
                    description = document.querySelector(".movie-detail").innerText;
                    description = description.trim();
                  }


                  return {
                    total_views: total_views,
                    status: status,
                    chapters: chapters,
                    date_last_crawled: new Date().getTime(),
                    is_there_an_update: is_there_an_update,
                    description: description,
                  }
                }, datas[index].chapters, filter_id);

                datas[index].total_views = dataEvaluated.total_views;
                datas[index].status = dataEvaluated.status;
                datas[index].chapters = dataEvaluated.chapters;
                datas[index].description = dataEvaluated.description;
                if (dataEvaluated.is_there_an_update) {
                  datas[index].date_last_crawled = dataEvaluated.date_last_crawled;
                  to_upload.push(datas[index]);
                  fs.writeFileSync(`src/json/updates/update_items.json`, JSON.stringify(to_upload));
                }
                rendered_chapters = [...datas];
                rendered_list[i].crawled = true;

                fs.writeFileSync(`src/json/chapters.json`, JSON.stringify(rendered_chapters));
                fs.writeFileSync(`src/json/list_daily.json`, JSON.stringify(rendered_list));
                console.log("pushed." + i);
              }
            }
          }
        }
      }

    }


    //clean url
    console.log("CLEANING URL");
    const clean_update_items = JSON.parse(await fs.readFileSync(__dirname + "/json/updates/update_items.json", "utf8"));


    clean_update_items.map(l => {
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


    fs.writeFileSync(`src/json/updates/update_items.json`, JSON.stringify(clean_update_items));


  });
});
