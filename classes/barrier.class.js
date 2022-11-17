class Barrier extends MovableObject {
    y = 230;
    width = 300;
    height = 250;

    constructor(imagePath) {
        super().loadImage(imagePath);

        this.x = 300 + Math.random() * 300;
        this.animate();
    }

    // Verringert x mit 30 Fps
    animate() {
        this.moveLeft();
    }
}