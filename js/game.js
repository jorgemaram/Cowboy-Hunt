const gameApp = {
    name: 'Cowboy hunter',
    description: 'Canvas app for basic shapes controlling',
    version: '1.0.0',
    license: undefined,
    author: 'José Dorado y Jorge Martín',
    canvasTag: undefined,
    ctx: undefined,
    player: undefined,
    enemies: [],
    obstacles1: [],
    obstacles2: [],
    rocks: [],
    lives: 3,
    score: 0,
    frames: 0,
    gameOver: false,
    canvasSize: {
        w: 882,
        h: 600
    },
    mouse: {
        x: undefined,
        y: undefined,
    },

    init(id) {
        this.canvasTag = document.getElementById("myCanvas")
        this.ctx = this.canvasTag.getContext('2d')
        this.startBackground()
        this.createPlayer()
        this.checkCollision()
    },

    start() {
        this.startSound()
        this.reset()
        this.reset2()

        this.interval = setInterval(() => {
            this.frames++
            this.frames % 40 === 0 ? this.createEnemies() : null
            this.frames % 80 === 0 ? this.createEnemies() : null
            this.frames % 120 === 0 ? this.createObstacles() : null
            this.clearScreen()
            this.drawAll()
            this.checkCollision() ? this.gameFinished() : null
            this.score >= 500 ? this.winning() : null
        }, 70)
    },

    startSound() {
        document.getElementById('intro').play()
        document.getElementById('intro').volume = 0.2
    },

    shootingSound() {
        document.getElementById('shoot').play()
    },

    winningSound() {
        document.getElementById('intro').pause()
        document.getElementById('win').play()
        document.getElementById('win').volume = 1
    },

    losingSound() {
        document.getElementById('intro').pause()
        document.getElementById('lose').play()
        document.getElementById('lose').volume = 1
    },


    reset() {
        document.getElementById('restart-button').onclick = () => {
            this.clearScreen()
            this.clearLivesAndScores()
            document.getElementById('start-button').hidden = false
            this.startBackground();
            document.getElementById('restart-button').hidden = true
        };
    },

    reset2() {
        document.getElementById('restart-button2').onclick = () => {
            this.clearScreen()
            this.clearLivesAndScores()
            document.getElementById('start-button').hidden = false
            this.startBackground();
            document.getElementById('restart-button2').hidden = true
        };
    },

    drawAll() {
        this.clearScreen()
        this.createScore()
        this.createLives()
        this.obstacles1.forEach(elm => {
            elm.draw()
        })
        this.obstacles2.forEach(elm => {
            elm.draw()
        })
        this.enemies.forEach(elm => {
            elm.draw()
        })
        this.createRocks()
    },

    clearLivesAndScores() {
        this.lives = 3
        this.score = 0
        this.enemies = []
        this.obstacles1 = []
        this.obstacles2 = []
        this.ctx.clearRect(0, 0, this.canvasTag.width, this.canvasTag.height)
    },

    createEnemies() {
        const enemies1 = new Enemies(this.ctx, this.canvasSize, this.canvasSize.w - 100, this.canvasSize.h - 250, 100, 100, 2, 'Cowboy4.png', this.canvasSize.h - 285)
        const enemies2 = new Enemies(this.ctx, this.canvasSize, this.canvasSize.w - 860, this.canvasSize.h - 240, 100, 100, 3, 'Cowboy4.png', this.canvasSize.h - 285)
        const enemies3 = new Enemies(this.ctx, this.canvasSize, this.canvasSize.w - 390, this.canvasSize.h, 100, 100, 2, 'Cowboy4.png', this.canvasSize.h - 250)
        const enemies4 = new Enemies(this.ctx, this.canvasSize, this.canvasSize.w - 630, this.canvasSize.h - 180, 100, 100, 3, 'Cowboy4.png', this.canvasSize.h - 230)
        const enemigosLocales = [enemies1, enemies2, enemies3, enemies4]
        this.enemies.push(enemigosLocales[Math.floor(Math.random() * 4)])
    },

    createObstacles() {
        const randomX1 = Math.floor(Math.random() * (this.canvasSize.w - 0)) + 0
        const randomX2 = Math.floor(Math.random() * (this.canvasSize.w - 0)) + 0
        const randomSpeed1 = Math.floor(Math.random() * (10 - 1)) + 1
        const randomSpeed2 = Math.floor(Math.random() * (10 - 1)) + 1
        const obstacle1 = new Obstacle(this.ctx, this.canvasSize, randomX1, 0, 100, 100, randomSpeed1, 'Cowboy4_disparo.png')
        const obstacle2 = new Obstacle(this.ctx, this.canvasSize, randomX2, 0, 100, 100, randomSpeed2, 'Cowboy4_baile.png')
        this.obstacles1.push(obstacle1)
        this.obstacles2.push(obstacle2)
    },

    createRocks() {
        const rocks1 = new Rocks(this.ctx, this.canvasSize, 0, 0, 886, 748, 'fondo-vaquero-22.png')
        this.rocks.push(rocks1)
    },

    createPlayer() {
        this.player = new Player(this.canvasTag, this.ctx, 100, 100, this.canvasSize.w, this.canvasSize.h)
    },

    createScore() {
        this.ctx.fillStyle = 'black'
        this.ctx.font = '16px sans-serif'
        this.ctx.fillText(`Score: ${this.score}`, this.canvasSize.w - 150, 40)
    },

    createLives() {
        this.ctx.fillStyle = 'black'
        this.ctx.font = '16px sans-serif'
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvasSize.w - 250, 40)
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasTag.width, this.canvasTag.height)
    },

    generateRocks() {
        this.rocks.push(new Rocks(this.ctx, this.width, this.player.height, this.player.posY0))
    },

    gameFinished() {
        clearInterval(this.interval)
        this.losingSound()
        document.getElementById('restart-button').hidden = false
        document.getElementsByClassName('gameover-img')[0].hidden = false
        const end1 = document.querySelector('.gameover-img')
        this.ctx.drawImage(end1, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    startBackground() {
        const start1 = document.querySelector('.logo-img')
        this.ctx.drawImage(start1, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    winning() {
        clearInterval(this.interval)
        document.getElementById('restart-button2').hidden = false
        document.getElementsByClassName('gameover-img')[0].hidden = false
        this.winningSound()
        const winning = document.querySelector('.win-img')
        this.ctx.drawImage(winning, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    checkCollision() {
        document.getElementById('myCanvas').onclick = () => {
            this.shootingSound()
            this.enemies.forEach(enemy => {
                if (this.player.mousePos.x >= enemy.enemiesPos.x &&
                    this.player.mousePos.x <= (enemy.enemiesPos.x + enemy.enemiesSize.w) &&
                    this.player.mousePos.y >= enemy.enemiesPos.y &&
                    this.player.mousePos.y <= (enemy.enemiesPos.y + enemy.enemiesSize.h)
                ) {
                    this.enemies = this.enemies.filter(element => element != enemy)
                    this.score += 10
                }
            }
            )
            this.obstacles1.forEach(obstacle => {
                if (this.player.mousePos.x >= obstacle.obstaclePos.x &&
                    this.player.mousePos.x <= (obstacle.obstaclePos.x + obstacle.obstacleSize.w) &&
                    this.player.mousePos.y >= obstacle.obstaclePos.y &&
                    this.player.mousePos.y <= (obstacle.obstaclePos.y + obstacle.obstacleSize.h)

                ) {
                    this.obstacles1 = this.obstacles1.filter(element => element != obstacle)
                    this.obstacles1.shift()
                    if (this.lives === 3) {
                        this.score += 100
                    }
                    else {
                        this.lives++
                    }
                }
            })
            this.obstacles2.forEach(obstacle => {
                if (this.player.mousePos.x >= obstacle.obstaclePos.x &&
                    this.player.mousePos.x <= (obstacle.obstaclePos.x + obstacle.obstacleSize.w) &&
                    this.player.mousePos.y >= obstacle.obstaclePos.y &&
                    this.player.mousePos.y <= (obstacle.obstaclePos.y + obstacle.obstacleSize.h)

                ) {
                    this.obstacles2 = this.obstacles2.filter(element => element != obstacle)
                    this.obstacles2.shift()
                    if (this.lives > 0 && this.lives <= 3) {
                        this.lives--
                    }
                    else if (this.lives < 1) {
                        this.gameFinished()
                    }
                }
            })
        }
    }
}