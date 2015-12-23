var RADIUS = 4;// 小球半径
var MARGIN_LEFT_1 = 90;// 左边距
var MARGIN_LEFT_2 = 124;// 左边距
var MARGIN_TOP = 25;// 上边距
var beginTime = new Date(2015,7,20,0,0,0);// 时间
var curShowTimeSeconds = 0;// 当前是秒数

var balls = [];
var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444"];// 小球颜色池
var days_x = [MARGIN_LEFT_1 + 120 + 15*(RADIUS+1), MARGIN_LEFT_1 + 120 + 30*(RADIUS+1), MARGIN_LEFT_1 + 120 + 45*(RADIUS+1)];

var hours_x = [MARGIN_LEFT_2, MARGIN_LEFT_2 + 15*(RADIUS+1)];
var minutes_x = [MARGIN_LEFT_2 + 39*(RADIUS+1), MARGIN_LEFT_2 + 54*(RADIUS+1)];
var seconds_x = [MARGIN_LEFT_2 + 78*(RADIUS+1), MARGIN_LEFT_2 + 93*(RADIUS+1)];

var days_y = [MARGIN_TOP, MARGIN_TOP, MARGIN_TOP];
var hours_y = [MARGIN_TOP + 27*(RADIUS+1), MARGIN_TOP + 27*(RADIUS+1)];
var minutes_y = [MARGIN_TOP + 27*(RADIUS+1), MARGIN_TOP + 27*(RADIUS+1)];
var seconds_y = [MARGIN_TOP + 27*(RADIUS+1), MARGIN_TOP + 27*(RADIUS+1)];

var offset1 = 10 + 10*(RADIUS+1);
var offset2 = 20*(RADIUS+1);
var days_text_x = days_x[2] + offset1;
var days_text_y = days_y[2] + offset2;
var hours_text_x = hours_x[1] + offset1;
var hours_text_y = hours_y[1] + offset2;
var minutes_text_x = minutes_x[1] + offset1;
var minutes_text_y = minutes_y[1] + offset2;
var seconds_text_x = seconds_x[1] + offset1;
var seconds_text_y = seconds_y[1] + offset2;

var lastDays = 0, lastHours = 0, lastMinutes = 0, lastSeconds = 0;
var days = 0, hours = 0, minutes = 0, seconds = 0;

window.onload=function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");// 获取canvas画布
	curShowTimeSeconds = getCurShowTImeSeconds();// 获取当前的秒数
	setInterval(function(){
		render(context);
		update();
	},50);
}

function update(){
	var nextShowTimeSeconds = getCurShowTImeSeconds();


	getDateDetails(nextShowTimeSeconds);

	if(nextShowTimeSeconds != curShowTimeSeconds) {


		if(parseInt(lastDays/100)!=parseInt(days/100)){
			addBalls(days_x[0],days_y[0],parseInt(days/100));
		}
		if(parseInt(lastDays%100/10)!=parseInt(days%100/10)){
			addBalls(days_x[1],days_y[1],parseInt(days%100/10));
		}
		if(parseInt(lastDays%10)!=parseInt(days%10)){
			addBalls(days_x[2],days_y[2],parseInt(days%10));
		}

		if(parseInt(lastHours/10)!=parseInt(hours/10)){
			addBalls(hours_x[0],hours_y[0],parseInt(hours/10));
		}
		if(parseInt(lastHours%10)!=parseInt(hours%10)){
			addBalls(hours_x[1],hours_y[1],parseInt(hours%10));
		}
		if(parseInt(lastMinutes/10)!=parseInt(minutes/10)){
			addBalls(minutes_x[0],minutes_y[0],parseInt(minutes/10));
		}
		if(parseInt(lastMinutes%10)!=parseInt(minutes%10)){
			addBalls(minutes_x[1],minutes_y[1],parseInt(minutes%10));
		}
		if(parseInt(lastSeconds/10)!=parseInt(seconds/10)){
			addBalls(seconds_x[0],seconds_y[0],parseInt(seconds/10));
		}
		if(parseInt(lastSeconds%10)!=parseInt(seconds%10)){
			addBalls(seconds_x[1],seconds_y[1],parseInt(seconds%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
		console.info("lengh of balls : " + balls.length);
	}
	updateBalls();
}

function updateBalls(){
	var tmp_balls = [];
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		
	//	alert(balls[i].y);
		if(balls[i].y>400-balls[i].r){// 屏幕的底部
			balls[i].y=400-balls[i].r;
			balls[i].vy = -balls[i].vy*0.6;
		}else{
			balls[i].vy+=balls[i].g;
		}
		if (balls[i].x >= 0 && balls[i].x <= 800)
			tmp_balls.push(balls[i]);
	}
	balls = tmp_balls;
}

function addBalls(x,y,num){
	if (balls.length > 2000) {
		return;
	}
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][j].length;j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),// x轴坐标
					y:y+i*2*(RADIUS+1)+(RADIUS+1),// y轴坐标
					r:RADIUS,// 半径
					g:1.5+Math.random(),// 重力加速度
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,// x轴速度
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]// 取颜色
				}
				balls.push(aBall);
			}
		}
	}
}

function getCurShowTImeSeconds(){
	var curTime = new Date();
	var ret = curTime.getTime() - beginTime.getTime();
	ret = Math.round(ret/1000);
	return ret>0?ret:0;
}

function getDateDetails(allseconds) {
	lastDays = days, lastHours = hours;
	lastMinutes = minutes, lastSeconds = seconds;
	days = parseInt(allseconds/3600/24);
	hours = parseInt(allseconds/3600%24);
	minutes = parseInt(allseconds/60%60);
	seconds = parseInt(allseconds%60);
}

function render(ctx){
	ctx.clearRect(0,0,1200,600);// 清空画布

	getDateDetails(curShowTimeSeconds);

	renderDigit(days_x[0],days_y[0],parseInt(days/100),ctx,"#AA66CC");
	renderDigit(days_x[1],days_y[1],parseInt(days%100/10),ctx,"#AA66CC");
	renderDigit(days_x[2],days_y[2],parseInt(days%10),ctx,"#AA66CC");

	renderDigit(hours_x[0],hours_y[0],parseInt(hours/10),ctx,"#FF4444");
	renderDigit(hours_x[1],hours_y[1],parseInt(hours%10),ctx,"#FF4444");
	/*renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP + lenth1,10,ctx);*/
	renderDigit(minutes_x[0],minutes_y[0],parseInt(minutes/10),ctx,"#FF8800");
	renderDigit(minutes_x[1],minutes_y[1],parseInt(minutes%10),ctx,"#FF8800");
	/*renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP + lenth1,10,ctx);*/
	renderDigit(seconds_x[0],seconds_y[0],parseInt(seconds/10),ctx,"#99CC00");
	renderDigit(seconds_x[1],seconds_y[1],parseInt(seconds%10),ctx,"#99CC00");
	
	ctx.fillStyle = "#333333";
    ctx.font="20px droid sans";
    ctx.textBaseline = 'top';
             //填充字符串
    ctx.fillText("days", days_text_x, days_text_y);
    ctx.fillText("hours", hours_text_x, hours_text_y);
    ctx.fillText("minutes", minutes_text_x, minutes_text_y);
    ctx.fillText("seconds", seconds_text_x, seconds_text_y);

	for(var i=0;i<balls.length;i++){
		ctx.fillStyle=balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
}

function renderDigit(x,y,num,ctx,color){
	ctx.fillStyle=color;
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][j].length;j++){
			if(digit[num][i][j]==1){
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
 

}