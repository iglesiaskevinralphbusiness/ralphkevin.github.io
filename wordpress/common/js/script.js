$(function () {
	//add sidebar
	$("body").prepend("<div class='sidebar'><ul class='side-items'></ul><a class='btn-sidebar' href=''>&gt;</a></div>");
	$(".content").append(
		"<div class='footer'><p>2019 &copy;&nbsp; <a href='http://iglesiaskevinralphbusiness.github.io' target='blank'>ralph kevin</a></p></div>"
	);

	//set headings to sidebar
	var h2_id = 0;
	var h3_id = 0;
	var side_items = "";
	$("h2").each(function () {
		h2_id++;
		$(this).attr("id", "h2-" + h2_id);

		var h2_value = $(this).html();
		side_items +=
			"<li class='primary'><a href='#h2-" +
			h2_id +
			"'>" +
			h2_value +
			"</a></li>";

		$(this)
			.next("div")
			.find("h3")
			.each(function () {
				h3_id++;
				$(this).attr("id", "h3-" + h3_id);

				var h3_value = $(this).html();
				side_items +=
					"<li class='secondary'><a href='#h3-" +
					h3_id +
					"'>" +
					h3_value +
					"</a></li>";
			});
	});
	$(".side-items").prepend(side_items);

	// page scroll select active from sidebar items
	$(window).scroll(function () {
		var scroll_value = $(this).scrollTop();

		var flag = 0;
		var h2_id = 0;
		var h3_id = 0;
		$("h2").each(function () {
			h2_id++;

			var from = $(this).offset().top - 50;
			if (scroll_value >= from) {
				var link_with = "#h2-" + h2_id;
				$(".sidebar ul.side-items li.primary").removeClass("active");
				$(".sidebar ul.side-items li.secondary").removeClass("active");
				$('a[href*="' + link_with + '"]')
					.parent("li")
					.addClass("active");
			}

			$(this)
				.next("div")
				.find("h3")
				.each(function () {
					h3_id++;
					var from = $(this).offset().top - 50;
					if (scroll_value >= from) {
						var link_with = "#h3-" + h3_id;
						$(".sidebar ul.side-items li.secondary").removeClass("active");
						$('a[href*="' + link_with + '"]')
							.parent("li")
							.addClass("active");
					}
				});
		});
		
		//move sidebar to page scroll
		$(".sidebar ul.side-items").css("margin-top", scroll_value + "px");
	});
	
	
	//sidebar show hide
	$(".sidebar .btn-sidebar").click(function(e){
		e.preventDefault();
		
		var $parent = $(".sidebar");
		var $content = $(".content");
		
		if($parent.hasClass("show")){
			$parent.removeClass("show");
			$content.removeClass("show");
		}
		else {
			$parent.addClass("show");
			$content.addClass("show");
		}
	});
	
	$(".sidebar .side-items a").click(function(){
		$(".sidebar").removeClass("show");
		$(".content").removeClass("show");
	});
	
});
$(document).on("click", 'a[href^="#"]', function (event) {
	event.preventDefault();

	$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top
		},
		300
	);
});