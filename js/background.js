class Background {
    constructor(ctx, backgroundWidth, backgroundHeight, backgroundImage) {
        this.ctx = ctx

        this.backgroundSize = {
            w: backgroundWidth,
            h: backgroundHeight
        }

        this.image = backgroundImage,
            this.backgroundInstance = undefined
    }

    draw() {
        this.ctx.backgroundImage(this.image, this.backgroundWidth, this.backgroundHeight);
    }


    init() {
        this.backgroundInstance = new Image()
        this.backgroundInstance.src = `images/${this.imageName}`
    }

}
