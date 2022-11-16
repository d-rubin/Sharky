class ThrowableObject extends MovableObject {
    speedY = 0;
    acceleration = 0.1;

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

    checkColliissions() {
        world.level.enemies.forEach((enemy) => {
            if(this.isColliding(enemy) && enemy instanceof Jellyfish) {
                enemy.energy = 0;
            }
            else if(this.isColliding(enemy) && enemy instanceof Boss) {
                enemy.energy -= 10;
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
            this.x += 5;
        }, 1000 / 60);
    }


    applyGravity() {
        setInterval(() => {
            this.y -= this.speedY;
            this.speedY += this.acceleration;
        }, 1000 / 60);
    }
}