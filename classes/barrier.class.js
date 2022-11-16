class Barrier extends MovableObject {
    y = 230;
    width = 300;
    height = 250;

    constructor(imagePath) {
        super().loadImage(imagePath);

        this.x = 300 + Math.random() * 300; // Zahl zwischen 300 und 600
        this.animate();
    }

    // Verringert x mit 60 Fps
    animate() {
        this.moveLeft();
    }
}