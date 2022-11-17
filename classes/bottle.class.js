class Bottle extends MovableObject {
    width= 60;
    height= 60;

    /**
     * Construct a Bottle random in the Sand
     * @param {string} path - relative Path of the Img
     */
    constructor(path) {
        super().loadImage(path);
        this.x =  300 + Math.random() * 1200;
        this.y = 350 + Math.random() * 80;
    }
    

}