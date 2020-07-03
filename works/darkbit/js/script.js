
$(document).ready(function () {

    function init() {
        set_font_size($('body').width());
        set_project_1_mouse();
        set_project_3(1000);
    }


    //FUNCTIONS
    function set_font_size(width) {
        var size = 12;

        if (width > 1349) {
            size = 12;
        } else if (width <= 1349) {
            size = 9;
        }

        $('body').css('font-size', size + 'px');
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

            $(".door1").css({
                left: '-' + (scroll / 4) + 'px'
            });
            $(".door2").css({
                right: '-' + (scroll / 4) + 'px'
            });

            if (scroll >= layer2_limit) {
                var value = ((scroll - layer2_limit) / 500);
                var opacity = (value - 1) * -1;

                $(".door").css({
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
                $(".door").css({
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

        //layer 3
        //project 2

    });

    $(window).resize(function (event) {
        var width = $(this).width();
        set_font_size(width);
    });




    init()

});