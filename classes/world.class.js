let IMAGES_LIFE = [
    'img/4. Marcadores/orange/0_  copia.png',
    'img/4. Marcadores/orange/20_ copia 2.png',
    'img/4. Marcadores/orange/40_  copia.png',
    'img/4. Marcadores/orange/60_  copia.png',
    'img/4. Marcadores/orange/80_  copia.png',
    'img/4. Marcadores/orange/100_  copia.png'
];

let IMAGES_Poison = [
    'img/4. Marcadores/orange/0_ copia.png',
    'img/4. Marcadores/orange/20_ copia.png',
    'img/4. Marcadores/orange/40_ copia.png',
    'img/4. Marcadores/orange/60_ copia.png',
    'img/4. Marcadores/orange/80_ copia.png',
    'img/4. Marcadores/orange/100_ copia.png',
];

let IMAGES_Coin = [
    'img/4. Marcadores/orange/0_  copia 2.png',
    'img/4. Marcadores/orange/20_  copia.png',
    'img/4. Marcadores/orange/40_  copia 2.png',
    'img/4. Marcadores/orange/60_  copia 2.png',
    'img/4. Marcadores/orange/80_  copia 2.png',
    'img/4. Marcadores/orange/100_ copia 2.png'
];

class World {
    character = new Character();
    level = initLevel();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar_life = new StatusBar(IMAGES_LIFE, 100, -20);
    statusBar_poison = new StatusBar(IMAGES_Poison, 0, 60);
    statusBar_coins = new StatusBar(IMAGES_Coin, 0, 140);
    throwableObjects = [];
    poisonedBubbles = 0;
    collectedCoins = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.showWinOrLooseScreen();
        this.collectitem(this.level.bottles);
        this.collectitem(this.level.coins);
    }


    clearAllIntervalls() {
        setTimeout(() => {
            for(let i = 0; i < 999; i++) window.clearInterval(i);
        }, 3000);
    }
  
    
    showWinOrLooseScreen() {
            setInterval(() => {
                if(this.character.isDead()) {
                    this.showLooseScreen();
                    this.clearAllIntervalls();
                }
                else if(this.level.enemies[11].isDead()) {
                    this.showWinScreen();
                    this.clearAllIntervalls();
                }
            }, 1000 /60);
    }


    showLooseScreen() {
        setTimeout(() => {
            document.getElementById('gameOver').classList.remove('d-none');
        }, 3000);
    }


    showWinScreen() {
        setTimeout(() => {            
        document.getElementById('youWin').classList.remove('d-none');
    }, 3000);
    }


    collectitem(array) {
        let lastCollect = 0;
        setTimeout(() => {
            let timespan = 1001;        
            setInterval(() => {
                let now = new Date().getTime();
                array.forEach((item) => {
                    if(this.character.isColliding(item) && timespan > 1000) {
                        this.disapear(item);                    
                        this.coinOrBubble(item);
                        lastCollect = new Date().getTime();
                        this.switchsound(item);}});
                timespan = now - lastCollect;
            }, 1000 / 60);
        }, 1000);}


    coinOrBubble(item) {
        if(item instanceof Bottle) {
            this.poisonedBubbles += 1;
            this.statusBar_poison.setPercentage(this.poisonedBubbles);
        }
        else {
            this.collectedCoins += 1;
            this.statusBar_coins.setPercentage(this.collectedCoins);
        }
    }


    switchsound(item) {
        if(item instanceof Bottle) {
            const audio = new Audio('audio/bottle.wav');
            audio.play();
        }
        else {
            const audio = new Audio('audio/coin.wav');
            audio.play();
        }
    }


    disapear(bottle) {
        setInterval(() => {
            if(bottle.width >= 0) {
                bottle.width -= 2;
                bottle.height -= 2;
            }
        }, 1000 / 60);
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.character.checkColliissions();
        }, 1000 / 5);
        setInterval(() => {
            const audio = new Audio('audio/water.wav');
            audio.volume = 0.8;
            audio.play();
        }, 2000);
    }


    checkThrowObjects() {
        if(!this.character.isDead() && this.keyboard.D && this.poisonedBubbles == 0) {
            let bubble = new ThrowableObject((this.character.x + this.character.width), (this.character.y + this.character.height / 2), 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
            this.throwableObjects.push(bubble);
            this.bubblesound();
        }       
        else if(!this.character.isDead() && this.keyboard.D) {
            let bubble = new ThrowableObject((this.character.x + this.character.width), (this.character.y + this.character.height / 2), 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble.png');
            this.throwableObjects.push(bubble);
            this.poisonedBubbles -= 1;
            this.statusBar_poison.setPercentage(this.poisonedBubbles);
            this.bubblesound();
        }     
    }


    bubblesound() {
        const audio = new Audio('audio/water.wav');
        audio.play();
    }


    animationLoop(array){
        let i = this.character.currentImage % array.length; // i ist immer zwischen 0 bis länge des Arrays und wiederholt sich 
        let path = array[i];
        this.character.img = this.character.imageCache[path];
        this.character.currentImage++;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); // Verschiebt den ctx um camera_x
        this.addObjectsToMap(this.level.backgroundObjects);  

        this.ctx.translate(-this.camera_x, 0); // Schiebt den ctx wider zurück
        this.addToMap(this.statusBar_life);
        this.addToMap(this.statusBar_poison);
        this.addToMap(this.statusBar_coins);
        this.ctx.translate(this.camera_x, 0); // Verschiebt den ctx um camera_x

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);  
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0); // Schiebt den ctx wider zurück
        let self = this; // draw() wird immer wieder aufgerufen
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        try {
        objects.forEach(object => {
            this.addToMap(object);
        });
        }
        catch(e) {
            console.warn(e);
            console.log(objects);
        }
    }


    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}