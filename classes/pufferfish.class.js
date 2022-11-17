class Pufferfish extends MovableObject {
    width = 80;
    height = 80;
    count = 0;

    // contruct Pufferfish random
    constructor(swim, transition, bubble, dead) {
        super();
        this.dead = dead;
        this.swim = swim;
        this.transition = transition;
        this.bubble = bubble;
        this.loadImages(this.swim);
        this.loadImages(this.transition);
        this.loadImages(this.bubble);
        this.loadImages(this.dead);
        this.x = 300 + Math.random() * 1200;
        this.y = 30 + Math.random() * 320;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if(this.isDead()) {
                this.playDeadAnimation();
            }
        }, 1000 / 5);
        this.moveLeft();
        this.autoChange();
        this.moveDown();
    }

    // changes the animation after a given time
    autoChange() {
        if(!this.isDead()) {
            this.playSwimAnimation();
            setTimeout(() => {
                this.playTransitonAnimation();
            }, 5000);
            setTimeout(() => {
                this.playBubbleAnimation();
            }, 6000);
            setInterval(() => {
                this.autoChange();
            }, 11750);
        }
    }


    playSwimAnimation() {
        let swimLoop = setInterval(() => {
                if(!this.isDead()) {
                    this.animationLoop(this.swim);
                    setTimeout(() => {
                        clearInterval(swimLoop);
                    }, 5000);
                }
            }, 1000 / 5);
    }


    playTransitonAnimation() {
        let transitionLoop = setInterval(() => {
            if(!this.isDead()) {
                this.animationLoop(this.transition);
                setTimeout(() => {
                    clearInterval(transitionLoop);
                }, 750);
            }
        }, 1000 / 5);
        
    }


    playBubbleAnimation() {
        let bubbleLoop = setInterval(() => {
            if(!this.isDead()) {
                this.animationLoop(this.bubble);
                setTimeout(() => {
                    clearInterval(bubbleLoop);
                }, 6000);        
            }
        }, 1000 / 5);
    }


    playDeadAnimation() {
        if(this.count < 4) {
            this.animationLoop(this.dead);
            this.hurtsound('audio/enemyDead.mp3');
            this.count++;
        }
    }


    moveLeft(){
        setInterval(() => {
            if(!this.isDead()) {
            this.x -= 0.6;
            }
        }, 1000 / 30);
    }

    
    moveDown() {
        setInterval(() => {
            if(this.isDead()) {
                this.y += 6;
                this.x += 8;
            }
        }, 1000 / 30);
    }
}