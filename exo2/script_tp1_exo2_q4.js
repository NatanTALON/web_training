var canvas;
var context;
var intervalID;
var i;
var carre1;
var carre2;
var carre3;


function Carre(context, pos_y) {
	this.context = context;
	this.pos_y = pos_y;
	this.pos_x = 0;
	this.dir = 'droite';
	this.move = function() {
		this.context.clearRect(this.pos_x, this.pos_y, 50, 50);
		if (this.dir === 'droite') {
			this.pos_x+=10;
			if (this.pos_x+100 >= 500) { this.dir = 'gauche' }
		} else {
			this.pos_x-=10;
			if (this.pos_x <= 0) { this.dir = 'droite' }
		}
		context.fillRect(this.pos_x, this.pos_y, 50, 50);
	}
}


function init() {
	i = 0;
	canvas = document.createElement('canvas');
	canvas.width = 500;
	canvas.height = 500;
	document.body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.fillStyle = 'red';
	context.fillRect(0, 20, 50, 50);
	context.fillRect(0, 80, 50, 50);
	context.fillRect(0, 140, 50, 50);
	carre1 = new Carre(context, 20);
	carre2 = new Carre(context, 80);
	carre3 = new Carre(context, 140);
	intervalID = window.setInterval(start, 1000);
}


function start() {
	i++;
	console.log(i);
	if (i === 4) { window.setInterval(function(){carre1.move();}, 100); }
	if (i === 5) { window.setInterval(function(){carre2.move();}, 100); }
	if (i === 6) { window.setInterval(function(){carre3.move();}, 100); }
	if (i > 6) { clearInterval(intervalID); }
}

