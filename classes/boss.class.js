class Boss extends MovableObject {
    x = 1750;
    y = 0;
    width = 400;
    height = 400;
    energy = 10;
    hurt = false;
    i = 0;
    timeSet = 0;
    now;
    timePassed;

    imagesfloating = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    imagesIntro = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png'
    ];

    imgagesHurt = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    imagesAttack = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    imagesDead = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    constructor() {
        super().loadImage(this.imagesIntro[0]);
        this.loadImages(this.imagesfloating);
        this.loadImages(this.imagesIntro);
        this.loadImages(this.imgagesHurt);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesDead);
        this.animateIntro();
    }

    // animate The Intro of the Boss and Start the normal animation
    animateIntro() {
        setTimeout(() => {
            let intro = setInterval(() => {
                if(world.character.x >= 1410) {
                    this.animationLoop(this.imagesIntro);
                    setTimeout(() => {
                        clearInterval(intro);
                        this.animateMain();
                        this.moveLeft();
                        world.statusBar_Boss.x = 1800;
                        world.statusBar_Boss.moveLeft();
                    }, 1250);
                }
            }, 1000 / 5);  
        }, 2000);
    }


    // Normal animation (switch between swim and attack)
    animateMain() {
        setInterval(() => {
            this.now = new Date().getTime();
            if(this.isDead() && this.i < 5) {
                this.animationLoop(this.imagesDead);
                this.i++;
            }
            else if(!this.isDead() && this.hurt) {
                this.hurtLoop();
            }
            else if(!this.isDead() && this.timePassed < 2650) {
                this.animationLoop(this.imagesfloating);
            }
            else if (!this.isDead() && this.timePassed > 2650) {
                this.attackLoop();
            }
            this.timePassed = this.now - this.timeSet;
        }, 1000 / 5);
        this.playsound();
    }


    moveLeft(){
        setInterval(() => {
            if(!this.isDead()) {
            this.x -= 0.2;
            }
        }, 1000 / 30);
    }

    attackLoop() {
        this.animationLoop(this.imagesAttack);
        setTimeout(() => {
            this.timeSet = new Date().getTime();
        }, 1500);
    }

    hurtLoop() {
        this.animationLoop(this.imgagesHurt);
        setTimeout(() => {
            this.hurt = false;
        }, 850);
    }


    audioBoss = new Audio('audio/orca.mp3');


    playsound() {
        setInterval(() => {
            this.audioBoss.volume = 0.5;
            this.audioBoss.play();
            allAudios.push(this.audioBoss);
            if(this.checkForDead()) {
                this.audioBoss.muted = true;
                this.audioBoss.pause();
            }
        }, 8000);
    }

    checkForDead() {
        setInterval(() => {
            if(this.isDead() || world.character.isDead()) {
                this.audioBoss.pause();
            }
        }, 1000 / 30);
    }
}
