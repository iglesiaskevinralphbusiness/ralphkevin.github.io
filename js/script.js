
$(document).ready(function() {

//detect if IE
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
{
	$("section").css("display","none");
	$(".layer-sp").css("display","block");
}

	//responsive
	window.onresize = function(event) {
		set_layers_responsive();
	};
	set_layers_responsive();
	function set_layers_responsive(){
		var win_w = window.innerWidth;
		var win_h = window.innerHeight;
		var total_section = $("body section").length;
		var main_w = win_w * total_section;

		$("body section").width(win_w).height(win_h);
		$("body main").width(main_w);
	}

	//preloader fadeOut
	$(window).load(function(){
		setTimeout(function(){
				$(window).scrollLeft(0);
			$('#preloader').fadeOut(2000);
		}, 0); //1000
		setTimeout(function(){
			layer1_action();
			rainbox_action();
			$(".bg-lines").fadeIn(3000);
			$(".logo .scroll").fadeIn(3000);
		}, 1500); //2500
	});

   //layer 1 animation
   function layer1_action(){
		var triangle_pos = Create2DArray(100);
		//0
		triangle_pos[1][0] = "tri-001";
		triangle_pos[1][1] = "22";
		triangle_pos[1][2] = "68";
		//1
		triangle_pos[2][0] = "tri-002";
		triangle_pos[2][1] = "30.3";
		triangle_pos[2][2] = "74";
		//3
		triangle_pos[3][0] = "tri-003";
		triangle_pos[3][1] = "42.3";
		triangle_pos[3][2] = "60";
		//4
		triangle_pos[4][0] = "tri-004";
		triangle_pos[4][1] = "46";
		triangle_pos[4][2] = "79";
		//5
		triangle_pos[5][0] = "tri-005";
		triangle_pos[5][1] = "51";
		triangle_pos[5][2] = "70";
		//6
		triangle_pos[6][0] = "tri-006";
		triangle_pos[6][1] = "61.2";
		triangle_pos[6][2] = "77";
		//7
		triangle_pos[7][0] = "tri-007";
		triangle_pos[7][1] = "84.2";
		triangle_pos[7][2] = "57";
		//8
		triangle_pos[8][0] = "tri-008";
		triangle_pos[8][1] = "62.3";
		triangle_pos[8][2] = "55.6";
		//9
		triangle_pos[9][0] = "tri-009";
		triangle_pos[9][1] = "76.3";
		triangle_pos[9][2] = "53.4";
		//10
		triangle_pos[10][0] = "tri-010";
		triangle_pos[10][1] = "24.3";
		triangle_pos[10][2] = "34.4";
		//11
		triangle_pos[11][0] = "tri-011";
		triangle_pos[11][1] = "21.5";
		triangle_pos[11][2] = "36.4";
		//12
		triangle_pos[12][0] = "tri-012";
		triangle_pos[12][1] = "29";
		triangle_pos[12][2] = "20";
		//13
		triangle_pos[13][0] = "tri-013";
		triangle_pos[13][1] = "13.5";
		triangle_pos[13][2] = "26.4";
		//14
		triangle_pos[14][0] = "tri-014";
		triangle_pos[14][1] = "33.5";
		triangle_pos[14][2] = "23.4";
		//15
		triangle_pos[15][0] = "tri-015";
		triangle_pos[15][1] = "43.5";
		triangle_pos[15][2] = "22.4";
		//16
		triangle_pos[16][0] = "tri-016";
		triangle_pos[16][1] = "71.5";
		triangle_pos[16][2] = "23.4";
		//17
		triangle_pos[17][0] = "tri-017";
		triangle_pos[17][1] = "9.5";
		triangle_pos[17][2] = "7.4";
		//18
		triangle_pos[18][0] = "tri-018";
		triangle_pos[18][1] = "84.5";
		triangle_pos[18][2] = "14.4";
		//19
		triangle_pos[19][0] = "tri-019";
		triangle_pos[19][1] = "47.5";
		triangle_pos[19][2] = "2.4";
		//20
		triangle_pos[20][0] = "tri-020";
		triangle_pos[20][1] = "10.5";
		triangle_pos[20][2] = "81.4";
		//21
		triangle_pos[21][0] = "tri-021";
		triangle_pos[21][1] = "35.5";
		triangle_pos[21][2] = "96.4";
		//22
		triangle_pos[22][0] = "tri-022";
		triangle_pos[22][1] = "65.5";
		triangle_pos[22][2] = "90.4";
		//23
		triangle_pos[23][0] = "tri-023";
		triangle_pos[23][1] = "90.5";
		triangle_pos[23][2] = "81.4";

		var i = 0;
		var tri_class, top_add, left_add = "";
		$('.layer-1 .bg-triangle p').each(function(obj) {
			i++;
			if(triangle_pos[i][0] != null){
				tri_class = ".layer-1 .bg-triangle ." + triangle_pos[i][0];

				top_add = Number(triangle_pos[i][1]);
				left_add = Number(triangle_pos[i][2])

				if(Number(triangle_pos[i][1]) <= 45 ){
					top_add = Number(triangle_pos[i][1]) - 8;
				}
				else if(Number(triangle_pos[i][1]) >= 55 ){
					top_add = Number(triangle_pos[i][1]) + 8;
				}
				if(Number(triangle_pos[i][2]) <= 45 ){
					left_add = Number(triangle_pos[i][2]) - 8;
				}
				else if(Number(triangle_pos[i][2]) >= 55 ){
					left_add = Number(triangle_pos[i][2]) + 8;
				}

				$(tri_class).animate({
					top: top_add + "%",
					left: left_add + "%"
				},500).animate({
					top: triangle_pos[i][1] + "%",
					left: triangle_pos[i][2] + "%"
				},300);
			}
		});

		$(".layer-1 .bg-triangle .tri-001").animate({
			top: '22%',
			left: '68%'
		},1000);
	}
	function Create2DArray(rows) {
		var arr = [];
		for (var i=0;i<rows;i++) {
			arr[i] = [];
		}
	  return arr;
	}

	function rainbox_action(){
		$(".grid-wrap .rain-001").animate({
			marginTop: "0%",
			left: "49%"
		},1000);
		$(".grid-wrap .rain-002").animate({
			marginTop: "0%",
			left: "0%"
		},1000);
		$(".grid-wrap .rain-003").animate({
			marginTop: "0%",
			left: "0"
		},400);

		$(".layer-1 .bg-rect .bg-rect-001").animate({
			top: "5%"
		},300).animate({
			top: "0%"
		},200);
		$(".layer-1 .bg-rect .bg-rect-002").animate({
			top: "5%"
		},400).animate({
			top: "0%"
		},300);
		$(".layer-1 .bg-rect .bg-rect-003").animate({
			bottom: "5%"
		},300).animate({
			bottom: "0%"
		},200);
		$(".layer-1 .bg-rect .bg-rect-004").animate({
			bottom: "5%"
		},400).animate({
			bottom: "0%"
		},300);
	}









	//layer 2 scroll animation
	var me_flag = 0;
	$layer2_canvases = $(".layer-2 .text-01, .layer-2 .text-02, .layer-2 .text-03");
	$layer4_canvases = $(".layer-4 .project, .layer-4 .title-text-01, .layer-4 .title-text-02, .layer-4 .title-text-03");
	$layer3_canvases = $(".layer-3 .text-01, .layer-3 .text-02, .layer-3 .block-01, .layer-3 .block-02, .layer-3 .block-03");


	var win_w = window.innerWidth;
	var scroll_pos = $(this).scrollLeft() + Number(win_w);
	animate_on_scroll();

	$(window).scroll(function(){
		animate_on_scroll();
		footer_on_scroll();
	});

	function animate_on_scroll(){
		var win_w = window.innerWidth;
		var scroll_pos = $(this).scrollLeft() + Number(win_w);

		//my picture
		var item_width = devided_by_two($(".layer-2 .img-block p").width());
		var item_offset = $(".layer-2 .img-block p").offset().left + Number(item_width);
		if((scroll_pos >= item_offset) && (me_flag == 0)){
			me_flag = 1;
			$(".layer-2 .img-block").addClass("open");
		}

		//layer 2
		$layer2_canvases.each(function(){
			var $this = $(this);
			var item_offset = $this.offset().left;

			if((scroll_pos >= item_offset) && (!$this.hasClass("move"))){
				$this.addClass("move");
			}
		});

		//layer 4
		$layer4_canvases.each(function(){
			var $this = $(this);
			var temp = devided_by_two($this.width());
			temp = devided_by_two(temp);
			var item_offset = $this.offset().left + Number(temp);

			if((scroll_pos >= item_offset) && (!$this.hasClass("move"))){
				$this.addClass("move");
			}
		});

		//layer 3
		$layer3_canvases.each(function(){
			var $this = $(this);
			var item_offset = $this.offset().left;

			if((scroll_pos >= item_offset) && (!$this.hasClass("move"))){
				$this.addClass("move");
			}
		});
	}

	function devided_by_two(value){
		var devide = Number(value) / Number(2);
		return devide;
	}

	function footer_on_scroll(){
		var scroll_left = $(window).scrollLeft();

		if(scroll_left >= 397){
			$("footer .contact li a").css("color","black");
			$("footer .contact").addClass("move");
		}
		else {
			$("footer .contact li a").css("color","#fff");
			$("footer .contact").removeClass("move");
		}
	}


});
