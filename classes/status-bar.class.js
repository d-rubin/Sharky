class StatusBar extends DrawableObject {

    percentage;
    constructor(array, percentage, y) {
        super().loadImages(array);
        this.array = array;
        this.x = 10;
        this.y = y;
        this.width = 350;
        this.height = 100;
        this.setPercentage(percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
            let path = this.array[this.resolveImageIndex()];
            this.img = this.imageCache[path];
    }

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

}