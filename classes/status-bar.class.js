class StatusBar extends DrawableObject {

    percentage;
    constructor(array, percentage, y, x) {
        super().loadImages(array);
        this.array = array;
        this.x = x;
        this.y = y;
        this.width = 250;
        this.height = 50;
        this.setPercentage(percentage);
    }

    // Chooses witch Image is Displayed
    setPercentage(percentage) {
        this.percentage = percentage;
            let path = this.array[this.resolveImageIndex()];
            this.img = this.imageCache[path];
    }


    // Checks how much Life is left
    resolveImageIndex() {
        if(this.percentage >= 10) {
            return 5;
        }
        else if (this.percentage > 8) {
            return 4;
        }
        else if (this.percentage > 6) {
            return 3;
        }
        else if(this.percentage > 4) {
            return 2;
        }
        else if(this.percentage > 2) {
            return 1;
        }
        else {
            return 0;
        }
    }

    moveLeft(){
        setInterval(() => {
            if(!world.level.enemies[11].isDead()) {
            this.x -= 0.2;
            }
        }, 1000 / 30);
    }

}