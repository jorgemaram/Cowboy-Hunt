class Enemies {
    constructor(ctx, canvasSize, posX, posY, enemiesWidth, enemiesHeight, speed, image, finalHeight) {
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.enemiesPos = {
            x: posX,
            y: posY
        }
        this.enemiesSize = {
            w: enemiesWidth,
            h: enemiesHeight
        }
        this.speed = speed
        this.imageName = image
        this.ctx = ctx
        this.imageInstance = undefined
        this.finalHeight = finalHeight

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.imageName}`
        this.draw()
    }

    draw() {
        this.moveEnemies()
        this.ctx.drawImage(this.imageInstance, this.enemiesPos.x, this.enemiesPos.y, this.enemiesSize.w, this.enemiesSize.h)
    }

    moveEnemies() {
        if (this.finalHeight <= this.enemiesPos.y) {
            this.speed += 1
        }
        else {
            this.enemiesPos.y = this.finalHeight
        }
        this.enemiesPos.y -= this.speed
    }

    animate() {
        if (framesCounter % 25 == 0) {
            this.images.framesCounter++;
        }

        if (this.images.framesIndex > this.images.frames - 5) {
            this.images.framesIndex = 0
        }
    }

}

class Obstacle {
    constructor(ctx, canvasSize, posX, posY, obstacleWidth, obstacleHeight, speed, image) {
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.obstaclePos = {
            x: posX,
            y: posY
        }
        this.obstacleSize = {
            w: obstacleWidth,
            h: obstacleHeight
        }
        this.speed = speed
        this.imageName = image
        this.ctx = ctx
        this.imageInstance = undefined
        this.init()
    }
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.imageName}`
    }
    draw() {
        this.moveObstacle()
        this.ctx.drawImage(this.imageInstance, this.obstaclePos.x, this.obstaclePos.y, this.obstacleSize.w, this.obstacleSize.h)
    }
    moveObstacle() {
        if (this.obstaclePos.y >= this.canvasSize.w - this.obstacleSize.w || this.obstaclePos.y < 0) {
            this.speed *= 1
        }

        this.obstaclePos.y += this.speed
    }
}

class badObstacle extends Obstacle {
    constructor(ctx, canvasSize, posX, posY, obstacleWidth, obstacleHeight, speed, image) {
        super(ctx, canvasSize, posX, posY, obstacleWidth, obstacleHeight, speed, image)
    
    
    }

}
class goodObstacle extends Obstacle {
    constructor(ctx, canvasSize, posX, posY, obstacleWidth, obstacleHeight, speed, image) {
        super(ctx, canvasSize, posX, posY, obstacleWidth, obstacleHeight, speed, image)


    }

}

