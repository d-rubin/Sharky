class MovableObject extends DrawableObject {
    otherDirection = false;
    speed = 1;
    positionUP = false;
    energy = 100;
    array;
    type = "";
    lastHit = 0;
    energy = 100;
    lastColliding = false;
    timeNow;
    timeCollision = 0;
    lastCollision;

    playAnimation(array) {
        setInterval(() => {
            let i = this.currentImage % array.length; // i ist immer zwischen 0 bis länge des Arrays und wiederholt sich 
            let path = array[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 5);
    }

    animationLoop(array){
        let i = this.currentImage % array.length; // i ist immer zwischen 0 bis länge des Arrays und wiederholt sich 
        let path = array[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveLeft(){
        setInterval(() => {
            this.x -= 0.3;
        }, 1000 / 60);
    }


    moveRight(){
        setInterval(() => {
            this.x += 0.3;
        }, 1000 / 60);
    }


    checkifUPorDOWN() {
        if(this.y <= 30) {
            this.positionUP = true;
        }
        if(this.y >= 350) {
            this.positionUP = false;
        }
    }


    animateUPandDOWN(){
        this.checkifUPorDOWN();
        if(this.positionUP) {
            this.y += this.speed;
        }
        else {
            this.y -= this.speed;
        }
    }

    
    isColliding(mo) {
        return this.x + (this.width - 30) > mo.x &&
        this.y + (this.height -50) > mo.y &&
        (this.x + 50) < mo.x + mo.width &&
        (this.y + 70) < mo.y + mo.height;
    }

    isCollidingFinSlap(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height;
    }


    checkColliissions() {
        this.timeNow = new Date().getTime();
        this.lastCollision = this.timeNow - this.timeCollision;
        this.world.level.enemies.forEach((enemy) => {         
            this.characterOrEnemyHurt(enemy);
        });
    }

    characterOrEnemyHurt(enemy) {
        if(this.world.character.isCollidingFinSlap(enemy) && this.world.keyboard.SPACE && !enemy.isDead()) {
            this.checkEnemyType(enemy);
            if(enemy instanceof Pufferfish) {
                enemy.energy = 0;
            }
        }
        else if(this.world.character.isColliding(enemy) && !enemy.isDead() && this.lastCollision > 1000) {
            this.timeCollision = new Date().getTime();
            this.checkEnemyType(enemy);
            this.hit();
            this.isHurt();
            this.world.statusBar_life.setPercentage(this.world.character.energy);
        }
    }


    hurtsound(path) {
        const audio = new Audio(path);
        audio.play();
    }


    checkEnemyType(enemy) {
        if(enemy instanceof Jellyfish && !this.world.character.isDead()) {
            this.lastColliding = true;
        }
        else if(!this.world.character.isDead()){
            this.lastColliding = false;
        }
    }


    isDead() {
        return this.energy <= 0;
    }

    hit() {
        if(this.energy > 0) {
        this.energy -= 1;
        this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in s
        return timepassed < 1;
    }
}