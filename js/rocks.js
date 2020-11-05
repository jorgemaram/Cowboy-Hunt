class Rocks {
    constructor(ctx, canvasSize, posX, posY, rocksWidth, rocksHeight, image) {
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.rocksPos = {
            x: posX,
            y: posY
        }
        this.rocksSize = {
            w: rocksWidth,
            h: rocksHeight
        }

        this.imageName = image,
        this.ctx = ctx,
        this.imageInstance = undefined,
            
        this.init()
        
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.imageName}`
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.rocksPos.x, this.rocksPos.y, this.rocksSize.w, this.rocksSize.h)
    }
}