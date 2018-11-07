
$(document).ready(function() {
	
	//MENU =================================================================//
	$(".headerMenu li .headerMenuDisk").animate({
		zoom: "1",
		marginLeft: 0,
		marginTop: 0
	}, 200);
	
	
	$(".headerMenu li").hover(function() {
		//hover
		$(this).find("p").show().animate({
			marginTop: "-70"
		}, 100).animate({
			marginTop: "-60"
		}, 100)
	}, function() {
		//out hover
		$(this).find("p").fadeOut(100).animate({
			marginTop: "0"
		}, 100);
	});
	
	
	var navScrolled = false;
	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		//NAVIGATION
		if (100 < scroll && !navScrolled) {
			$(".headerNavScroll").animate({
				marginTop: "0"
			}, 300);
			
			$(".headerNavScroll ul").animate({
				marginTop: "0"
			}, 500);
			navScrolled = true;
		}
		
		if (91 > scroll && navScrolled) {
			$(".headerNavScroll").animate({
				marginTop: "-50"
			}, 300);
			
			$(".headerNavScroll ul").animate({
				marginTop: "-50"
			}, 500);
			
			$(".headerNavScrollLogo").animate({
				marginTop: "-30"
			}, 500);
			navScrolled = false;
		}
	});
	
	
	//ADVERT MENU ==========================================================//
	var	advertScrolled = false;
	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		
		if (2700 < scroll && !advertScrolled) {
			$(".advertArea ul li .content").animate({
				marginTop: "20"
			}, 600);
			
			advertScrolled = true;
		}

		if (2600 > scroll && advertScrolled) {
			$(".advertArea ul li .content").animate({
				marginTop: "150"
			}, 600);
			
			advertScrolled = false;
		}
	});
	
	//MENU MOBILE===========================================================//
	$(".headerNavScrollMobileBtn img").click(function(){
		$(".headerNavScrollMobileContent").slideToggle("slow");
	});
	
	//WINDOW RESIZE & LOGO SCROLLED=========================================================//
	get_window_size();
	
	$(window).resize(function() {
		get_window_size();
	})
	
	var logoScrolled = false;
	$(window).scroll(function(event) {
		get_window_size();
	})
	
	function get_window_size(){
		var width = $(window).width();
		var height = $(window).height();

		if(width < 1170){
			mobile_mode();
		}
		else {
			window_mode();
			
		}
	}
	
	//MOBILE
	function mobile_mode(){
		logo_reset_position();
		$(".headerNav").hide();
		$(".headerNavScroll").hide();
		$(".headerNavScrollMobile").show().css("z-index", "99999");

		var temp = $(".headerForm").width();
		if(temp <= 419){
			$(".headerContent form").css({
				"width":"200px",
			});
		}
		else {
			$(".headerContent form").css({
				"width":"auto",
			});
		}
	}
	
	//WINDOW
	function window_mode(){
		//navigation
		$(".headerNav").show();
		$(".headerNavScroll").show();
		$(".headerNavScrollMobile").hide();
		
		//logo scrolled
		var scroll = $(window).scrollTop();
		if (95 < scroll && !logoScrolled) {
			$(".headerLogoContainer").css("position", "fixed");
			$(".headerLogoContainer").css("margin-left", "209px");
			$(".headerLogoContainer").css("top", "40px");
			
			$(".headerNavScrollLogo").stop().delay(200).animate({
				"margin-top" : "0px"
			});

			$(".headerLogoContainer").stop().animate({
				"top": "0px",
				"zoom": "0.8",
				"marginLeft" : "288"
			},500, function(){
				$(".headerLogoContainer p").fadeOut("fast");
			});
			logoScrolled = true;
		}

		if (94 > scroll && logoScrolled) {
			logo_reset_position();
			logoScrolled = false;
		}
	}
	
	
	function logo_reset_position(){
		$(".headerLogoContainer p").fadeIn("fast");
		$(".headerLogoContainer").stop();
		$(".headerLogoContainer").css("position", "relative");
		$(".headerLogoContainer").css("margin-left", "auto");
		$(".headerLogoContainer").css("top", "0px");
		$(".headerLogoContainer").css("zoom", "1");
		$(".headerLogoContainer").stop().fadeIn("fast", function(){
			$(this).css("z-index", "9999");
		});
	}
	
	
	
	
	//SMOOTH SCROLL ========================================================//
	jQuery.scrollSpeed(120, 1000);
});