var canvas;
var context;
var intervalID;
var intervalID2;
var pos;
var dir;

function init() {
	pos = 0;
	dir = 'droite';
	canvas = document.createElement('canvas');
	canvas.width = 500;
	document.body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.fillStyle = 'red';
	context.fillRect(pos, 20, 50, 50);
	intervalID2 = window.setInterval(start, 2000);
}

function move() {
	context.clearRect(pos, 20, 50, 50);
	if (dir === 'droite') {
		pos+=10;
		if (pos+100 >= 500) { dir = 'gauche' }
	} else {
		pos-=10;
		if (pos <= 0) { dir = 'droite' }
	}
	context.fillRect(pos, 20, 50, 50);
}

function start() {
	intervalID = window.setInterval(move, 100);
	clearInterval(intervalID2);
}
