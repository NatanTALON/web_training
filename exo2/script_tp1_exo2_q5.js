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
		this.context.clearRect(this.pos_x, this.pos_y, 20, 20);
		if (this.dir === 'droite') {
			this.pos_x+=10;
			if (this.pos_x+100 >= 500) { this.dir = 'gauche' }
		} else {
			this.pos_x-=10;
			if (this.pos_x <= 0) { this.dir = 'droite' }
		}
		context.fillRect(this.pos_x, this.pos_y, 20, 20);
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
	intervalID = window.setInterval(start, 1000);
}


function start() {
	i++;
	if (i > 4 && i < 15) {
		let c = new Carre(context, (i-4)*30);
		window.setInterval(function(){c.move();}, 100);
	}
	if (i >= 15) { clearInterval(intervalID); }
}

