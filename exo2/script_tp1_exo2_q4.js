var canvas;
var context;
var intervalID;
var pos1;
var dir1;
var pos2;
var dir2;
var pos3;
var dir3;
var i;

function init() {
	i = 0;
	pos1 = 0;
	dir1 = 'droite';
	pos2 = 0;
	dir2 = 'droite';
	pos3 = 0;
	dir3 = 'droite';
	canvas = document.createElement('canvas');
	canvas.width = 500;
	document.body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.fillStyle = 'red';
	context.fillRect(pos, 20, 50, 50);
	intervalID = window.setInterval(start, 1000);
}

function move() {
	context.clearRect(pos, 10, 50, 50);
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
	i++;
	if (i === 4) { window.setInterval(move, 100); }
	if (i === 5) { window.setInterval(move, 100); }
	if (i === 6) { window.setInterval(move, 100); }
	if (i > 6) { clearInterval(intervalID); }	
}
