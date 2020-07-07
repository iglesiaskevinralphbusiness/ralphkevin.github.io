
class Chapters {
    constructor() {
        //datas
        this.categories = [];
        this.popular = [];
        this.latestRelease = [];
        this.top30 = [];

        //state
        this.paginationActive = 1;
        this.chapter_page_url_active = '';
        this.chapterActive = {};

        this.init();
    }


    async init() {

        //COMMON ---------------------------------------
        //header
        //this.renderHeaderMenuActive();
        //sidebar
        this.renderSidebarPopular();
        this.renderSidebarCategories();

        //PAGES ----------------------------------------
        //home
        this.renderHomeSlider();
        this.renderHomeLatestRelease();
        //manga page
        this.renderPageManga();
        //chapter page
        this.renderPageChapter();
        //chapter page all
        this.renderPageChapterAll();
        //chapter page waiting
        this.renderPageChapterWaiting();
        //latest release
        this.renderPageLatestRelease();
        //top manga
        this.renderPageTopManga();
        //category
        this.renderPageCategory();
        this.renderPageStatus();
        //search page
        this.renderPageSearchManga();
        //manga list
        this.renderMangaListAlphabetical();
        //contact us page
        this.renderContactUsPage();


        this.listenThemeSelection();


    }

    //GET
    async getTop30() {
        var list = [];
        await $.ajax({
            url: '/api/data/get-top30.php',
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
                    list = data;
                    sessionStorage.setItem('top', JSON.stringify(data));
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getSidebarTop() {
        var list = [];
        await $.ajax({
            url: '/api/data/get-sidebar-top.php',
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
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getCategories() {
        var list = [];
        await $.ajax({
            url: '/api/data/get-categories.php',
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
                    list = data;
                    sessionStorage.setItem('categories', JSON.stringify(data));
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getLatestRelease(page) {
        var list = [];
        var fd = new FormData();
        fd.append('page', page);

        await $.ajax({
            url: '/api/data/get-latest.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            beforeSend:
                function (xhr) {
                    //xhr.setRequestHeader("Authorization", authorizationKey);
                },
            success:
                function (data) {
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getLatestRelease36() {
        var list = [];
        var fd = new FormData();

        await $.ajax({
            url: '/api/data/get-latest-36.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            beforeSend:
                function (xhr) {
                    //xhr.setRequestHeader("Authorization", authorizationKey);
                },
            success:
                function (data) {
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getTopManga(page) {
        var list = [];
        var fd = new FormData();
        fd.append('page', page);

        await $.ajax({
            url: '/api/data/get-top.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            beforeSend:
                function (xhr) {
                    //xhr.setRequestHeader("Authorization", authorizationKey);
                },
            success:
                function (data) {
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getCategory(page, url) {
        var list = [];
        var fd = new FormData();
        fd.append('page', page);
        fd.append('url', url);

        await $.ajax({
            url: '/api/data/get-category.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            beforeSend:
                function (xhr) {
                    //xhr.setRequestHeader("Authorization", authorizationKey);
                },
            success:
                function (data) {
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getStatus(page, status) {
        var list = [];
        var fd = new FormData();
        fd.append('page', page);
        fd.append('status', status);

        await $.ajax({
            url: '/api/data/get-status.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            beforeSend:
                function (xhr) {
                    //xhr.setRequestHeader("Authorization", authorizationKey);
                },
            success:
                function (data) {
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getSearch(page, keyword) {
        var list = [];
        var fd = new FormData();
        fd.append('page', page);
        fd.append('keyword', keyword);

        await $.ajax({
            url: '/api/data/get-search.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            beforeSend:
                function (xhr) {
                    //xhr.setRequestHeader("Authorization", authorizationKey);
                },
            success:
                function (data) {
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
    }

    async getMangaDetails(path) {
        var obj = {}
        var fd = new FormData();
        fd.append('url', path);

        await $.ajax({
            url: '/api/data/get-manga.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            beforeSend:
                function (xhr) {
                    //xhr.setRequestHeader("Authorization", authorizationKey);
                },
            success:
                function (data) {
                    obj = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return obj;
    }

    async getMangaList() {
        var list = [];
        await $.ajax({
            url: '/api/data/get-list.php',
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
                    list = data;
                },
            error: function (data) {
                console.log('Error loading data!', data);
            }
        });
        return list;
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

    async renderSidebarCategories() {
        if (document.querySelector('.categories ul:nth-child(2)') != null) {

            let list = [];
            const todaySession = new Date().getDate();

            if (sessionStorage.getItem('categories')) {
                if (todaySession != sessionStorage.getItem('today')) {
                    sessionStorage.setItem('today', todaySession);
                    list = await this.getCategories();
                } else {
                    list = JSON.parse(sessionStorage.getItem('categories'));
                }
            } else {
                list = await this.getCategories();
            }


            let renderHtml = '';
            list.map(l => {
                renderHtml += `<li><a href="${l.url}">${l.name} <span>(${l.total})</span></a></li>`
            })
            $('.categories ul:nth-child(2)').html(renderHtml);
        }
    }

    async renderSidebarPopular() {
        if (document.querySelector('.body-sidebar .side-popular ul') != null) {

            let list = [];
            const todaySession = new Date().getDate();

            if (sessionStorage.getItem('top')) {
                if (todaySession != sessionStorage.getItem('today')) {
                    list = await this.getSidebarTop();
                } else {
                    list = JSON.parse(sessionStorage.getItem('top'));
                }

            } else {
                list = await this.getSidebarTop();
            }


            let renderHtml = '';

            list.slice(0, 5).map(l => {
                const lastChapterTotal = l.chapters.length;
                const lastChapter = l.chapters[lastChapterTotal - 1];

                renderHtml += `<li>
                    <div class="cover">
                        <a href="${l.url}" style="background-image: url('${l.photo}');"><img src="${l.photo}" alt="${l.name}"></a>
                    </div>
                    <div class="desc">
                        <p class="title"><a href="${l.url}">${l.name}</a></p>
                        <p class="chapter"><a href="${lastChapter.url}">${lastChapter.name}</a></p>
                    </div>
                </li>`;
            });

            $('.body-sidebar .side-popular ul').html(renderHtml);
        }
    }

    async renderHomeLatestRelease() {
        if (document.querySelector('#page-home-latest') != null) {

            const list = await this.getLatestRelease36();

            let renderHtml = '';
            let popular = this.popular.slice(0, 30);
            if (!this.popular) {
                popular = JSON.parse(this.sessionStorage.getItem('top'));
            }

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) { dd = '0' + dd; }
            if (mm < 10) { mm = '0' + mm; }
            var date_today = yyyy + '/' + mm + '/' + dd;

            today.setDate(today.getDate() - 1)
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) { dd = '0' + dd; }
            if (mm < 10) { mm = '0' + mm; }
            var date_yesterday = yyyy + '/' + mm + '/' + dd;

            list.data.filter(l => l.chapters.length > 0).map(l => {
                let renderPopular = '';
                let chaptersHtml = '';
                l.chapters.map(c => {
                    let renderNew = '';
                    if (date_today == c.date) {
                        renderNew = `<span class="label-new">New</span>`;
                    } else if (date_yesterday == c.date) {
                        renderNew = `<span class="label-new">New</span>`;
                    }

                    if (renderNew) {


                        const newToday = new Date().getTime();
                        const newLast = Number(l.date_last_crawled);
                        var newTime = newToday - newLast;

                        var daysDifference = Math.floor(newTime / 1000 / 60 / 60 / 24);
                        newTime -= daysDifference * 1000 * 60 * 60 * 24

                        var hoursDifference = Math.floor(newTime / 1000 / 60 / 60);
                        newTime -= hoursDifference * 1000 * 60 * 60

                        var minutesDifference = Math.floor(newTime / 1000 / 60);
                        newTime -= minutesDifference * 1000 * 60

                        var secondsDifference = Math.floor(newTime / 1000);

                        const newTimeStampClean = 'difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ';
                        let newDisplay = '';
                        if (daysDifference) {
                            newDisplay = daysDifference + ' days ago';
                        } else if (hoursDifference) {
                            newDisplay = hoursDifference + ' hours ago';
                        } else if (minutesDifference) {
                            newDisplay = minutesDifference + ' mins ago';
                        } else {
                            newDisplay = secondsDifference + ' secs ago';
                        }


                        chaptersHtml += `<li>
                            <a href="${c.url}">${c.name}${renderNew}</a>
                            <span>${newDisplay}</span>
                        </li>`;
                    }
                    else {
                        chaptersHtml += `<li>
                            <a href="${c.url}">${c.name}${renderNew}</a>
                            <span>${c.date}</span>
                        </li>`;
                    }


                });

                const tooltip = this.renderHomeToolTip(l);
                const findPopular = popular.find(p => p.url == l.url);
                if (findPopular) {
                    renderPopular = `<span class="label-hot">Hot</span>`;
                }

                renderHtml += `<div class="latest-block">
                    <div class="cover">
                        <p class="views"><i class="fa fa-eye"></i> <span>${l.total_views}</span></p>
                        <a href="${l.url}" style="background-image: url(${l.photo})"><img src="${l.photo}" alt="${l.name}"></a>
                    </div>
                    <div class="desc">
                        <p><a href="${l.url}">${l.name}${renderPopular}</a></p>
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
    }

    async renderMangaListAlphabetical() {
        if (document.querySelector('.alphabetical') != null) {
            let renderHtml = '';

            const list = await this.getMangaList();

            list.map(l => {
                let list = '';

                l.list.map(m => {
                    list += ` <li><a href="${m.url}">${m.name}</a></li>`;
                });

                renderHtml += `<section class="alpha-block">
                    <div class="alpha-container">
                        <h2>${l.title}</h2>
                        <ul>
                           ${list}
                        </ul>
                    </div>
                </section>`;
            });

            $('.alphabetical').html(renderHtml);

        }
    }

    async renderPageLatestRelease() {
        if (document.querySelector('#page-latest-release') != null) {
            let renderHtml = '';

            const list = await this.getLatestRelease(this.paginationActive);


            list.data.map(l => {

                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                const last_chapter = l.chapters[0];
                const last_chapter_link = last_chapter ? `<a href="${last_chapter.url}">${last_chapter.name}</a>` : `<dd style="
                color: #FF5722;"><span>Coming soon</span></dd>`;

                const newToday = new Date().getTime();
                const newLast = Number(l.date_last_crawled);
                var newTime = newToday - newLast;

                var daysDifference = Math.floor(newTime / 1000 / 60 / 60 / 24);
                newTime -= daysDifference * 1000 * 60 * 60 * 24

                var hoursDifference = Math.floor(newTime / 1000 / 60 / 60);
                newTime -= hoursDifference * 1000 * 60 * 60

                var minutesDifference = Math.floor(newTime / 1000 / 60);
                newTime -= minutesDifference * 1000 * 60

                var secondsDifference = Math.floor(newTime / 1000);

                const newTimeStampClean = 'difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ';
                let newDisplay = '';
                if (daysDifference) {
                    newDisplay = daysDifference + ' days ago';
                } else if (hoursDifference) {
                    newDisplay = hoursDifference + ' hours ago';
                } else if (minutesDifference) {
                    newDisplay = minutesDifference + ' mins ago';
                } else {
                    newDisplay = secondsDifference + ' secs ago';
                }

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
                                <dd>${last_chapter_link}<span class='release'>${newDisplay}</span></dd>
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

            const functionUpdate = () => {
                let renderHtml = ``;
                for (let i = 0; i < list.pagination.item_per_page; i++) {
                    renderHtml += `<div class="latest-block-all loader">
                        <div class="manga-details">
                            <div class="details-image">
                                <div class="img-container"></div>
                            </div>
                            <div class="details-block">
                                <h2></h2>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                            </div>
                        </div>
                    </div>`;
                }
                $('#page-latest-release').html(renderHtml);
                this.renderPageLatestRelease();
            }
            this.renderPagination(list.pagination.total_items, list.pagination.item_per_page, functionUpdate);
        }
    }

    async renderPageTopManga() {
        if (document.querySelector('#page-top-manga') != null) {
            let renderHtml = '';

            const list = await this.getTopManga(this.paginationActive);

            list.data.map(l => {

                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                const last_chapter = l.chapters[l.chapters.length - 1];
                const last_chapter_link = last_chapter ? `<a href="${last_chapter.url}">${last_chapter.name}</a>` : '';

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
                                <dd>${last_chapter_link}</dd>
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

            const functionUpdate = () => {
                let renderHtml = ``;
                for (let i = 0; i < list.pagination.item_per_page; i++) {
                    renderHtml += `<div class="latest-block-all loader">
                        <div class="manga-details">
                            <div class="details-image">
                                <div class="img-container"></div>
                            </div>
                            <div class="details-block">
                                <h2></h2>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                            </div>
                        </div>
                    </div>`;
                }
                $('#page-top-manga').html(renderHtml);

                this.renderPageTopManga();
            }
            this.renderPagination(list.pagination.total_items, list.pagination.item_per_page, functionUpdate);
        }
    }

    async renderPageManga() {
        if (document.querySelector('#manga-info') != null) {
            let renderHtml = '';
            let renderHtmlChapters = '';
            let authors = '';
            let categories = '';
            let chapters = '';
            const path = window.location.pathname;
            const details = await this.getMangaDetails(path);


            if (!details) { window.location = '/'; }
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
                    <p class="img-container"><img src="${details.photo}" alt="${details.name}"></p>
                    <p class="link-bookmark btn-add"><span data-toggle="modal" data-target="#loginModalCenter">ADD BOOKMARK</span></p>
                    <p class="link-chapter"><a href="#manga-chapters">CHAPTER LIST</a></p>
                </div>
                <div class="details-block">
                    <h2>${details.name}</h2>
                    <dl>
                        <dt>Views:</dt>
                        <dd class="views"> ${details.total_views}</dd>
                    </dl>
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
                    <p>${details.description}</p>
                </div>
            </div>`;

            renderHtmlChapters = `
                <ul class="chapters-head">
                    <li><span class="chapter">Chapter Name</span><span class="date">Date Released</span></li>
                </ul>
                <ul class="chapters-list">
                    ${chapters}
                </ul>`;

            const getIsBoorkmarked = () => {
                this.getIsBoorkmarked();
            }

            $(".manga-details-holder").html(renderHtml).promise().done(function () {
                getIsBoorkmarked();
            });
            $(".manga-chapters").html(renderHtmlChapters);
        }
    }

    async renderPageChapter() {
        if (document.querySelector('#chapter-info') != null) {

            const path = window.location.pathname;
            const pathSplit = path.split("/");
            const manga_path = '/' + pathSplit[1];
            const compiled_path = '/' + pathSplit[1] + '/' + pathSplit[2];
            this.chapter_page_url_active = compiled_path;

            const details = await this.getMangaDetails(manga_path);


            var fd = new FormData();
            fd.append('path', compiled_path);

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
                    });

                    functionPageChapterItems(episodes_list);
                }
            });

            const functionPageChapterItems = (episodes_list) => {
                this.renderPageChapterItems(episodes_list, details);
            }
        }
    }

    async renderPageChapterAll() {
        if (document.querySelector('#chapter-info-all') != null) {

            const path = window.location.pathname;
            const pathSplit = path.split("/");
            const manga_path = '/' + pathSplit[1];
            const compiled_path = '/' + pathSplit[1] + '/' + pathSplit[2];
            this.chapter_page_url_active = compiled_path;


            const details = await this.getMangaDetails(manga_path);

            var fd = new FormData();
            fd.append('path', compiled_path);

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

            const functionPageChapterItemsAll = (episodes_list) => {
                this.renderPageChapterItemsAll(episodes_list, details);
            }
        }
    }

    async renderPageChapterWaiting() {
        if (document.querySelector('#chapter-waiting') != null) {

            const path = window.location.pathname;
            const pathSplit = path.split("/");
            const manga_path = '/' + pathSplit[1];
            const compiled_path = '/' + pathSplit[1] + '/' + pathSplit[2];
            this.chapter_page_url_active = compiled_path;


            const details = await this.getMangaDetails(manga_path);

            var fd = new FormData();
            fd.append('path', compiled_path);

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

            const functionPageChapterItemsAll = (episodes_list) => {
                this.renderPageChapterItemsAll(episodes_list, details);
            }
        }
    }

    async renderPageCategory() {
        if (document.querySelector('#page-category') != null) {
            const path = window.location.pathname;
            const pathSplit = path.split("/");

            const category = pathSplit[2];
            const category_url = "/category/" + category;


            $('.breadcrumbs ul').html(`<ul>
                <li><a href="/">Manga Online</a></li>
                <li>Category: ${category}</li>
            </ul>`);

            let renderHtml = '';

            const list = await this.getCategory(this.paginationActive, category_url);

            list.data.map(l => {
                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                const last_chapter = l.chapters[l.chapters.length - 1];
                const last_chapter_link = last_chapter ? `<a href="${last_chapter.url}">${last_chapter.name}</a>` : '';

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
                                <dd>${last_chapter_link}</dd>
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

            const functionUpdate = () => {
                let renderHtml = ``;
                for (let i = 0; i < list.pagination.item_per_page; i++) {
                    renderHtml += `<div class="latest-block-all loader">
                        <div class="manga-details">
                            <div class="details-image">
                                <div class="img-container"></div>
                            </div>
                            <div class="details-block">
                                <h2></h2>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                            </div>
                        </div>
                    </div>`;
                }
                $('#page-category').html(renderHtml);
                this.renderPageCategory();
            }
            this.renderPagination(list.pagination.total_items, list.pagination.item_per_page, functionUpdate);

        }
    }

    async renderPageStatus() {
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


            const list = await this.getStatus(this.paginationActive, status);

            let renderHtml = '';
            const total_show_item = 16;
            const max_display = this.paginationActive * total_show_item;
            const min_display = max_display - total_show_item;

            list.data.map(l => {
                let genre = '';
                l.categories.map(c => {
                    genre += `<span>${c.name}</span>`;
                });

                const last_chapter = l.chapters[l.chapters.length - 1];
                const last_chapter_link = last_chapter ? `<a href="${last_chapter.url}">${last_chapter.name}</a>` : '';

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
                                <dd>${last_chapter_link}</dd>
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

            const functionUpdate = () => {
                let renderHtml = ``;
                for (let i = 0; i < list.pagination.item_per_page; i++) {
                    renderHtml += `<div class="latest-block-all loader">
                        <div class="manga-details">
                            <div class="details-image">
                                <div class="img-container"></div>
                            </div>
                            <div class="details-block">
                                <h2></h2>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                                <dl>
                                    <dt></dt>
                                    <dd></dd>
                                </dl>
                            </div>
                        </div>
                    </div>`;
                }
                $('#page-status').html(renderHtml);
                this.renderPageStatus();
            }
            this.renderPagination(list.pagination.total_items, list.pagination.item_per_page, functionUpdate);


        }
    }

    async renderHomeSlider() {
        if (document.querySelector('#popular-slider') != null) {
            let list = [];
            const todaySession = new Date().getDate();

            if (sessionStorage.getItem('top')) {
                if (todaySession != sessionStorage.getItem('today')) {
                    sessionStorage.setItem('today', todaySession);
                    list = await this.getTop30();
                } else {
                    list = JSON.parse(sessionStorage.getItem('top'));
                }

            } else {
                list = await this.getTop30();
            }

            this.popular = list;


            let renderHtml = '';
            const top30 = list.slice(0, 30);
            let random30 = top30.map((a) => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map((a) => a.value);


            random30.map(r => {
                const last_chapter = r.chapters[r.chapters.length - 1];


                renderHtml += `<div>
                    <a class="slide-block" href="${last_chapter.url}" style="background-image: url('${r.photo}')">
                        <img src="${r.photo}" alt="${r.name}">
                        <div class="desc">
                            <p class="views"><i class="fa fa-eye"></i> ${r.total_views}</p>
                            <p class="name">${r.name}</p>
                            <p class="chapter">${last_chapter.name}</p>
                        </div>
                    </a>
                </div>`;
            })

            renderHtml = '<section class="regular slider">' + renderHtml + '</section>';

            $('#popular-slider').html(renderHtml);

            $(".regular").slick({
                dots: true,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 5,
                autoplay: true,
                autoplaySpeed: 6000,
                pauseOnHover: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            });
        }
    }

    async renderPageSearchManga(list) {
        if (document.querySelector('#page-search-manga') != null) {
            let renderHtml = '';
            const searchValue = sessionStorage.getItem('searchValue');


            if (searchValue) {

                const searched = await this.getSearch(this.paginationActive, searchValue);

                if (searched.data.length) {
                    searched.data.map(l => {

                        let genre = '';
                        l.categories.map(c => {
                            genre += `<span>${c.name}</span>`;
                        });

                        const last_chapter = l.chapters[l.chapters.length - 1];
                        const last_chapter_link = last_chapter ? `<a href="${last_chapter.url}">${last_chapter.name}</a>` : '';

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
                                        <dd>${last_chapter_link}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>`;
                    });
                }
                else {
                    //no results found
                    renderHtml = `<div>
                        <p>No result found for "<strong>${searchValue}</strong>"</p>
                        <p>Please make sure the search value you provided is correct or Try other specific word</p>
                    </div>`;
                }
            }
            else {
                //please make a search
                renderHtml = `<div>
                        <p>Please enter search keyboard.</p>
                    </div>`;
            }

            $('#page-search-manga').html(renderHtml).promise().done(function () {
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
        }
    }

    renderContactUsPage() {
        if (document.querySelector('.contact-us') != null) {
            if (sessionStorage.getItem('contact-us') == "success") {
                document.getElementById('alert-success').classList.remove('hide');
                sessionStorage.setItem('contact-us', null);
            } else if (sessionStorage.getItem('contact-us') == "failed") {
                document.getElementById('alert-failed').classList.remove('hide');
                sessionStorage.setItem('contact-us', null);
            }
        }
    }


    //COMPONENTS
    renderHomeToolTip(list) {
        let category = '';
        list.categories.map(c => {
            category += `<span>${c.name}</span>, `;
        })
        let author = '';
        list.authors.map(a => {
            author += `<span>${a.name}</span>, `;
        })

        return `<div class="data-tip-container hide">
            <div class="manga-details">
                <div class="details-image">
                    <p class="img-container" style="background-image: url('${list.photo}')">
                        <img src="${list.photo}" alt="Read ${list.name}" />
                    </p>
                </div>
                <div class="details-block">
                    <h2>${list.name}</h2>
                    <p class="views"><i class="fa fa-eye"></i> ${list.total_views}</p>
                    <dl>
                        <dt>Alternate Name:</dt>
                        <dd>${list.alternative_name}</dd>
                    </dl>
                    <dl>
                        <dt>Status:</dt>
                        <dd>${list.status}</dd>
                    </dl>
                    <dl>
                        <dt>Status:</dt>
                        <dd>${author}</dd>
                    </dl>
                    <dl>
                        <dt>Type:</dt>
                        <dd>${list.type}</dd>
                    </dl>

                    <dl>
                        <dt>Genre:</dt>
                        <dd>${category}</dd>
                    </dl>
                    <p>${list.description}</p>
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
                const first = document.querySelectorAll('.pagination-list .page-first');
                const last = document.querySelectorAll('.pagination-list .page-last');
                const elements = document.querySelectorAll('.pagination-list .page-no');

                for (let f of first) {
                    f.addEventListener("click", function (event) {
                        event.preventDefault();
                        this.paginationActive = 1;
                        handlePaginationActive(1);
                        handleFunctionUpdate();
                        window.scrollTo(0, 0);
                    });
                }

                for (let l of last) {
                    l.addEventListener("click", function (event) {
                        event.preventDefault();
                        this.paginationActive = list_pages;
                        handlePaginationActive(list_pages);
                        handleFunctionUpdate();
                        window.scrollTo(0, 0);
                    });
                }

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

    renderPageChapterItems(list, details) {
        const path = window.location.pathname;
        const pathSplit = path.split('/');

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
            this.renderPageChapterItems(data_list, details);
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
            const datas = details.chapters.reverse();
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
                        console.log(data_list);
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

    renderPageChapterItemsAll(list, details) {

        const path = window.location.pathname;
        const pathSplit = path.split('/');

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

        this.renderHeaderMeta(details, chapter_active);

        list.map((l, index) => {
            const flagAdvert = index % 2;
            if (flagAdvert == 0) {
                const advert = [
                    '<iframe src="/ads/ads320x50.html" class="ads320x50"></iframe>',
                    '<iframe src="/ads/ads300x250.html" class="ads300x250"></iframe>',
                    '<iframe src="/ads/native.html" class="adsNavtive100percentx210"></iframe>',
                    '<iframe src="/ads/ads729x90.html" class="ads729x90"></iframe>'
                ];
                const rand_no = Math.floor(Math.random() * advert.length - 1);

                if (advert[rand_no]) {
                    all_images += `<li class="advert">${advert[rand_no]}</li>`;
                }
            }

            all_images += `<li><img src="${l.image}" alt="${details.name} ${chapter_active.name}"></li>`;
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
            const datas = [...details.chapters].reverse();
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


        const renderHtmlWaiting = `<div class="btn">
            <a href="/${pathSplit[1]}/${pathSplit[2]}/all_pages">
                <button class="btn_prev">Prev Chapter</button>
            </a>
            <a href="/${pathSplit[1]}">
                <button class="btn_next">All Chapters</button>
            </a>
        </div>`;
        $('.page-options-waiting').html(renderHtmlWaiting);


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

    //BOOKMARK
    getIsBoorkmarked() {
        const uid = sessionStorage.getItem('uid');
        const url = window.location.pathname;
        const handleBookmark = () => {
            this.handleBookmark();
        }

        if (uid && uid != "undefined") {
            $.ajax({
                type: "GET",
                url: '/api/data/account/get-bookmarked-is.php',
                data: {
                    uid: uid,
                    url: url,
                },
                success: function (data) {
                    const flag = data.data;
                    const button = $('.manga-info .manga-details .details-image .link-bookmark');
                    if (flag) {
                        button.removeClass('btn-add').addClass('btn-remove');
                        button.html('<span>REMOVE BOOKMARK</span>').promise().done(function () {
                            handleBookmark();
                        });
                    } else {
                        button.removeClass('btn-remove').addClass('btn-add');
                        button.html('<span>ADD BOOKMARK</span>').promise().done(function () {
                            handleBookmark();
                        });
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            }, handleBookmark);
        }
    }
    handleBookmark() {
        const button = document.querySelector('.manga-info .manga-details .details-image .link-bookmark span');
        const getIsBoorkmarked = () => {
            this.getIsBoorkmarked();
        }

        button.addEventListener("click", function (e) {
            e.preventDefault();

            const url = window.location.pathname;
            const uid = sessionStorage.getItem('uid');
            let add = false;

            if (document.querySelector('.manga-info .manga-details .details-image .link-bookmark').classList.contains('btn-add')) {
                add = true;
            }

            $.ajax({
                type: "GET",
                url: '/api/data/account/post-bookmarked-add.php',
                data: {
                    uid: uid,
                    url: url,
                    add: add,
                    time: new Date().getTime(),
                },
                success: function (data) {
                    getIsBoorkmarked();
                    const allAccount = new Accounts();
                },
                error: function (data) {
                    console.log(data);
                }
            });


        }, getIsBoorkmarked);
    }

    listenThemeSelection() {
        const selectElement = document.querySelector('.theme-selection');
        if (selectElement != null) {

            if (sessionStorage.getItem('theme')) {
                const options = document.querySelector('.theme-selection').children;

                for (let option of options) {
                    if (option.value == sessionStorage.getItem('theme')) {
                        option.setAttribute("selected", "selected");
                    }
                }
            }


            selectElement.addEventListener("change", function () {
                const selectedValue = this.options[this.selectedIndex].value;
                switch (selectedValue) {
                    case 'dark':
                        document.body.classList.add('dark');
                        sessionStorage.setItem('theme', 'dark');
                        break;
                    default:
                        document.body.classList.remove('dark');
                        sessionStorage.removeItem('theme');
                        break;
                }
            });
        }
        this.listenThemeSelectionMobile();
    }

    listenThemeSelectionMobile() {
        const selectElement = document.querySelector('.theme-selection-mobile');
        if (selectElement != null) {

            if (sessionStorage.getItem('theme')) {
                const options = document.querySelector('.theme-selection-mobile').children;

                for (let option of options) {
                    if (option.value == sessionStorage.getItem('theme')) {
                        option.setAttribute("selected", "selected");
                    }
                }
            }


            selectElement.addEventListener("change", function () {
                const selectedValue = this.options[this.selectedIndex].value;
                switch (selectedValue) {
                    case 'dark':
                        document.body.classList.add('dark');
                        sessionStorage.setItem('theme', 'dark');
                        break;
                    default:
                        document.body.classList.remove('dark');
                        sessionStorage.removeItem('theme');
                        break;
                }
            });
        }
    }
}




document.addEventListener('DOMContentLoaded', function () {

    /*
    $.ajax({
        url: '/assets/services/chapters_cleaned.json',
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
    */

    //const allChapters = new Chapters();


})
