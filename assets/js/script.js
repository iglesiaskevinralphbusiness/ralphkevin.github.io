
$(document).ready(function () {

    function init() {
        set_font_size($('body').width());
        set_loader_animation(0);
        set_menu();
        set_project_1_mouse();
        set_project_3(1000);
        set_layer_timeline();
    }


    //FUNCTIONS
    function set_font_size(width) {
        var size = 12;

        if (width > 1570) {
            size = 12;
        } else if (width <= 1570 && width > 1349 ){
            size = 11;
        } else if (width <= 1349 && width > 640) {
            size = 9;
        } else {
            size = 7;
        }

        $('body').css('font-size', size + 'px');
    }

    function set_loader_animation(index){
        var list = ["DEVELOPMENT","GAMES","CODENATIVE","FRAMEWORK","DESIGN"];
        var loader = $('.loader');
        if(index > list.length - 1){
            index = 0;
        }

        $('header .loader .layer-1 .name span').removeAttr('style').html(list[index]).animate({
            marginTop: 0,
            opacity: 1
        }, 100);
        setTimeout(function(){
            if(loader.hasClass('active')){
                set_loader_animation(index + 1);
            }
        }, 450);
    }

    function set_menu(){
        $("a.link-scroll").click(function(e) {
            e.preventDefault();
            var element_class = ($(this).attr("href")).replace('#','.');
            $([document.documentElement, document.body]).animate({
                scrollTop: $(element_class).offset().top
            }, 1500);

            var menu = $('.menu-item-block');
            menu.removeClass('active');
            menu.fadeOut('slow');
        });

        $("a.menu").click(function(e){
            e.preventDefault();
            var menu = $('.menu-item-block');
            if(menu.hasClass('active')){
                menu.removeClass('active');
                menu.fadeOut('slow');
            } else {
                menu.addClass('active');
                menu.fadeIn('slow');
            }
        });
    }

    function set_project_1_mouse() {
        const strength1 = -20;


        $("html").mousemove(function (e) {
            const pageX = e.pageX - ($(window).width() / 2);
            const pageY = e.pageY - ($(window).height() / 2);

            let posX = strength1 / $(window).width() * pageX * -1;
            let posY = strength1 / $(window).height() * pageY * -1;

            posX = posX + (strength1 + (strength1 * -1));
            posY = posY + (strength1 - (strength1 * -1));

            $('.layer-3 .project-1 .border').css("background-position", posX + "px " + posY + "px");
        });
    }

    function set_project_3(left) {
        $('.project-1-porcelain-custom_1').css('left', left);
        $('.project-1-porcelain-custom_2').css('right', left);
        setTimeout(function () {
            if (left == 35) {
                set_project_3(1000);
            } else {
                set_project_3(35);
            }
        }, 10000);
    }

    function set_project_4(scroll){
        //$('.project-4-img').trigger('mouseenter');
        var layer4_offset = $(".project-4-img").offset().top;
        var layer4_offset_half = $(".project-4-img").height() / 2;
        var layer4 = layer4_offset - layer4_offset_half;

        if(scroll >= layer4){
            $('.project-4 .bg-liner .liner1, .project-4 .bg-liner .liner2, .project-4 .bg-liner .liner3, .project-4 .bg-liner .liner4').addClass('move');
        }
    }

    function set_layer_about(scroll){
        //img1
        var layer_1_offset = $(".img-cover-block1").offset().top;
        var layer_1_height = $(".img-cover-block1").height();
        var layer_1_top = layer_1_offset - layer_1_height;
        if(scroll >= layer_1_top){
            $(".layer-about .info .img-cover-block1 .blocker1").addClass("opened");
            $(".layer-about .info .img-cover-block1 .blocker2").addClass("opened");
        }

        var layer_2_offset = $(".img-cover-block2").offset().top;
        var layer_2_height = $(".img-cover-block2").height();
        var layer_2_top = layer_2_offset - layer_2_height;
        if(scroll >= layer_2_top){
            $(".layer-about .info .img-cover-block2 .blocker1").addClass("opened");
            $(".layer-about .info .img-cover-block2 .blocker2").addClass("opened");
        }

    }

    function set_layer_end(scroll){
        var layer_end_offset = $(".layer-end").offset().top;
        var layer_end_height = $(".layer-end").height();
        var layer_end_top = layer_end_offset - layer_end_height;

        var leftright  = scroll - layer_end_top;
        leftright = leftright < 0 ? 0 : leftright * -1;
        leftright = leftright + layer_end_height;
        leftright = leftright < 0 ? 0 : leftright;

        $(".layer-end .door1").css({
            left: '-' + (leftright / 4 ) + 'px'
        });
        $(".layer-end .door2").css({
            right: '-' + (leftright / 4 ) + 'px'
        });
    }

    function set_layer_timeline(){
        $('.timeline .timeline-item li img').click(function(){
            var li = $(this).parent();
            if(!li.hasClass('active')){
                //ITEM
                var index = li.index();
                var width = li.width();
                var left = width * index > 0 ? '-' + width * index : width * index;
                $('.timeline .timeline-item ul').css('margin-left', left + 'px');
                $('.timeline .timeline-item ul li').removeClass('active');
                li.addClass('active');

                //YEARS
                var years_index = index + 1;
                var years_li = $('.timeline .timeline-years ul li:nth-child(' + years_index + ')');
                var width_li = Number(years_li.width()) + Number((years_li.css('margin-left')).replace('px',''));
                var left_li = width_li * index > 0 ? '-' + width_li * index : width_li * index;
                $('.timeline .timeline-years ul').css('margin-left', left_li + 'px');
                $('.timeline .timeline-years ul li').removeClass('active');
                years_li.addClass('active');
            }
        });
    }


    //WINDOWS
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();

        //layer lines
        var layer2_offset = $(".layer-2").offset().top;
        var layer2_limit = layer2_offset - 500;

        if (scroll <= layer2_offset) {
            $(".layer-lines").css({
                position: 'fixed',
                top: 0,
            });

            $(".layer-lines .door1").css({
                left: '-' + (scroll / 4) + 'px'
            });
            $(".layer-lines .door2").css({
                right: '-' + (scroll / 4) + 'px'
            });

            if (scroll >= layer2_limit) {
                var value = ((scroll - layer2_limit) / 500);
                var opacity = (value - 1) * -1;

                $(".layer-lines .door").css({
                    opacity: opacity
                });

                $(".avatar").css({
                    opacity: value
                });

                if (value >= 0.4) {
                    $(".avatar").css({
                        "-ms-transform": `scale(${value},${value})`,
                        "transform": `scale(${value},${value})`
                    });
                }
            } else {
                $(".layer-lines .door").css({
                    opacity: 1
                });
                $(".avatar").css({
                    opacity: 0,
                    "-ms-transform": `scale(0.4, 0.4)`,
                    "transform": `scale(0.4, 0.4)`
                });
            }
        } else {
            $(".layer-lines").css({
                position: 'absolute',
                top: layer2_offset + 'px',
            });
        }

        set_project_4(scroll);
        set_layer_about(scroll);
        set_layer_end(scroll);
    });

    $(window).resize(function (event) {
        var width = $(this).width();
        set_font_size(width);
    });

    $(window).load(function(){
        window.scrollTo(0, 0);
        $('.layer-lines .door .door1').css('left','-230px');
        $('.layer-lines .door .door2').css('right','-230px');

        //loader
		setTimeout(function(){
            $('.loader').fadeOut('slow').removeClass('active');
            $("html, body").css("overflow-y","auto");
            window.scrollTo(0, 0);

            $('.layer-lines .door .door1').css('left','0px');
            $('.layer-lines .door .door2').css('right','0px');
		}, 1000);
	});


    init();

});