class ThrowableObject extends MovableObject {
    speedY = 0;
    acceleration = 0.2;

    constructor(x, y, path) {
        super().loadImage(path);
        this.width = 50;
        this.height = 50;
        this.throw(x, y);
        this.run();
    }


    run() {
        setInterval(() => {
         this.checkColliissions();
       }, 1000 / 60);
    }


    // Checks if the Bubble is colliding 
    checkColliissions() {
        world.level.enemies.forEach((enemy) => {
            if(this.isCollidingBubble(enemy) && enemy instanceof Jellyfish) {
                enemy.energy = 0;
            }
            else if(this.isCollidingBoss(enemy) && enemy instanceof Boss) {
                enemy.energy -= 0.1;
                world.statusBar_Boss.setPercentage(enemy.energy);
                enemy.hurt = true;
            }
        });
    }

    throw(x, y) {
        this.x = x; 
        this.y = y; 
        this.applyGravity();
        this.moveRight();
    }


    moveRight(){
        setInterval(() => {
            this.x += 10;
        }, 1000 / 30);
    }


    applyGravity() {
        setInterval(() => {
            this.y -= this.speedY;
            this.speedY += this.acceleration;
        }, 1000 / 30);
    }
}