var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

var tics = 0;
var _timeToBeAlive = 30;

//Canvas
var divArena;
var canArena;
var canScore;
var conArena;
var conScore;
var ArenaWidth = 500;
var ArenaHeight = 300;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;
//une modification

var highscore = 0;

///////////////////////////////////
//Keys
var keys = {
	LEFT : 37,
    UP: 38,
    RIGHT : 39,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict"; 
    var keycode = event.keyCode, 
        key;
    for (key in keys) {
    	if (keycode === keys.ENTER && player.nbOfLives <= 0) {
    		clearItems();
    		enemies.init();
    		player.nbOfLives = 2;
    		player.projectileSet.score = 0;
    		conArena.clearRect(0,0,500,500);
    		animFrame( recursiveAnim );
    	} else if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys) {
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
        
    }
}

/////////////////////////////////

/////////////////////////////////


function updateScene() {
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}
function updateItems() {
    "use strict"; 
    player.update();
    tics++;
    if(tics % 100 == 1) {
        var rand = Math.floor(Math.random() * ArenaHeight);
        var movement = function(x) { return ArenaHeight/4 * Math.sin(x / 100) };
        enemies.add(new Enemy(ArenaWidth, rand,-2, movement));
    } else if (tics % 100 == 2) {
    	var rand = Math.floor(Math.random() * ArenaHeight);
    	var movement = function(x) { return ArenaHeight/4 * Math.sin(x / 100) };
        enemies.add(new Enemy(ArenaWidth, rand,-3, movement));
    } else if (tics % 100 == 0) {
    	var rand1 = Math.floor(Math.random() * ArenaHeight);
    	var rand2 = Math.floor(Math.random() * ArenaHeight);
    	var movement = function(x) { return (rand1-rand2)/ArenaHeight * x + rand2; };
        enemies.add(new Enemy(ArenaWidth, rand1,-3, movement));
    }
    enemies.update();
}
function drawScene() {
    "use strict"; 
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems() {
    "use strict"; 
    player.draw();
    enemies.draw();
}
function clearItems() {
    "use strict"; 
    player.clear(); 
    enemies.clear();
}

function clearScore() {
    conScore.clearRect(0,0,300,50);
}
function drawScore() {
    conScore.fillText("life : "+player.nbOfLives, 10, 25);
    conScore.fillText("score : "+player.projectileSet.score, 150,25);
}
function updateGame() {
    "use strict"; 
    updateScene();
    updateItems();
}
function clearGame() {
    "use strict"; 
    clearItems();
    clearScore();
}

function drawGame() {
    "use strict"; 
    drawScene();
    drawScore();
    drawItems();    
}


function mainloop () {
    "use strict"; 
    clearGame();
    updateGame();
    drawGame();
}

function recursiveAnim () {
    "use strict"; 
    if (player.nbOfLives > 0) {
    	mainloop();
    	animFrame( recursiveAnim );
    } else {
    	conArena.fillStyle = 'white';
    	conArena.fillText("Appuyez sur entrer pour rejouer", 10, 100);
    	if (player.projectileSet.score > highscore) {
    		highscore = player.projectileSet.score;
    	}
    	conArena.fillText("HIGHSCORE : "+highscore, 90, 160);
    	conArena.fillText("Your score : "+player.projectileSet.score, 90, 190);
    }
}
 
function init() {
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    canArena.setAttribute("height", ArenaHeight);
    canArena.setAttribute("width", ArenaWidth);
    conArena = canArena.getContext("2d");
    conArena.fillStyle = 'red';
    conArena.font = 'bold 18pt Courier';
    divArena.appendChild(canArena);

    canScore = document.createElement("canvas");
    canScore.setAttribute("id","canScore");
    canScore.setAttribute("height", ArenaHeight);
    canScore.setAttribute("width", ArenaWidth);
    conScore = canScore.getContext("2d");
    conScore.fillStyle = "rgb(200,0,0)";
    conScore.font = 'bold 12pt Courier';
    divArena.appendChild(canScore);

 
    player.init();
    enemies.init();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);
