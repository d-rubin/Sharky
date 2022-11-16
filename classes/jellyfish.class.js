class Jellyfish extends MovableObject{
    width = 80;
    height = 80;

    

    constructor(swim, dead) {
        super();
        this.loadImages(swim);
        this.loadImages(dead);
        this.dead = dead;
        this.swim = swim;
        // Jellyfish wird zufällig zwischen 300 und 1500 Pixeln auf x erstellt
        this.x = 300 + Math.random() * 1100;
        // Jellyfish wird zufällig zwischen 30 und 350 Pixeln auf y erstellt
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
        }, 1000 / 60);
    }

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