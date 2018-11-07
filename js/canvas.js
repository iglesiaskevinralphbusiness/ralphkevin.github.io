$(document).ready(function() {
	var c=document.getElementById("canvas-1");
	var ctx=c.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.beginPath();
	
	//1
	ctx.moveTo(0,326);
	ctx.lineTo(302,638);
	//2
	ctx.moveTo(600,0);
	ctx.lineTo(1220,638);
	//3
	ctx.moveTo(740,0);
	ctx.lineTo(1356,638);
	//4
	ctx.moveTo(993,0);
	ctx.lineTo(1407,433);
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#575759";
	ctx.stroke();
	

	var c=document.getElementById("canvas-2");
	var ctx=c.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.beginPath();
	
	//4
	ctx.moveTo(141,281);
	ctx.lineTo(360,509);
	//5
	ctx.moveTo(446,383);
	ctx.lineTo(611,556);
	
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = "#fff";
	ctx.stroke();
	
});
