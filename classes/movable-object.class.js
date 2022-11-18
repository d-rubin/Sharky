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


    /**
     * Animates an Array with an Intervall
     * @param {array of Paths} array - Images
     */
    playAnimation(array) {
        setInterval(() => {
            let i = this.currentImage % array.length; // i ist immer zwischen 0 bis länge des Arrays und wiederholt sich 
            let path = array[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 5);
    }


    /**
     * Animates an Array without an Intervall
     * @param {array of Paths} array - Images
     */
    animationLoop(array){
        let i = this.currentImage % array.length; // i ist immer zwischen 0 bis länge des Arrays und wiederholt sich 
        let path = array[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveLeft(){
        setInterval(() => {
            this.x -= 0.6;
        }, 1000 / 30);
    }


    moveRight(){
        setInterval(() => {
            this.x += 0.6;
        }, 1000 / 30);
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

    /**
     * Colliding with Offset For Character
     * @param {MovableObject} mo - The Object, that is Colliding with the Character.
     * @returns True when a Collisson is happening
     */
    isColliding(mo) {
        return this.x + (this.width - 40) > mo.x &&
        this.y + (this.height -60) > mo.y &&
        (this.x + 60) < mo.x + mo.width &&
        (this.y + 80) < mo.y + mo.height;
    }

    // Colliding with Offset for Bubble on Jellyfish
    isCollidingBubble(mo) {
        return this.x + (this.width - 20) > mo.x &&
        this.y + (this.height -20) > mo.y &&
        (this.x + 20) < mo.x + mo.width &&
        (this.y + 20) < mo.y + mo.height;
    }

    // Colliding with Offset for Bubble on Boss
    isCollidingBubbleBoss(mo) {
        return this.x + (this.width - 20) > (mo.x + 20) &&
        this.y + (this.height -20) > (mo.y + 120) &&
        (this.x + 20) < mo.x + (mo.width - 20) &&
        (this.y + 20) < mo.y + (mo.height - 80);
    }


    // Colliding without Offset
    isCollidingFinSlap(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height;
    }

    // Colliding with Offset for Character on Boss
    isCollidingBoss(mo) {
        return this.x + (this.width - 40) > (mo.x + 20) &&
        this.y + (this.height -60) > (mo.y + 120) &&
        (this.x + 60) < mo.x + (mo.width - 20) &&
        (this.y + 80) < mo.y + (mo.height - 80);
    }

    // Checks with what Instance the Character collides and sets the Time
    checkColliissions() {
        this.timeNow = new Date().getTime();
        this.lastCollision = this.timeNow - this.timeCollision;
        this.world.level.enemies.forEach((enemy) => {         
            this.characterOrEnemyHurt(enemy);
        });
    }

    // Chooses witch animation is played
    characterOrEnemyHurt(enemy) {
        if(this.world.character.isCollidingFinSlap(enemy) && this.world.keyboard.SPACE && !enemy.isDead()) {
            this.checkEnemyType(enemy);
            if(enemy instanceof Pufferfish) {
                enemy.energy = 0;}
        }
        else if(this.world.character.isColliding(enemy) && !enemy.isDead() && this.lastCollision > 1000 && (enemy instanceof Pufferfish || enemy instanceof Jellyfish)) {
            this.timeCollision = new Date().getTime();
            this.characterHurt(enemy);
            this.world.statusBar_life.setPercentage(this.world.character.energy);
        }
        else if(this.world.character.isCollidingBoss(enemy) && enemy instanceof Boss && this.lastCollision > 1000) {
            this.timeCollision = new Date().getTime();
            this.characterHurt(enemy);
            this.world.statusBar_life.setPercentage(this.world.character.energy);}
    }

    characterHurt(enemy) {
        this.checkEnemyType(enemy);
        this.hit();
        this.isHurt();
    }


    hurtsound(path) {
        const audio = new Audio(path);
        audio.volume = 0.2;
        audio.play();
        allAudios.push(audio);
    }

    // Checks with wich Instance the Character collides
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