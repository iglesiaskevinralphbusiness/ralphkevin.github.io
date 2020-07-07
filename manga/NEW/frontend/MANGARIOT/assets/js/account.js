class Accounts {
    constructor() {
        this.init();
    }

    init() {
        this.headerAccount();
        this.signUp();
        this.signIn();
        this.comments();
        this.getBookmarksList();
    }

    headerAccount() {
        if (document.querySelector('.header-login-signup') != null) {
            let renderHtml = '';
            const uid = sessionStorage.getItem('uid');
            if (uid && uid != "undefined") {
                renderHtml = `
                <!--<li>
                    <a class="user user-loader"></a>
                </li>
                <li>
                    <a class="user user-loader"></a>
                </li>-->
                <li>
                    <a class="user user-loader"></a>
                </li>
                <li>
                    <a class="user user-loader"></a>
                </li>`;
                $('.header-login-signup').html(renderHtml);
                $('header .header-nav-mobile .menus .mobile-account').html(renderHtml);



                $.ajax({
                    type: "POST",
                    url: '/api/data/account/get-account.php',
                    data: {
                        uid: uid,
                    },
                    success: function (data) {
                        const notifications = data.data.notifications ? `(${data.data.notifications})` : '';
                        const bookmarks = data.data.bookmarks ? `(${data.data.bookmarks})` : '';

                        const renderHtml = `
                        <!--<li>
                            <a class="user" href="/user-profile/${data.data.username}"><i class="fa fa-user"></i> Profile</a>
                        </li>
                        <li>
                            <a class="user" href="/user-notifications"><i class="fa fa-bell"></i> Notifications ${notifications}</a>
                        </li>-->
                        <li>
                            <a class="user" href="/user-bookmarks"><i class="fa fa-bookmark"></i> Bookmarks ${bookmarks}</a>
                        </li>
                        <li>
                            <a class="user account-logout" href="/user-logout"><i class="fa fa-sign-out-alt"></i> Logout</a>
                        </li>`;

                        $('.header-login-signup').html(renderHtml).promise().done(function () {
                            document.querySelector('header .header-login-signup li .account-logout').addEventListener("click", function (e) {
                                e.preventDefault();
                                sessionStorage.removeItem('uid');
                                window.location = window.location.pathname;
                            });
                        });
                        $('header .header-nav-mobile .menus .mobile-account').html(renderHtml).promise().done(function () {
                            document.querySelector('header .header-nav-mobile .menus .account-logout').addEventListener("click", function (e) {
                                e.preventDefault();
                                sessionStorage.removeItem('uid');
                                window.location = window.location.pathname;
                            });
                        });

                    },
                    error: function (data) {
                        sessionStorage.removeItem('uid');
                        window.location = '/';
                    }
                })



            } else {
                renderHtml = `<li>
                    <a class="login" href="#" data-toggle="modal" data-target="#loginModalCenter">Login <i class="fa fa-user"></i></a>
                </li>
                <li>
                    <a class="login" href="/sign-up">Sign Up <i class="fa fa-user-edit"></i></a>
                </li>`;
                $('.header-login-signup').html(renderHtml);
                $('header .header-nav-mobile .menus .mobile-account').html(renderHtml);
            }
        }
    }

    signUp() {
        if (document.querySelector('.sign-up-con') != null) {

            document.querySelector("#signUpForm").addEventListener("submit", function (e) {
                e.preventDefault();
                $('#signUpFormWarnings').html();

                let error_msg = '';
                const spinner = `<div class="signupbtn-spinner">
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>`;
                const submit = `<button type="submit" class="signupbtn">Sign Up</button>`;

                const username = e.srcElement[0].value;
                const email = e.srcElement[1].value;
                const password1 = e.srcElement[2].value;
                const password2 = e.srcElement[3].value;

                const validateEmail = (email) => {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }

                const validateUsername = (username) => {
                    if (/^[a-zA-Z0-9-]*$/.test(username) == false) {
                        //Your search string contains illegal characters.
                        return true;
                    }
                    return false
                }

                if (validateUsername(username)) {
                    error_msg = `<div class="alert alert-danger" role="alert">
                        Special characters and space are not allowed in display name.
                    </div>`;
                    $('#signUpFormWarnings').html(error_msg);
                } else if (username.length <= 3) {
                    error_msg = `<div class="alert alert-danger" role="alert">
                        Minimum characters for display name is 4.
                    </div>`;
                    $('#signUpFormWarnings').html(error_msg);
                } else if (username.length >= 16) {
                    error_msg = `<div class="alert alert-danger" role="alert">
                        Maximum characters for display name is 15.
                    </div>`;
                    $('#signUpFormWarnings').html(error_msg);
                } else if (!validateEmail(email)) {
                    error_msg = `<div class="alert alert-danger" role="alert">
                        Invalid email format.
                    </div>`;
                    $('#signUpFormWarnings').html(error_msg);
                } else if (password1 != password2) {
                    error_msg = `<div class="alert alert-danger" role="alert">
                        Confirm password not matched.
                    </div>`;
                    $('#signUpFormWarnings').html(error_msg);
                } else {
                    $('#signUpFormButton').html(spinner);

                    $.ajax({
                        type: "POST",
                        url: '/api/data/post-sign-up.php',
                        data: {
                            username: username,
                            email: email,
                            password: password1,
                            validateCaptcha: 'true',
                            //THIS WILL TELL THE FORM IF THE USER IS CAPTCHA VERIFIED.
                            captcha: grecaptcha.getResponse()
                        },
                        success: function (data) {
                            $('#signUpFormWarnings').html(error_msg);
                            $('.sign-up-con').html(`
                                <div class="alert alert-success" role="alert">
                                    Your account successfully registered! Please wait while your being redirected to the login page.
                                </div>
                                <div style='padding: 20; text-align: center;'>
                                    <div class="spinner-border text-success" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            `);

                            setTimeout(function () {
                                sessionStorage.setItem('uid', data.uid);
                                window.location = '/';
                            }, 2000)
                        },
                        error: function (data) {
                            $('#signUpFormButton').html(submit);
                            console.log('Error loading data!', data);
                            const error_msg = `<div class="alert alert-danger" role="alert">
                                ${data.responseJSON.msg}
                            </div>`;
                            $('#signUpFormWarnings').html(error_msg);
                        }
                    })


                }
            });


        }
    }

    signIn() {
        if (document.querySelector('#loginModalCenter') != null) {
            document.querySelector("#signInForm").addEventListener("submit", function (e) {
                e.preventDefault();

                let error_msg = '';
                const spinner = `<div class="signinbtn-spinner">
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>`;
                const submit = `<input type="submit" value="Login">`;

                $('#signInFormWarnings').html(error_msg);
                $('#signInFormButton').html(spinner);

                const email = e.srcElement[0].value;
                const password = e.srcElement[1].value;

                $.ajax({
                    type: "POST",
                    url: '/api/data/post-sign-in.php',
                    data: {
                        email: email,
                        password: password,
                        validateCaptcha: 'false',
                        //captcha: grecaptcha.getResponse()
                    },
                    success: function (data) {
                        sessionStorage.setItem('uid', data.uid);
                        window.location = window.location.pathname;
                    },
                    error: function (data) {
                        $('#signUpFormButton').html(submit);
                        console.log('Error loading data!', data);
                        const error_msg = `<div class="alert alert-danger" role="alert">
                            ${data.responseJSON.msg}
                        </div>`;
                        $('#signInFormWarnings').html(error_msg);
                        $('#signInFormButton').html(submit);
                    }
                })

            });
        }
    }

    //COMMENTS
    comments() {
        if (document.querySelector('#comment-section') != null) {
            let renderHtml = '';

            //render comment write
            const uid = sessionStorage.getItem('uid');
            if (uid && uid != "undefined") {
                renderHtml += `<div class="write">
                    <div class="left">
                        <div class="avatar">
                            <div class="image"><i class="fa fa-user"></i></div>
                        </div>
                    </div>
                    <div class="right">
                        <form>
                            <textarea placeholder="Leave a comment" maxlength="500" class="input-write"></textarea>
                            <button type="button" class="btn primary-button btn-write">Write</button>
                        </form>
                    </div>
                </div>`;
            } else {
                renderHtml += `<div class="write">
                    <div class="left">
                        <div class="avatar">
                            <div class="image"><i class="fa fa-user"></i></div>
                        </div>
                    </div>
                    <div class="right">
                        <form>
                            <textarea placeholder="Leave a comment" maxlength="16384"></textarea>
                            <button type="button" class="btn primary-button" data-toggle="modal"
                                data-target="#loginModalCenter">Sign In</button>
                            <p class="lbl">Please sign in to create comments.</p>
                        </form>
                    </div>
                </div>`;
            }


            renderHtml += `<div class="comments-list"></div>`;


            const handleWriteComment = () => {
                this.handleWriteComment();
            }
            const getCommentList = () => {
                this.getCommentList();
            }

            $('#comment-section .comments').html(renderHtml).promise().done(function () {
                const btnWrite = document.querySelector('#comment-section .comments .btn-write');
                if (btnWrite != null) {
                    btnWrite.addEventListener("click", function (e) {
                        e.preventDefault();
                        handleWriteComment();
                    });
                }

                getCommentList();
            }, handleWriteComment);
        }
    }

    getCommentList() {
        const handleReplyComment = (uid, url, reply_id, comment, btnReply) => {
            this.handleReplyComment(uid, url, reply_id, comment, btnReply);
        }

        const getTimeStamp = (time) => {
            return this.getTimeStamp(time);
        }

        const getCommentListTotal = (comments) => {
            this.getCommentListTotal(comments);
        }

        const url = window.location.pathname;
        $.ajax({
            type: "GET",
            url: '/api/data/account/get-comment.php',
            data: {
                url: url
            },
            success: function (data) {
                let renderHtml = '';

                const comments = data.data;

                getCommentListTotal(comments);

                comments.map((comment, index) => {
                    let renderHtmlReply = '';
                    const replyId = 'reply-' + index;

                    const newDisplay = getTimeStamp(comment.time);

                    //reply write box
                    const uid = sessionStorage.getItem('uid');
                    if (uid && uid != "undefined") {
                        renderHtmlReply += `<div class="write write-reply" id="${replyId}">
                            <div class="left">
                                <div class="avatar">
                                    <div class="image"><i class="fa fa-user"></i></div>
                                </div>
                            </div>
                            <div class="right">
                                <form>
                                    <input type="hidden" name="reply_id" value="${comment.id}">
                                    <textarea placeholder="Leave a comment" maxlength="500" class="input-write"></textarea>
                                    <button type="button" class="btn primary-button btn-write-reply">Write</button>
                                    <button type="button" class="btn secondary-button btn-write-cancel" onClick="$('#comment-section .comments-list .right .write-reply').hide();">Cancel</button>
                                </form>
                            </div>
                        </div>`;
                    } else {
                        renderHtmlReply += `<div class="write write-reply" id="${replyId}">
                            <div class="left">
                                <div class="avatar">
                                    <div class="image"><i class="fa fa-user"></i></div>
                                </div>
                            </div>
                            <div class="right">
                                <form>
                                    <textarea placeholder="Leave a comment" maxlength="16384"></textarea>
                                    <button type="button" class="btn primary-button" data-toggle="modal" data-target="#loginModalCenter">Sign In</button>
                                    <button type="button" class="btn secondary-button btn-write-cancel" onClick="$('#comment-section .comments-list .right .write-reply').hide();">Cancel</button>
                                    <p class="lbl">Please sign in to create comments.</p>
                                </form>
                            </div>
                        </div>`;
                    }

                    //reply comments
                    comment.replies.map(reply => {
                        const timeConveted = getTimeStamp(reply.time);
                        const blocked = [
                            'mangafast',
                            'manga fast',
                            'm a n g a f a s t',
                            'wuxianews',
                            'wuxia news',
                            'w u x i a n e w s',
                            'dailymanhwa',
                            'daily manhwa',
                            'd a i l y m a n h w a',
                            'isekainews',
                            'isekai news',
                            'i s e k a i n e w s',
                            'readthelegendarymoonlightsculptormanga',
                            'readthelegendarymoonlightsculptormanga.wordpress',
                            'talesofdemonsandgodsmanhua.wordpress',
                            'talesofdemonsandgodsmanhua',
                            'iamthesorcererkingmanhwa.wordpress',
                            'iamthesorcererkingmanhwa',
                            'readversatilemagemanga',
                            'readdrstoneonline',
                            'readapotheosis',
                            'readapotheosismanhua',
                            '.mystrikingly',
                            'tombraiderking',
                            '.wordpress',
                            ' .wordpress',
                            '. wordpress',
                            'w o r d p r e s s',
                        ];
                        const fullBlocked = [
                            'wordpress',
                            'mystrikingly',
                            'mangafast',
                            'wuxianews',
                            'dailymanhwa',
                            'isekainews',
                            'readthelegendarymoonlightsculptormanga',
                            'readthelegendarymoonlightsculptormanga',
                            'talesofdemonsandgodsmanhua',
                            'talesofdemonsandgodsmanhua',
                            'iamthesorcererkingmanhwa',
                            'iamthesorcererkingmanhwa',
                            'readversatilemagemanga',
                            'readdrstoneonline',
                            'checkiton',
                            'readiton'
                        ];

                        let comment = reply.comment;
                        for (var i = 0; i < blocked.length; i++) {
                            comment = comment.replace(blocked[i], '*mangariot*');
                        }

                        let full_comment = comment.split(' ').join('');
                        for (var i = 0; i < fullBlocked.length; i++) {
                            const split = full_comment.split(fullBlocked[i]);
                            if (split.length >= 2) {
                                comment = `<span style="
                                color: #cecece;
                                font-style: italic;
                            ">This comment is blocked due to agains the mangariot policy.</span>`;
                            }
                        }

                        renderHtmlReply += `<div class="write">
                            <div class="left">
                                <div class="avatar">
                                    <div class="image"><i class="fa fa-user"></i></div>
                                </div>
                            </div>
                            <div class="right">
                                <p class="message">${comment}</p>
                                <div class="action">
                                    <a class="name" href="/user-profile/${reply.user.username}">${reply.user.username}</a>
                                    <span class="divider">·</span>
                                    <span class="time">${timeConveted}</span>
                                </div>
                            </div>
                        </div>`;
                    });

                    const blocked = [
                        'mangafast',
                        'manga fast',
                        'm a n g a f a s t',
                        'wuxianews',
                        'wuxia news',
                        'w u x i a n e w s',
                        'dailymanhwa',
                        'daily manhwa',
                        'd a i l y m a n h w a',
                        'isekainews',
                        'isekai news',
                        'i s e k a i n e w s',
                        'readthelegendarymoonlightsculptormanga',
                        'readthelegendarymoonlightsculptormanga.wordpress',
                        'talesofdemonsandgodsmanhua.wordpress',
                        'talesofdemonsandgodsmanhua',
                        'iamthesorcererkingmanhwa.wordpress',
                        'iamthesorcererkingmanhwa',
                        'readversatilemagemanga',
                        'readdrstoneonline',
                        'readapotheosis',
                        'readapotheosismanhua',
                        'tombraiderking',
                        '.mystrikingly',
                        '.wordpress',
                        ' .wordpress',
                        '. wordpress',
                        'w o r d p r e s s',
                    ];
                    const fullBlocked = [
                        'wordpress',
                        'mystrikingly',
                        'mangafast',
                        'wuxianews',
                        'dailymanhwa',
                        'isekainews',
                        'readthelegendarymoonlightsculptormanga',
                        'readthelegendarymoonlightsculptormanga',
                        'talesofdemonsandgodsmanhua',
                        'talesofdemonsandgodsmanhua',
                        'iamthesorcererkingmanhwa',
                        'iamthesorcererkingmanhwa',
                        'readversatilemagemanga',
                        'readdrstoneonline',
                        'checkiton',
                        'readiton'
                    ];

                    let reply = comment.comment;
                    for (var i = 0; i < blocked.length; i++) {
                        reply = reply.replace(blocked[i], '*mangariot*');
                    }

                    let full_comment = reply.split(' ').join('');
                    for (var i = 0; i < fullBlocked.length; i++) {
                        const split = full_comment.split(fullBlocked[i]);
                        if (split.length >= 2) {
                            reply = `<span style="
                            color: #cecece;
                            font-style: italic;
                        ">This comment is blocked due to agains the mangariot policy.</span>`;
                        }
                    }


                    renderHtml += `<div class="write">
                    <div class="left">
                        <div class="avatar">
                            <div class="image"><i class="fa fa-user"></i></div>
                        </div>
                    </div>
                    <div class="right">
                        <p class="message">${reply}</p>
                        <div class="action">
                            <a class="name" href="/user-profile/${comment.user.username}">${comment.user.username}</a>
                            <span class="divider">·</span>
                            <span class="time">${newDisplay}</span>
                            <span class="divider">·</span>
                            <a class="reply" href="#" data-id="${replyId}"><i class="fa fa-reply"></i> Reply</a>
                        </div>

                        <div class="replies" data-id="replies-1">
                            ${renderHtmlReply}
                        </div>
                    </div>
                </div>`;

                });


                $('#comment-section .comments .comments-list').html(renderHtml).promise().done(function () {


                    const linkReplies = document.querySelectorAll('#comment-section .write .right a.reply');
                    for (let linkReply of linkReplies) {
                        linkReply.addEventListener("click", function (e) {
                            e.preventDefault();
                            const replyId = linkReply.getAttribute("data-id");
                            $('#comment-section .comments-list .right .write-reply').hide();
                            $('#' + replyId).fadeIn();
                        });
                    }

                    const btnReplies = document.querySelectorAll('#comment-section .btn-write-reply');
                    for (let btnReply of btnReplies) {
                        btnReply.addEventListener("click", function (e) {
                            e.preventDefault();
                            const textArea = btnReply.previousSibling.previousSibling;
                            const replyId = textArea.previousSibling.previousSibling;

                            const url = window.location.pathname;
                            const uid = sessionStorage.getItem('uid');
                            const reply_id = replyId.value;

                            btnReply.disabled = true;

                            handleReplyComment(uid, url, reply_id, textArea, btnReply);
                        }, handleReplyComment);
                    }

                });
            },
            error: function (data) {
                console.log(data);
            }
        }, handleReplyComment, getTimeStamp, getCommentListTotal);
    }

    getCommentListTotal(comments) {
        let total = comments.length;
        comments.map(comment => {
            total = Number(total) + Number(comment.replies.length);
        });



        $('#comment-section h2').html(`Comments (${total})`);
    }

    handleReplyComment(uid, url, reply_id, comment, btnReply) {
        const getCommentList = () => {
            this.getCommentList();
        }

        $.ajax({
            type: "POST",
            url: '/api/data/account/post-comment.php',
            data: {
                uid: uid,
                url: url,
                reply_id: reply_id,
                comment: comment.value,
                time: new Date().getTime(),
            },
            success: function (data) {
                getCommentList();
                comment.value = '';
                btnReply.disabled = false;
            },
            error: function (data) {
                console.log(data);
                btnReply.disabled = false;
            }
        }, getCommentList);
    }

    handleWriteComment() {
        const btnWrite = document.querySelector('#comment-section .comments .btn-write');
        const comment = document.querySelector('#comment-section .comments .input-write');
        const url = window.location.pathname;
        const uid = sessionStorage.getItem('uid');

        if (comment != null) {
            if (comment.value) {
                btnWrite.disabled = true;

                const getCommentList = () => {
                    this.getCommentList();
                }

                $.ajax({
                    type: "POST",
                    url: '/api/data/account/post-comment.php',
                    data: {
                        uid: uid,
                        url: url,
                        reply_id: '',
                        comment: comment.value,
                        time: new Date().getTime(),
                    },
                    success: function (data) {
                        getCommentList();
                        comment.value = '';
                        btnWrite.disabled = false;
                    },
                    error: function (data) {
                        console.log(data);
                        btnWrite.disabled = false;
                    }
                }, getCommentList)
            }
        }
    }

    getTimeStamp(time) {
        const newToday = new Date().getTime();
        const newLast = Number(time);
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

        return newDisplay;
    }

    getBookmarksList() {
        if (document.querySelector('#bookmarks-con') != null) {

            const renderBookmarksList = (bookmarks) => {
                this.renderBookmarksList(bookmarks);
            }

            const uid = sessionStorage.getItem('uid');
            $.ajax({
                type: "GET",
                url: '/api/data/account/get-bookmarked-list.php',
                data: {
                    uid: uid,
                },
                success: function (data) {
                    renderBookmarksList(data.data);
                },
                error: function (data) {
                    console.log(data);
                }
            }, renderBookmarksList);
        }


    }

    renderBookmarksList(bookmarks) {
        let renderHtml = '';

        const getMonth = (month) => {
            return this.getMonth(month);
        }

        if (bookmarks.length < 1) {
            renderHtml += '<p>Your bookmark is empty.</p>';
        }

        bookmarks.map((bookmark, index) => {

            const today = new Date(Number(bookmark.time));
            const month = getMonth(today.getMonth());
            const day = today.getDate();
            const category = bookmark.categories.join(', ');

            renderHtml += `<div class="item" id="item-${index}">
                <div class="left">
                    <div class="day">${day}</div>
                    <div class="month">${month}</div>
                </div>
                <div class="right">
                    <a class="bname">${bookmark.manga.name}</a>
                    <p class="bcategory">(${bookmark.manga.status})</p>
                    <p class="bcategory">${category}</p>
                    <a class="bread" href="${bookmark.url}">View</a>
                    <a class="bremove" href="${bookmark.url}" data-id="item-${index}">Remove</a>
                </div>
            </div>`;
        }, getMonth);


        $('#bookmarks-con').html(renderHtml).promise().done(function () {
            const removes = document.querySelectorAll('.bookmarks-con .item .right .bremove');
            for (let remove of removes) {
                remove.addEventListener("click", function (event) {
                    event.preventDefault();
                    const item_id = remove.getAttribute("data-id");
                    const url = remove.getAttribute("href");
                    const uid = sessionStorage.getItem('uid');

                    $.ajax({
                        type: "GET",
                        url: '/api/data/account/post-bookmarked-add.php',
                        data: {
                            uid: uid,
                            url: url,
                            add: false,
                            time: new Date().getTime(),
                        },
                        success: function (data) {
                            $('#' + item_id).hide();
                            console.log(data);
                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });

                });
            }

        });
    }

    getMonth(month) {
        switch (month) {
            case 0:
                return 'Jan';
            case 1:
                return 'Feb';
            case 2:
                return 'Mar';
            case 3:
                return 'Apr';
            case 4:
                return 'May';
            case 5:
                return 'Jun';
            case 6:
                return 'Jul';
            case 7:
                return 'Aug';
            case 8:
                return 'Sep';
            case 9:
                return 'Oct';
            case 10:
                return 'Nov';
            case 11:
                return 'Dec';
            default:
                return '';
        }
    }
}