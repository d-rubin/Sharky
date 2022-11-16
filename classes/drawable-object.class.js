class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 120;
    width= 150;
    height= 150;


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    drawBorder(ctx) {

        if(this instanceof Character || this instanceof Jellyfish || this instanceof Barrier || this instanceof Boss || this instanceof Pufferfish) {
        ctx.beginPath();
        ctx.linewidth = "5";
        ctx.strokeStyle = "black";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }
}