const page_no_found = '404';
const components = [
    {
        path: '/',
        component: 'home'
    },
    {
        path: '/manga-list',
        component: 'manga-list'
    },
    {
        path: '/latest-release',
        component: 'latest-release'
    },
    {
        path: '/top-manga',
        component: 'top-manga'
    },
    {
        path: '/category/:value?',
        component: 'category'
    },
    ,
    {
        path: '/:value?',
        component: 'manga'
    },
    {
        path: '/:value?/:value?',
        component: 'chapter'
    },
    {
        path: '/:value?/:value?/all_pages',
        component: 'all-pages'
    },
    {
        path: '/:value?/:value?/:value?',
        component: 'pages'
    }
];

function route() {
    let pathCombinations = [];
    const path = window.location.pathname;
    pathCombinations.push(path);

    let pathBuild = '';
    const pathSplit = path.split('/').filter(p => p != '');
    if (pathSplit.length > 0) {
        pathSplit.map((p, index) => {
            const build_index = index + 1;
            let pathAdd = '';
            for (i = build_index; i <= pathSplit.length; i++) {
                pathAdd += '/:value?';
            }

            const pathBuildPush = pathBuild + pathAdd;
            pathBuild += `/${p}`;

            pathCombinations.push(pathBuildPush);
        });

        for (j = 0; j < pathSplit.length + 1; j++) {
            let pathIndividual = '';
            for (k = 0; k < pathSplit.length; k++) {
                if (j == k) {
                    pathIndividual += '/:value?';
                }
                else {
                    pathIndividual += '/' + pathSplit[k];
                }
            }
            pathCombinations.push(pathIndividual);
        }
    }

    const component = components.map(c => {
        const find = pathCombinations.find(p => p == c.path);
        if (find) {
            return c.component;
        }
    }).filter(c => c != undefined)[0];

    if (component) {
        load(document.getElementsByTagName('body'), component + '.html');
    }
    else {
        load(document.getElementsByTagName('body'), page_no_found + '.html');
    }
}

function load(target, url) {
    var r = new XMLHttpRequest();
    r.open("GET", '/src/' + url, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        target[0].innerHTML = r.responseText;
        includeHTML();
    };
    r.send();
}

function includeHTML() {
    var z, i, elmnt, file, xhttp, body;
    body = document.getElementsByTagName("body");
    z = document.getElementsByTagName("*");

    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}


route();