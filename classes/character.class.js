class Character extends MovableObject {
    width = 200;
    height = 200;
    energy = 10;
    
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_DEAD_POISON = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_DEAD_ELECTRO = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];
    IMAGES_HURT_POISONED = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];
    IMAGES_HURT_ELECTRO = [
        'img/1.Sharkie/5.Hurt/2.Electric-shock/o1.png',
        'img/1.Sharkie/5.Hurt/2.Electric-shock/o2.png'
    ];
    IMAGES_ATTACK_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];
    IMAGES_ATTACK_FIN = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png',
    ];

    world;
    speed = 6;
    array = [];
    timePassed = 0;
    lastKeydown = 0;


    constructor() {
        super().loadImage(this.IMAGES_SWIM[0]);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_DEAD_ELECTRO);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_ELECTRO);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
        this.loadImages(this.IMAGES_ATTACK_FIN);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
    }
    

    animate() {
        this.playAnimations();
        setInterval(() => {
            this.setTimePassed();
            this.moveRight();
            this.moveUP();
            this.moveDOWN();
            this.moveLeft();
            this.isDead();
            this.world.camera_x = -this.x;
        }, 1000 / 30);
    }

    moveRight() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
            this.otherDirection = false;
            this.x += this.speed;
        }
    }


    moveUP() {
        if(this.world.keyboard.UP && this.y >= -70 && !this.isDead()) {
            this.y -= this.speed;
        }
    }


    moveDOWN() {
        if(this.world.keyboard.DOWN && this.y <= 300 && !this.isDead()) {
            this.y += this.speed;
        }
    }


    moveLeft() {
        if(this.world.keyboard.LEFT && this.x > -720 && !this.isDead()) {
            this.otherDirection = true;
            this.x -= this.speed;
        }
    }

    // Count the Time in that no Event happened
    setTimePassed() {
        setTimeout(() => {
            let setTime = new Date().getTime();
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || 
                this.world.keyboard.DOWN || this.world.keyboard.D || this.world.keyboard.SPACE) {
                this.lastKeydown = new Date().getTime();
            }
            this.timePassed = setTime - this.lastKeydown;
        }, 10000);
    }

    // Choose witch Animation and Sound to play
    playAnimations() {
        let i = 0;
        setInterval(() => {
            if(this.isDead() && this.lastColliding && i < 10) {
                this.animationLoop(this.IMAGES_DEAD_ELECTRO);
                this.hurtsound('audio/hurtelectro.wav');
                i++;
            }
            else if(this.isDead() && !this.lastColliding && i < 12) {
                this.animationLoop(this.IMAGES_DEAD_POISON);
                this.hurtsound('audio/hurtpoison.ogg');
                i++;
            }
            else if(this.lastColliding && !this.isDead() && this.isHurt()) {
                this.animationLoop(this.IMAGES_HURT_ELECTRO);
                this.hurtsound('audio/hurtelectro.wav');
            }
            else if(!this.lastColliding && !this.isDead() && this.isHurt()) {
                this.animationLoop(this.IMAGES_HURT_POISONED);
                this.hurtsound('audio/hurtpoison.ogg');
            }
            else if(this.world.keyboard.D && !this.isDead()) {
                this.animationLoop(this.IMAGES_ATTACK_BUBBLE);
                this.hurtsound('audio/bubble.wav');
            }
            else if(this.world.keyboard.SPACE && !this.isDead()) {
                this.animationLoop(this.IMAGES_ATTACK_FIN);
            }
            else if(this.timePassed > 10000 && !this.isDead()) {
                this.animationLoop(this.IMAGES_LONG_IDLE);
            }
            else if(!this.isDead()) {
                this.animationLoop(this.IMAGES_SWIM);
            }
        }, 1000 / 5);
    }
}