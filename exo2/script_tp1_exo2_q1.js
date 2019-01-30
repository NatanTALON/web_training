var intervalID;
var counter;
var div;

function init() {
	div = document.createElement('div');
	document.body.appendChild(div);
	counter = 10;
	intervalID = window.setInterval(decremente, 1000);
	div.innerHTML = counter;
}

function decremente() {
	counter--;
	div.innerHTML = counter;
	if (counter === 0) {
		clearInterval(intervalID);
	}
}
