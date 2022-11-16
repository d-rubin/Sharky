class Bottle extends MovableObject {
    width= 60;
    height= 60;

    constructor(path) {
        super().loadImage(path);
        this.x =  300 + Math.random() * 1200;
        this.y = 350 + Math.random() * 80;
    }
    

}