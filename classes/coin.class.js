class Coin extends MovableObject {
    width = 60;
    height = 60;

    constructor() {
        super().loadImage('img/4. Marcadores/1. Coins/4.png');
        this.x = 300 + Math.random() * 1100;
        this.y = 30 + Math.random() * 320;    
    }
}