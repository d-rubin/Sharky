let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileButtons();
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('youWin').classList.add('d-none');
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }    
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }    
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68)
        keyboard.D = true;
});


window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }    
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }    
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68)
        keyboard.D = false;
});

function mobileButtons() {
        document.getElementById('buttonUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.UP = true;
        });
    
        document.getElementById('buttonUp').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.UP = false;
        });
    
        document.getElementById('buttonDown').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.DOWN = true;
        });
    
        document.getElementById('buttonDown').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.DOWN = false;
        });
    
        document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT = true;
        });
    
        document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        });
    
        document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });
    
        document.getElementById('buttonRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });
    
        document.getElementById('buttonFin').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.D = true;
        });
    
        document.getElementById('buttonFin').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.D = false;
        });
    
        document.getElementById('buttonBubble').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE = true;
        });
    
        document.getElementById('buttonBubble').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        });
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

function closeStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
}

function openStartscreen() {
    document.getElementById('startscreen').classList.remove('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('youWin').classList.add('d-none');
}


function mute() {
    let mute = document.getElementById('mute');
    let audio = document.querySelectorAll('audio');
    if(mute.src == "http://daniel-rubin.developerakademie.net/Sharkie/img/mute-3-48.png") {
        mute.src = "img/volume-up-4-48.png";
        [].forEach.call(audio, function(elem) { audioMute(elem); });
    }
    else {
        mute.src = "img/mute-3-48.png";
        [].forEach.call(audio, function(elem) { audioVolume(elem); });
    }
}

function audioMute(elem) {
    elem.muted = true;
}

function audioVolume(elem) {
    elem.mute = false;
}