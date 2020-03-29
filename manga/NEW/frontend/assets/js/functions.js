
class Chapters {
    constructor(allData) {
        //datas
        this.data = allData;
        this.categories = [];
        this.categoriesItems = [];
        this.popular = [];
        this.latestRelease = [];
        this.alphabetical = [];

        //state
        this.paginationActive = 1;
        this.chapter_page_url_active = '';

        this.init();
    }

    init() {
        console.log(this.data);
        this.categories = this.getCategories();
        this.popular = this.getMostPopular();
        this.latestRelease = this.getLatestRelease();
        this.alphabetical = this.getAlphabetical();

        //header
        this.renderHeaderMenuActive();
        this.bindSearchInput(this.data);
        //home
        this.renderSidebarCategories(this.categories);
        this.renderSidebarPopular(this.popular);
        this.renderHomeLatestRelease(this.latestRelease);
        this.renderMangaListAlphabetical(this.alphabetical);
        //latest release
        this.renderPageLatestRelease(this.latestRelease);
        //top manga
        this.renderPageTopManga(this.popular);
        //manga page
        this.renderPageManga(this.data);
        //chapter page
        this.renderPageChapter();
        //chapter page all
        this.renderPageChapterAll();
        //category
        this.renderPageCategory(this.data);
        this.renderPageStatus(this.data);
    }

    //GET
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
        const list = JSON.parse(JSON.stringify(this.data));
        const list_clear = list.map(l => {
            const total_views = l.total_views;
            l.total_views = total_views.split(',').join('');
            return l;
        });

        const sorted = this.sortListNumber(list, 'total_views');
        return list.reverse();
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

