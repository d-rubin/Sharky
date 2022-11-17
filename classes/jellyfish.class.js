class Jellyfish extends MovableObject{
    width = 80;
    height = 80;

    
    // construct Jellyfish random
    constructor(swim, dead) {
        super();
        this.loadImages(swim);
        this.loadImages(dead);
        this.dead = dead;
        this.swim = swim;
        this.x = 300 + Math.random() * 1100;
        this.y = 30 + Math.random() * 320;
        this.animate();   
    }

    animate() {
        let i = 0;
        this.deadOrSwim(i);
        setInterval(() => {
                if(!this.isDead()) {
                    this.animateUPandDOWN();
                }
                else {
                    this.y -= 4;
                }
        }, 1000 / 30);
    }

    // Play Dead or Swim Animaton
    deadOrSwim(i) {
        setInterval(() => {
            if(this.isDead() && i < 4) {
                this.animationLoop(this.dead);
                this.hurtsound('audio/enemyDead.mp3');
                i++;
            }
            else if(!this.isDead()){
                this.animationLoop(this.swim);
            }
        }, 1000 / 5);
    }
}