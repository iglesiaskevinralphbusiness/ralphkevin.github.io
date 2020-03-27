
class Chapters {
    constructor(allData) {
        this.data = allData;

        this.init();
    }

    init() {
        console.log(this.data);
        const categories = this.getCategories();
        const popular = this.getMostPopular();
        const latestRelease = this.getLatestRelease();
        const alphabetical = this.getAlphabetical();

        this.renderSidebarCategories(categories);
        this.renderSidebarPopular(popular);
        this.renderHomeLatestRelease(latestRelease);
        this.renderMangaListAlphabetical(alphabetical);
    }

    getCategories() {
        const list = [...this.data]
        let holder = [];
        list.map(l => {
            l.categories.map(cat => {
                holder[cat.name] = cat.url;
            });
        });
        let organize = [];
        for (var key in holder) {
            if (holder.hasOwnProperty(key)) {
                let total = 0;
                list.find(l => {
                    const found = l.categories.find(g => g.name == key);
                    if (found) {
                        total++;
                    }
                });

                const value = {
                    name: key,
                    url: holder[key],
                    total: total
                };
                organize.push(value);
            }
        }
        const sorted = this.sortList(organize, 'name');
        return sorted;
    }

    getMostPopular() {
        const list = [...this.data];
        const sorted = this.sortList(list, 'total_views');
        return sorted.reverse();
    }

    getLatestRelease() {
        const list = JSON.parse(JSON.stringify(this.data));

        const reconstruct = list.map(l => {
            let data = [];
            const chapters = l.chapters.reverse();
            const total = chapters.length - 1;

            for (let i = 0; i <= 2; i++) {
                if (chapters[i]) {
                    data.push(chapters[i]);
                }
            }

            if (chapters.length > 0) {
                l.last_chapter_date = data[0].date;
                l.chapters = data;
                return l;
            }

            return null;
        }).filter(l => l != null);
        const sorted = this.sortList(reconstruct, 'last_chapter_date');
        return sorted.reverse();
    }

    getAlphabetical() {
        const list = [...this.data];

        const sorted = this.sortList(list, 'name');

        let organized = [];
        let reorganized = [];

        sorted.map(l => {
            const name = l.name;
            let letter = name.trim().charAt(0);
            letter = letter.toUpperCase();
            if (organized[letter]) {
                organized[letter].push(l);
            }
            else {
                organized[letter] = [];
                organized[letter].push(l);
            }

        });

        for (var key in organized) {
            if (organized.hasOwnProperty(key)) {
                const value = {
                    alphabet: key,
                    manga: organized[key]
                };
                reorganized.push(value);
            }
        }

        return reorganized;
    }


    renderSidebarCategories(list) {
        let renderHtml = '';
        list.map(l => {
            renderHtml += `<li><a href="${l.url}">${l.name} <span>(${l.total})</span></a></li>`
        })
        $('.categories ul:nth-child(2)').html(renderHtml);
    }

    renderSidebarPopular(list) {
        let renderHtml = '';

        list.slice(0, 5).map(l => {
            const lastChapterTotal = l.chapters.length;
            const lastChapter = l.chapters[lastChapterTotal - 1];

            renderHtml += `<li>
                <div class="cover">
                    <a href=""><img src="assets/images/dummy/1.png"></a>
                </div>
                <div class="desc">
                    <p class="title"><a href="${l.url}">${l.name}</a></p>
                    <p class="chapter"><a href="${lastChapter.url}">${lastChapter.name}</a></p>
                </div>
            </li>`;
        });

        $('.body-sidebar .side-popular ul').html(renderHtml);
    }

    renderHomeLatestRelease(list) {
        let renderHtml = '';

        list.slice(0, 16).map(l => {
            let chaptersHtml = '';
            l.chapters.map(c => {

                chaptersHtml += `<li>
                    <a href="${c.url}">${c.name}</a>
                    <span>${c.date}</span>
                </li>`;
            });

            renderHtml += `<div class="latest-block">
                <div class="cover">
                    <a href="${l.url}"><img src="${l.photo}"></a>
                </div>
                <div class="desc">
                    <p><a href="${l.url}">${l.name}</a></p>
                    <ul>
                        ${chaptersHtml}
                    </ul>
                </div>
            </div>`;
        });

        $('.latest').html(renderHtml);
    }

    renderMangaListAlphabetical(list) {
        let renderHtml = '';

        list.map(l => {
            let list = '';

            l.manga.map(m => {
                list += ` <li><a href="${m.url}">${m.name}</a></li>`;
            });

            renderHtml += `<section class="alpha-block">
                <div class="alpha-container">
                    <h2>${l.alphabet}</h2>
                    <ul>
                       ${list}
                    </ul>
                </div>
            </section>`;
        });

        $('.alphabetical').html(renderHtml);
    }


    //OTHERS
    sortList(list, key) {
        list.sort(function (a, b) {
            if (a[key] < b[key]) { return -1; }
            if (a[key] > b[key]) { return 1; }
            return 0;
        });
        return list;
    }
}




document.addEventListener('DOMContentLoaded', function () {
    //document.body.classList.add('loader');
    $.ajax({
        url: '/assets/services/chapters.json',
        method: 'GET',
        dataType: 'json',
        data: '',
        contentType: 'application/json; charset=utf-8',
        beforeSend:
            function (xhr) {
                //xhr.setRequestHeader("Authorization", authorizationKey);
            },
        success:
            function (data) {
                const allChapters = new Chapters(data);
                //document.body.classList.remove('loader');
            },
        error: function (data) {
            console.error('Error loading SVG!');
            //document.body.classList.remove('loader');
        }
    });

})
