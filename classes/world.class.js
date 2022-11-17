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
    statusBar_life = new StatusBar(IMAGES_LIFE, 100, -5, 10);
    statusBar_poison = new StatusBar(IMAGES_Poison, 0, 35, 10);
    statusBar_coins = new StatusBar(IMAGES_Coin, 0, 75, 10);
    statusBar_Boss = new StatusBar(IMAGES_LIFE, 100, 75, 3000);
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


    // Clears all Intervalls at the End
    clearAllIntervalls() {
        setTimeout(() => {
            for(let i = 0; i < 999; i++) window.clearInterval(i);
        }, 2500);
    }


  
    // Shows the Endscreen
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
            }, 1000 / 120);
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

    // Collects an Item when colliding
    collectitem(array) {
        // let lastCollect = 0;
        setTimeout(() => {
            // let timespan = 1001;        
            setInterval(() => {
                // let now = new Date().getTime();
                array.forEach((item, index) => {
                    if(this.character.isColliding(item)) {
                        this.deleteItem(item, index);
                        // lastCollect = new Date().getTime();
                        this.switchsound(item);
                    }});
                // timespan = now - lastCollect;
            }, 1000 / 30);
        }, 1000);
    }

    // Deletes the Item out of the given Array
    deleteItem(item, index) {
        // this.disapear(item);                    
        this.coinOrBubble(item);
        this.spliceItem(item, index);
    }

    
    spliceItem(item, index) {
        if(item instanceof Bottle) {
            this.level.bottles.splice(index, 1);
        }
        else {
            this.level.coins.splice(index, 1);
        }
    }

    // Checks if Instance is Coin or Bubble
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


    audioBottle = new Audio('audio/bottle.wav');
    audioCoin = new Audio('audio/coin.wav');


    // Plays sound based on the Instance
    switchsound(item) {
        if(item instanceof Bottle) {
            this.audioBottle.play();
        }
        else {
            this.audioCoin.play();
        }
    }


    setWorld() {
        this.character.world = this;
    }

    audioWater = new Audio('audio/water.wav');


    checkIfGameEnded() {
        setInterval(() => {
            if(this.character.isDead() || this.level.enemies[11].isDead()) {
                this.audioWater.muted = true;
            }
        }, 1000/30);
    }


    run() {
        this.checkIfGameEnded();
        setInterval(() => {
            this.checkThrowObjects();
            this.character.checkColliissions();
        }, 1000 / 5);
        setInterval(() => {
            this.audioWater.volume = 0.8;
            this.audioWater.play();
        }, 4000);
    }


    // Checks if the Character is shooting a normal or a green Bubble
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


    audioBubble = new Audio('audio/water.wav');


    bubblesound() {
        this.audioBubble.play();
    }


    animationLoop(array){
        let i = this.character.currentImage % array.length;
        let path = array[i];
        this.character.img = this.character.imageCache[path];
        this.character.currentImage++;
    }

    // Draws the Objects on the Canvas
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);  

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar_life);
        this.addToMap(this.statusBar_poison);
        this.addToMap(this.statusBar_coins);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);  
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.statusBar_Boss);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Draw an Array of Objects on the Canvas
     * @param {DrawableObject} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    // Adds only one Object to the Canvas
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    
    // Flips the Img if the Character goes back
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    // Flips the Img back to normal
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}