
class Chapters {
    constructor(allData) {
        //datas
        this.data = allData;
        this.categories = [];
        this.popular = [];
        this.latestRelease = [];
        this.alphabetical = [];

        //state
        this.paginationActive = 1;

        this.init();
    }

    init() {
        console.log(this.data);
        this.categories = this.getCategories();
        this.popular = this.getMostPopular();
        this.latestRelease = this.getLatestRelease();
        this.alphabetical = this.getAlphabetical();

        //home
        this.renderSidebarCategories(this.categories);
        this.renderSidebarPopular(this.popular);
        this.renderHomeLatestRelease(this.latestRelease);
        this.renderMangaListAlphabetical(this.alphabetical);

        //latest release
        this.renderPageLatestRelease(this.latestRelease);
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

    //RENDER
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

        $('#page-home-latest').html(renderHtml).promise().done(function(){
            const elements = document.querySelectorAll('.latest .latest-block .desc p a, .latest .latest-block .cover a');
            for (let element of elements) {
                
                const parent = element.closest(".latest-block");
                const tooltip = parent.querySelector(".data-tip-container");

                element.addEventListener("mousemove", function(event){
                    tooltip.classList.remove('hide');
                    tooltip.style.top  = event.y + 'px';
                    tooltip.style.left  = event.x + 'px';
                });
                element.addEventListener("mouseleave", function(event){
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

    renderPageLatestRelease(list){
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
                        <a class="img-container" href="/a-bout" style="background-image: url(${l.photo});">
                            <img src="${l.photo}" alt="Read manga ${l.name}">
                        </a>
                    </div>
                    <div class="details-block">
                        <h2><a href="/a-bout">${l.name}</a></h2>
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

        $('#page-latest-release').html(renderHtml).promise().done(function(){
            let elements = document.querySelectorAll('.latest-block-all');
            let i = 0, first_element, second_element;

            for (let element of elements) {
                i++;

                if(i == 1){
                    first_element = element;
                }
                else {
                    second_element = element;
                    let height = 0;
                    if(first_element.clientHeight >= second_element.clientHeight){
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



    //COMPONENTS
    renderHomeToolTip(list){
        return  `<div class="data-tip-container hide">
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
    renderPagination(total, total_show_item, functionUpdate){
        if(document.querySelector('.pagination-list') != null){
            let renderHtml = '';
            const active = this.paginationActive;
            const list_pages = Math.ceil(total / total_show_item);
            const slot = [];

            if(active >= 4){
                slot[0] = Number(active) - 3;
                slot[1] = Number(active) - 2;
                slot[2] = Number(active) - 1;
                slot[3] = active;
                slot[4] = active + 1 <= list_pages ?  Number(active) + 1 : "" ;
                slot[5] = active + 2 <= list_pages ?  Number(active) + 2 : "" ;
                slot[6] = active + 3 <= list_pages ?  Number(active) + 3 : "" ;
                console.log('test')
            }
            else {
                for(i = 0; i < 7; i++){
                    if(i <= list_pages){
                        slot[i] = i +1;
                    }
                }
            }

            
            slot.filter(s => s != "").map(s => {
                if(s == this.paginationActive){
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
            
            
            $('.pagination').html(renderHtml).promise().done(function(){
                const first = document.querySelector('.pagination-list .page-first');
                const last = document.querySelector('.pagination-list .page-last');
                const elements = document.querySelectorAll('.pagination-list .page-no');

                first.addEventListener("click", function(event){
                    event.preventDefault();
                    this.paginationActive = 1;
                    handlePaginationActive(1);
                    handleFunctionUpdate();
                    window.scrollTo(0, 0);
                });

                last.addEventListener("click", function(event){
                    event.preventDefault();
                    this.paginationActive = list_pages;
                    handlePaginationActive(list_pages);
                    handleFunctionUpdate();
                    window.scrollTo(0, 0);
                });

                for (let element of elements) {
                    element.addEventListener("click", function(event){
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