    //RENDER
    renderHeaderMenuActive() {
        const path = window.location.pathname;
        switch (path) {
            case '/':
                document.querySelector('#menu-1 a').classList.add('active');
                break;
            case '/manga-list':
                document.querySelector('#menu-2 a').classList.add('active');
                break;
            case '/latest-release':
                document.querySelector('#menu-3 a').classList.add('active');
                break;
            case '/top-manga':
                document.querySelector('#menu-4 a').classList.add('active');
                break;
        }
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

            const tooltip = this.renderHomeToolTip(l);

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
                ${tooltip}
            </div>`;
        });

        $('#page-home-latest').html(renderHtml).promise().done(function () {
            const elements = document.querySelectorAll('.latest .latest-block .desc p a, .latest .latest-block .cover a');
            for (let element of elements) {

                const parent = element.closest(".latest-block");
                const tooltip = parent.querySelector(".data-tip-container");

                element.addEventListener("mousemove", function (event) {
                    tooltip.classList.remove('hide');
                    tooltip.style.top = event.y + 'px';
                    tooltip.style.left = event.x + 'px';
                });
                element.addEventListener("mouseleave", function (event) {
                    tooltip.classList.add('hide');
                });

            }
        });
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

    renderPageLatestRelease(list) {
        if (document.querySelector('#page-latest-release') != null) {
            let renderHtml = '';
            const total_show_item = 16;
            const max_display = this.paginationActive * total_show_item;
            const min_display = max_display - total_show_item;

            list.slice(min_display, max_display).map(l => {

                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                renderHtml += `
                <div class="latest-block-all">
                    <div class="manga-details">
                        <div class="details-image">
                            <a class="img-container" href="${l.url}" style="background-image: url(${l.photo});">
                                <img src="${l.photo}" alt="Read manga ${l.name}">
                            </a>
                        </div>
                        <div class="details-block">
                            <h2><a href="${l.url}">${l.name}</a></h2>
                            <dl>
                                <dt>Alternate Name:</dt>
                                <dd>${l.alternative_name}</dd>
                            </dl>
                            <dl>
                                <dt>Status:</dt>
                                <dd>${l.status}</dd>
                            </dl>
                            <dl>
                                <dt>Type:</dt>
                                <dd>${l.type}</dd>
                            </dl>   
                            <dl>
                                <dt>Genre:</dt>
                                <dd>${genre}</dd>
                            </dl>
                            <dl>
                                <dt>Author:</dt>
                                <dd><span>ICHIKAWA Masa</span></dd>
                            </dl>
                            <dl>
                                <dt>Last Update:</dt>
                                <dd><a href="${l.chapters[0].url}">${l.chapters[0].name}</a></dd>
                            </dl>
                        </div>
                    </div>
                </div>`;
            });

            $('#page-latest-release').html(renderHtml).promise().done(function () {
                let elements = document.querySelectorAll('.latest-block-all');
                let i = 0, first_element, second_element;

                for (let element of elements) {
                    i++;

                    if (i == 1) {
                        first_element = element;
                    }
                    else {
                        second_element = element;
                        let height = 0;
                        if (first_element.clientHeight >= second_element.clientHeight) {
                            height = first_element.clientHeight;
                        }
                        else {
                            height = second_element.clientHeight;
                        }
                        first_element.style.height = height + 'px';
                        second_element.style.height = height + 'px';
                        i = 0;
                    }

                }
            });

            const functionUpdate = () => { this.renderPageLatestRelease(this.latestRelease); }
            this.renderPagination(list.length, total_show_item, functionUpdate);
        }
    }

    renderPageTopManga(list) {
        if (document.querySelector('#page-top-manga') != null) {
            let renderHtml = '';
            const total_show_item = 16;
            const max_display = this.paginationActive * total_show_item;
            const min_display = max_display - total_show_item;

            list.slice(min_display, max_display).map(l => {

                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                renderHtml += `
                <div class="latest-block-all">
                    <div class="manga-details">
                        <div class="details-image">
                            <a class="img-container" href="${l.url}" style="background-image: url(${l.photo});">
                                <img src="${l.photo}" alt="Read manga ${l.name}">
                            </a>
                        </div>
                        <div class="details-block">
                            <h2><a href="${l.url}">${l.name}</a></h2>
                            <dl>
                                <dt>Alternate Name:</dt>
                                <dd>${l.alternative_name}</dd>
                            </dl>
                            <dl>
                                <dt>Status:</dt>
                                <dd>${l.status}</dd>
                            </dl>
                            <dl>
                                <dt>Type:</dt>
                                <dd>${l.type}</dd>
                            </dl>   
                            <dl>
                                <dt>Genre:</dt>
                                <dd>${genre}</dd>
                            </dl>
                            <dl>
                                <dt>Author:</dt>
                                <dd><span>ICHIKAWA Masa</span></dd>
                            </dl>
                            <dl>
                                <dt>Last Update:</dt>
                                <dd><a href="${l.chapters[l.chapters.length - 1].url}">${l.chapters[l.chapters.length - 1].name}</a></dd>
                            </dl>
                        </div>
                    </div>
                </div>`;
            });

            $('#page-top-manga').html(renderHtml).promise().done(function () {
                let elements = document.querySelectorAll('.latest-block-all');
                let i = 0, first_element, second_element;

                for (let element of elements) {
                    i++;

                    if (i == 1) {
                        first_element = element;
                    }
                    else {
                        second_element = element;
                        let height = 0;
                        if (first_element.clientHeight >= second_element.clientHeight) {
                            height = first_element.clientHeight;
                        }
                        else {
                            height = second_element.clientHeight;
                        }
                        first_element.style.height = height + 'px';
                        second_element.style.height = height + 'px';
                        i = 0;
                    }

                }
            });

            const functionUpdate = () => { this.renderPageTopManga(this.popular); }
            this.renderPagination(list.length, total_show_item, functionUpdate);
        }
    }

    renderPageManga(list) {
        if (document.querySelector('#manga-info') != null) {
            this.validateManga();
            let renderHtml = '';
            let renderHtmlChapters = '';
            let authors = '';
            let categories = '';
            let chapters = '';
            const path = window.location.pathname;

            const details = list.find(l => l.url == path);
            this.renderHeaderMeta(details, null);

            details.authors.map(a => {
                authors += `<span>${a.name}</span>`;
            });
            details.categories.map(c => {
                categories += `<li><a href="${c.url}">${c.name}</a></li>`;
            });
            details.chapters.map(c => {
                chapters += `<li>
                    <a href="${c.url}">
                        <span class="chapter">${c.name}</span>
                        <span class="date">${c.date}</span>
                    </a>
                </li>`;
            });

            $('.breadcrumbs ul').html(`<ul class="loader">
                <li><a href="/">Manga Online</a></li>
                <li>${details.name}</li>
            </ul>`);

            renderHtml = `<div class="manga-details">
                <div class="details-image">
                    <p class="img-container"><img src="${details.photo}"></p>
                    <p class="link-bookmark btn-add"><span>ADD BOOKMARK</span></p>
                    <p class="link-chapter"><a href="#">CHAPTER LIST</a></p>
                </div>
                <div class="details-block">
                    <h2>${details.name}</h2>
                    <dl>
                        <dt>Alternate Name:</dt>
                        <dd>${details.alternative_name}</dd>
                    </dl>
                    <dl>
                        <dt>Status:</dt>
                        <dd>${details.status}</dd>
                    </dl>
                    <dl>
                        <dt>Type:</dt>
                        <dd>${details.type}</dd>
                    </dl>
                    <dl>
                        <dt>Author:</dt>
                        <dd>${authors}</dd>
                    </dl>
                    <dl>
                        <dt>Genre:</dt>
                        <dd>
                            <ul class="genre">${categories}</ul>
                        </dd>
                    </dl>
                </div>
            </div>`;

            renderHtmlChapters = `<div class="manga-chapters">
                <ul class="chapters-head">
                    <li><span class="chapter">Chapter Name</span><span class="date">Date Released</span></li>
                </ul>
                <ul class="chapters-list">
                    ${chapters}
                </ul>
            </div>`;

            $(".manga-details-holder").html(renderHtml);
            $(".manga-chapters").html(renderHtmlChapters);
        }
    }

    renderPageChapter() {
        if (document.querySelector('#chapter-info') != null) {
            this.validateManga();

            const path = window.location.pathname;
            const pathSplit = path.split("/");
            const compiled_path = '/' + pathSplit[1] + '/' + pathSplit[2];
            this.chapter_page_url_active = compiled_path;

            var fd = new FormData();
            fd.append('path', compiled_path);

            const functionPageChapterItems = (episodes_list) => {
                this.renderPageChapterItems(episodes_list);
            }

            $.ajax({
                url: `/api/get-chapter/`,
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                beforeSend: function (xhr) {
                    //const authorkey = "Employee " + sessionStorage.getItem("token");
                    //xhr.setRequestHeader("Authorization", authorkey);
                },
                success: function (data) {
                    const episodes = JSON.parse(data);
                    const episodes_list = episodes.map((e, index) => {
                        const page_no = index + 1;
                        let active = false;
                        if (pathSplit[3] && pathSplit[3] == page_no) {
                            active = true;
                        }
                        else if (!pathSplit[3] && page_no == 1) {
                            active = true;
                        }
                        return {
                            page_no: page_no,
                            image: e,
                            active: active
                        }
                    })

                    functionPageChapterItems(episodes_list);
                }
            });
        }
    }

    renderPageChapterAll() {
        if (document.querySelector('#chapter-info-all') != null) {
            this.validateManga();

            const path = window.location.pathname;
            const pathSplit = path.split("/");
            const compiled_path = '/' + pathSplit[1] + '/' + pathSplit[2];
            this.chapter_page_url_active = compiled_path;

            var fd = new FormData();
            fd.append('path', compiled_path);

            const functionPageChapterItemsAll = (episodes_list) => {
                this.renderPageChapterItemsAll(episodes_list);
            }

            $.ajax({
                url: `/api/get-chapter/`,
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                beforeSend: function (xhr) {
                    //const authorkey = "Employee " + sessionStorage.getItem("token");
                    //xhr.setRequestHeader("Authorization", authorkey);
                },
                success: function (data) {
                    const episodes = JSON.parse(data);
                    const episodes_list = episodes.map((e, index) => {
                        const page_no = index + 1;
                        let active = false;
                        if (pathSplit[3] && pathSplit[3] == page_no) {
                            active = true;
                        }
                        else if (!pathSplit[3] && page_no == 1) {
                            active = true;
                        }
                        return {
                            page_no: page_no,
                            image: e,
                            active: active
                        }
                    })

                    functionPageChapterItemsAll(episodes_list);
                }
            });
        }
    }

    renderPageCategory(list) {
        if (document.querySelector('#page-category') != null) {
            const path = window.location.pathname;
            const pathSplit = path.split("/");

            const category = pathSplit[2];
            const category_url = "/category/" + category;

            const category_list = list.filter(l => {
                const find_category = l.categories.find(c => c.url == category_url);
                if (find_category) {
                    return true;
                }
                return false;
            });

            this.categoriesItems = category_list;

            $('.breadcrumbs ul').html(`<ul>
                <li><a href="/">Manga Online</a></li>
                <li>Category: ${category}</li>
            </ul>`);

            let renderHtml = '';
            const total_show_item = 16;
            const max_display = this.paginationActive * total_show_item;
            const min_display = max_display - total_show_item;

            category_list.slice(min_display, max_display).map(l => {
                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                renderHtml += `
                <div class="latest-block-all">
                    <div class="manga-details">
                        <div class="details-image">
                            <a class="img-container" href="${l.url}" style="background-image: url(${l.photo});">
                                <img src="${l.photo}" alt="Read manga ${l.name}">
                            </a>
                        </div>
                        <div class="details-block">
                            <h2><a href="${l.url}">${l.name}</a></h2>
                            <dl>
                                <dt>Alternate Name:</dt>
                                <dd>${l.alternative_name}</dd>
                            </dl>
                            <dl>
                                <dt>Status:</dt>
                                <dd>${l.status}</dd>
                            </dl>
                            <dl>
                                <dt>Type:</dt>
                                <dd>${l.type}</dd>
                            </dl>   
                            <dl>
                                <dt>Genre:</dt>
                                <dd>${genre}</dd>
                            </dl>
                            <dl>
                                <dt>Author:</dt>
                                <dd><span>ICHIKAWA Masa</span></dd>
                            </dl>
                            <dl>
                                <dt>Last Update:</dt>
                                
                            </dl>
                        </div>
                    </div>
                </div>`;
            });

            $('#page-category').html(renderHtml).promise().done(function () {
                let elements = document.querySelectorAll('.latest-block-all');
                let i = 0, first_element, second_element;

                for (let element of elements) {
                    i++;

                    if (i == 1) {
                        first_element = element;
                    }
                    else {
                        second_element = element;
                        let height = 0;
                        if (first_element.clientHeight >= second_element.clientHeight) {
                            height = first_element.clientHeight;
                        }
                        else {
                            height = second_element.clientHeight;
                        }
                        first_element.style.height = height + 'px';
                        second_element.style.height = height + 'px';
                        i = 0;
                    }

                }
            });

            const functionUpdate = () => { this.renderPageCategory(this.data); }
            this.renderPagination(category_list.length, total_show_item, functionUpdate);


        }
    }

    renderPageStatus(list) {
        if (document.querySelector('#page-status') != null) {
            const path = window.location.pathname;
            const pathSplit = path.split("/");

            const category = pathSplit[2];
            let status = '';

            if (category == 'ongoing') {
                status = 'Ongoing';
            } else if (category == 'completed') {
                status = 'Completed';
            } else {
                window.location = '/404'
            }

            $('.breadcrumbs ul').html(`<ul>
                <li><a href="/">Manga Online</a></li>
                <li>Category: ${status}</li>
            </ul>`);

            const category_list = list.filter(l => l.status == status);

            this.categoriesItems = category_list;

            let renderHtml = '';
            const total_show_item = 16;
            const max_display = this.paginationActive * total_show_item;
            const min_display = max_display - total_show_item;

            category_list.slice(min_display, max_display).map(l => {
                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                renderHtml += `
                <div class="latest-block-all">
                    <div class="manga-details">
                        <div class="details-image">
                            <a class="img-container" href="${l.url}" style="background-image: url(${l.photo});">
                                <img src="${l.photo}" alt="Read manga ${l.name}">
                            </a>
                        </div>
                        <div class="details-block">
                            <h2><a href="${l.url}">${l.name}</a></h2>
                            <dl>
                                <dt>Alternate Name:</dt>
                                <dd>${l.alternative_name}</dd>
                            </dl>
                            <dl>
                                <dt>Status:</dt>
                                <dd>${l.status}</dd>
                            </dl>
                            <dl>
                                <dt>Type:</dt>
                                <dd>${l.type}</dd>
                            </dl>   
                            <dl>
                                <dt>Genre:</dt>
                                <dd>${genre}</dd>
                            </dl>
                            <dl>
                                <dt>Author:</dt>
                                <dd><span>ICHIKAWA Masa</span></dd>
                            </dl>
                            <dl>
                                <dt>Last Update:</dt>
                                
                            </dl>
                        </div>
                    </div>
                </div>`;
            });

            $('#page-status').html(renderHtml).promise().done(function () {
                let elements = document.querySelectorAll('.latest-block-all');
                let i = 0, first_element, second_element;

                for (let element of elements) {
                    i++;

                    if (i == 1) {
                        first_element = element;
                    }
                    else {
                        second_element = element;
                        let height = 0;
                        if (first_element.clientHeight >= second_element.clientHeight) {
                            height = first_element.clientHeight;
                        }
                        else {
                            height = second_element.clientHeight;
                        }
                        first_element.style.height = height + 'px';
                        second_element.style.height = height + 'px';
                        i = 0;
                    }

                }
            });

            const functionUpdate = () => { this.renderPageStatus(this.data); }
            this.renderPagination(category_list.length, total_show_item, functionUpdate);


        }
    }


    //COMPONENTS
    renderHomeToolTip(list) {
        return `<div class="data-tip-container hide">
            <div class="manga-details">
                <div class="details-image">
                <p class="img-container" style="background-image: url('/assets/images/dummy/3.jpg')">
                    <img
                    src="/assets/images/dummy/3.jpg" alt="" />
                </p>
                </div>
                <div class="details-block">
                    <h2>${list.name}</h2>
                    <dl>
                        <dt>Alternate Name:</dt>
                        <dd>Name</dd>
                    </dl>
                    <dl>
                        <dt>Genre:</dt>
                        <dd>
                        <span>Adventure, Action</span>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Year of Release:</dt>
                        <dd>Year</dd>
                    </dl>
                    <dl>
                        <dt>Status:</dt>
                        <dd>Status</dd>
                    </dl>
                    <dl>
                        <dt>Author:</dt>
                        <dd>Author</dd>
                    </dl>
                    <dl>
                        <dt>Artist:</dt>
                        <dd>Artist</dd>
                    </dl>
                    <dl>
                        <dt>Reading Direction:</dt>
                        <dd>Reading</dd>
                    </dl>
                </div>
            </div>
        </div>`;
    }

    renderPagination(total, total_show_item, functionUpdate) {
        if (document.querySelector('.pagination-list') != null) {
            let renderHtml = '';
            const active = this.paginationActive;
            const list_pages = Math.ceil(total / total_show_item);
            const slot = [];

            if (active >= 4) {
                slot[0] = Number(active) - 3;
                slot[1] = Number(active) - 2;
                slot[2] = Number(active) - 1;
                slot[3] = active;
                slot[4] = active + 1 <= list_pages ? Number(active) + 1 : "";
                slot[5] = active + 2 <= list_pages ? Number(active) + 2 : "";
                slot[6] = active + 3 <= list_pages ? Number(active) + 3 : "";
            }
            else {
                for (i = 0; i < 7; i++) {
                    if (i <= list_pages) {
                        slot[i] = i + 1;
                    }
                }
            }


            slot.filter(s => s != "").map(s => {
                if (s == this.paginationActive) {
                    renderHtml += `<a href="#" class="page-no active">${s}</a>`
                } else {
                    renderHtml += `<a href="#" class="page-no">${s}</a>`
                }
            });
            renderHtml = `<div class="pagination-list"><a href="#" class="page-first">&laquo;</a>` + renderHtml;
            renderHtml = renderHtml + `<a href="#" class="page-last">&raquo;</a></div>`;

            const handleFunctionUpdate = () => {
                functionUpdate()
            }
            const handlePaginationActive = (total) => {
                this.paginationActive = total;
            }


            $('.pagination').html(renderHtml).promise().done(function () {
                const first = document.querySelector('.pagination-list .page-first');
                const last = document.querySelector('.pagination-list .page-last');
                const elements = document.querySelectorAll('.pagination-list .page-no');

                first.addEventListener("click", function (event) {
                    event.preventDefault();
                    this.paginationActive = 1;
                    handlePaginationActive(1);
                    handleFunctionUpdate();
                    window.scrollTo(0, 0);
                });

                last.addEventListener("click", function (event) {
                    event.preventDefault();
                    this.paginationActive = list_pages;
                    handlePaginationActive(list_pages);
                    handleFunctionUpdate();
                    window.scrollTo(0, 0);
                });

                for (let element of elements) {
                    element.addEventListener("click", function (event) {
                        event.preventDefault();
                        this.paginationActive = Number(event.target.textContent);
                        handlePaginationActive(Number(event.target.textContent));
                        handleFunctionUpdate();
                        window.scrollTo(0, 0);
                    });
                }

            });
        }
    }

    renderPageChapterItems(list) {
        const path = window.location.pathname;
        const pathSplit = path.split('/');
        const details = this.data.find(l => l.url == '/' + pathSplit[1]);

        let renderHtmlOptions = ''
        let optionChapters = '';
        let pages = '';
        let pages_no_active = '';
        let pages_active = '';
        let chapter_active = '';
        const pages_total = list.length;

        list.map(l => {
            if (l.active) {
                pages_active = l;
                pages_no_active = l.page_no;
                pages += `<option value="${this.chapter_page_url_active}" selected="selected">${l.page_no}</option>`
            } else {
                pages += `<option value="${this.chapter_page_url_active}/${l.page_no}">${l.page_no}</option>`;
            }
        });

        details.chapters.map(c => {
            if (c.url == this.chapter_page_url_active) {
                chapter_active = c;
                optionChapters += `<option value="${c.url}" selected="selected">${c.name}</option>`;
            } else {
                optionChapters += `<option value="${c.url}">${c.name}</option>`;
            }
        });

        this.renderHeaderMeta(details, chapter_active);


        if (pages_no_active > 1) {
            const new_url = this.chapter_page_url_active + '/' + pages_no_active;
            window.history.pushState('', '', new_url);
            window.scrollTo(0, 0);
        }
        else {
            window.history.pushState('', '', this.chapter_page_url_active);
            window.scrollTo(0, 0);
        }

        renderHtmlOptions = `<div class="chapters">
            <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);">
                ${optionChapters}
            </select>
        </div>
        <div class="total">
            <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);">
                <option selected="selected">Single Page</option>
                <option value="${this.chapter_page_url_active}/all_pages">All Pages</option>
            </select>
        </div>
        <div class="spacer"></div>
        <div class="buttons">
            <div class="pageof">
                <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);">
                    ${pages}
                </select>
                <span>of ${pages_total}</span>
            </div>
            <div class="btn">
                <a href="#">
                    <button class="btn_prev">Previous</button>
                </a>
                <a href="#">
                    <button class="btn_next">Next</button>
                </a>
            </div>
        </div>`;

        const handlePageChapterItems = (data_list) => {
            this.renderPageChapterItems(data_list);
        }
        const chapter_page_url_active = this.chapter_page_url_active;

        $('.image-containers').html(`<ul>
            <li>
                <a href="#" class="link_next"><img src="${pages_active.image}" alt="${details.name} ${chapter_active.name}"></a>
            </li>
        </ul>`);

        $('.breadcrumbs ul').html(`<ul class="loader">
            <li><a href="/">Manga Online</a></li>
            <li><a href="${details.url}">${details.name}</a></li>
            <li>${chapter_active.name}</li>
        </ul>`)

        $('.manga-page .page-options').html(renderHtmlOptions).promise().done(function () {
            const datas = details.chapters;
            const item = datas.find(data => data.url == chapter_page_url_active);
            const index = datas.indexOf(item);

            const listActive = list.find(l => l.active == true);
            const listActive_no = listActive.page_no;
            const listLast_no = list[list.length - 1].page_no;

            const functionPageChapterItems = (data_list) => {
                handlePageChapterItems(data_list);
            }

            let all_btn_prev = document.querySelectorAll('.btn_prev');
            for (let btn_prev of all_btn_prev) {
                //prev
                if (listActive_no == 1) {
                    if (index > 0) {
                        //not end chapter
                        const url = datas[index - 1].url;
                        btn_prev.classList.add("btn_prev");
                        btn_prev.textContent = 'Prev Chapter';
                        btn_prev.addEventListener("click", function (event) {
                            event.preventDefault();
                            window.location = url;
                        });
                    }
                    else {
                        //end chapter
                        btn_prev.classList.remove("btn_prev");
                        btn_prev.textContent = 'Prev Chapter';
                        btn_prev.addEventListener("click", function (event) {
                            event.preventDefault();
                        });
                    }
                }
                else {
                    btn_prev.classList.add("btn_prev");
                    btn_prev.textContent = 'Prev';
                    btn_prev.addEventListener("click", function (event) {
                        event.preventDefault();
                        const data_list = JSON.parse(JSON.stringify(list));
                        const item_list = data_list.find(data => data.active == true);
                        const index_list = data_list.indexOf(item_list);
                        data_list[index_list].active = false;
                        data_list[index_list - 1].active = true;
                        functionPageChapterItems(data_list);
                    });
                }
            }

            let all_btn_next = document.querySelectorAll('.btn_next');
            for (let btn_next of all_btn_next) {
                //next
                if (listActive_no == listLast_no) {
                    //next chapter
                    btn_next.classList.add("btn_next");
                    btn_next.textContent = 'Next Chapter';
                    btn_next.addEventListener("click", function (event) {
                        event.preventDefault();
                        const next = datas[index + 1];
                        if (next) {
                            window.location = next.url;
                        }
                        else {
                            window.location = datas[index].url + '/waiting';
                        }
                    });
                    const link_next = document.querySelector('.link_next');
                    link_next.addEventListener("click", function (event) {
                        event.preventDefault();
                        const next = datas[index + 1];
                        if (next) {
                            window.location = next.url;
                        }
                        else {
                            window.location = datas[index].url + '/waiting';
                        }
                    });
                }
                else {
                    //next episode
                    btn_next.classList.add("btn_next");
                    btn_next.textContent = 'Next';
                    btn_next.addEventListener("click", function (event) {
                        event.preventDefault();
                        const data_list = JSON.parse(JSON.stringify(list));
                        const item_list = data_list.find(data => data.active == true);
                        const index_list = data_list.indexOf(item_list);
                        data_list[index_list].active = false;
                        data_list[index_list + 1].active = true;
                        functionPageChapterItems(data_list);
                    });
                    const link_next = document.querySelector('.link_next');
                    link_next.addEventListener("click", function (event) {
                        event.preventDefault();
                        const data_list = JSON.parse(JSON.stringify(list));
                        const item_list = data_list.find(data => data.active == true);
                        const index_list = data_list.indexOf(item_list);
                        data_list[index_list].active = false;
                        data_list[index_list + 1].active = true;
                        functionPageChapterItems(data_list);
                    });
                }
            }

        });
    }

    renderPageChapterItemsAll(list) {

        const path = window.location.pathname;
        const pathSplit = path.split('/');
        const details = this.data.find(l => l.url == '/' + pathSplit[1]);

        let renderHtmlOptions = ''
        let optionChapters = '';
        let pages = '';
        let pages_no_active = '';
        let pages_active = '';
        let chapter_active = '';
        const pages_total = list.length;
        let all_images = '';

        details.chapters.map(c => {
            if (c.url == this.chapter_page_url_active) {
                chapter_active = c;
                optionChapters += `<option value="${c.url}/all_pages" selected="selected">${c.name}</option>`;
            } else {
                optionChapters += `<option value="${c.url}/all_pages">${c.name}</option>`;
            }
        });

        list.map(l => {
            all_images += `<li><img src="${l.image}" alt="${details.name} ${chapter_active.name}"></li>`
        })

        $('.breadcrumbs ul').html(`<ul class="loader">
            <li><a href="/">Manga Online</a></li>
            <li><a href="${details.url}">${details.name}</a></li>
            <li>${chapter_active.name}</li>
        </ul>`);

        $('.image-containers').html(`<ul>
            ${all_images}
        </ul>`);


        renderHtmlOptions = `<div class="chapters">
            <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);">
                ${optionChapters}
            </select>
        </div>
        <div class="total">
            <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);">
                <option value="${this.chapter_page_url_active}">Single Page</option>
                <option selected="selected">All Pages</option>
            </select>
        </div>
        <div class="spacer"></div>
        <div class="buttons">
            <div class="pageof">
            
            </div>
            <div class="btn">
                <a href="#">
                    <button class="btn_prev">Prev Chapter</button>
                </a>
                <a href="#">
                    <button class="btn_next">Next Chapter</button>
                </a>
            </div>
        </div>`;

        const chapter_page_url_active = this.chapter_page_url_active;

        $('.manga-page .page-options').html(renderHtmlOptions).promise().done(function () {
            const datas = [...details.chapters];
            const item = datas.find(data => data.url == chapter_page_url_active);
            const index = datas.indexOf(item);

            //prev
            let all_btn_prev = document.querySelectorAll('.btn_prev');
            for (let btn_prev of all_btn_prev) {
                if (index == 0) {
                    btn_prev.classList.remove("btn_prev");
                    btn_prev.textContent = 'Prev Chapter';
                    btn_prev.addEventListener("click", function (event) {
                        event.preventDefault();
                    });
                }
                else {
                    btn_prev.classList.add("btn_prev");
                    btn_prev.textContent = 'Prev Chapter';
                    btn_prev.addEventListener("click", function (event) {
                        event.preventDefault();
                        window.location = datas[index - 1].url + '/all_pages';
                    });
                }
            }

            //next
            let all_btn_next = document.querySelectorAll('.btn_next');
            for (let btn_next of all_btn_next) {
                if (index >= datas.length - 1) {
                    btn_next.classList.add("btn_next");
                    btn_next.textContent = 'Next Chapter';
                    btn_next.addEventListener("click", function (event) {
                        event.preventDefault();
                        window.location = datas[index].url + '/waiting';
                    });
                }
                else {
                    btn_next.classList.add("btn_next");
                    btn_next.textContent = 'Next Chapter';
                    btn_next.addEventListener("click", function (event) {
                        event.preventDefault();
                        window.location = datas[index + 1].url + '/all_pages';
                    });
                }
            }
        });


    }

    bindSearchInput(list) {
        if (document.querySelector('#search-input') != null) {
            const element = document.querySelector('#search-input');
            const container = document.querySelector('.auto-search-result');

            element.addEventListener('input', function (evt) {
                let renderHtml = '';
                let q = this.value;
                q = q.toUpperCase();

                if (q.length >= 4) {
                    container.classList.remove('hide');

                    const searched = list.filter(d => {
                        let name = d.name;
                        name = name.toUpperCase();

                        if (name.includes(q)) {
                            return true;
                        }
                        return false;
                    });

                    console.log(searched);

                    if (searched.length) {
                        searched.map(s => {
                            const author = s.authors.map(a => {
                                return a.name;
                            });
                            const author_list = author.join(',');

                            renderHtml += `<li>
								<a href="${s.url}">
									<div class="colL">
										<span style="background-image: url('${s.photo}');"></span>
									</div>
									<div class="colR">
										<span class="title">${s.name}</span>
										<span class="artist">${author_list}</span>
									</div>
								</a>
							</li>`;
                        });
                    } else {
                        renderHtml += `<li>No results found!</li>`;
                    }

                    renderHtml = `<ul>${renderHtml}</ul>`;
                    $('.auto-search-result').html(renderHtml);

                }
                else {
                    container.classList.add('hide');
                }
            });
        }
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

    sortListNumber(list, key) {
        list.sort(function (a, b) {
            if (Number(a[key]) < Number(b[key])) { return -1; }
            if (Number(a[key]) > Number(b[key])) { return 1; }
            return 0;
        });
        return list;
    }

    validateManga() {
        const path = window.location.pathname;
        const pathSplit = path.split("/");

        const manga = this.data.find(d => d.url == '/' + pathSplit[1]);
        if (!manga) {
            window.location = '/';
        }
        else {
            if (pathSplit[2]) {
                const chapter = manga.chapters.find(c => c.url == '/' + pathSplit[1] + '/' + pathSplit[2]);
                if (!chapter) {
                    window.location = '/';
                }
            }
        }
    }

    renderHeaderMeta(manga, chapter) {
        let title = '';
        let image = '';
        let url = '';

        if (chapter) {
            title = manga.name + ' ' + chapter.name + ' - Read MangaRiot.com';
            image = window.location.origin + manga.photo;
            url = window.location.origin + chapter.url;
        }
        else {
            title = manga.name + ' - Read MangaRiot.com';
            image = window.location.origin + manga.photo;
            url = window.location.origin + manga.url;
        }

        document.title = title;

        document.querySelector('meta[name="twitter:title"]').setAttribute("content", title);
        document.querySelector('meta[name="twitter:image"]').setAttribute("content", image);

        document.querySelector('meta[property="og:title"]').setAttribute("content", title);
        document.querySelector('meta[property="og:url"]').setAttribute("content", url);
        document.querySelector('meta[property="og:image"]').setAttribute("content", image);
    }
}




document.addEventListener('DOMContentLoaded', function () {
    //document.body.classList.add('loader');
    $.ajax({
        //url: '/api/get-data/',
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
            console.error('Error loading data!' + data);
            //document.body.classList.remove('loader');
        }
    });

})
