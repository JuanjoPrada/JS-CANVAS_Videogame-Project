const game = {
    name: 'HTML5 Canvas Game',
    description: 'SimpsonsGame',
    authors: ['Juanjo', 'Willy'],
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,

    FPS: 60,
    framesCounter: 0,
    canvas: {
        w: undefined,
        h: undefined
    },

    background: undefined,
    statusbar: undefined,
    player: undefined,
    enemies: undefined,
    powerups: undefined,

    init() {
        this.canvasDOM = document.querySelector('#game-canvas')
        this.ctx = this.canvasDOM.getContext('2d')
        
        this.deathScreen = new Image()
        this.deathScreen.src = 'images/screens/deathScreen.png'
        this.winScreenAlt = new Image()
        this.winScreenAlt.src = 'images/screens/winScreenAlt.png'

        this.setSizeAndPosition()
    },

    setSizeAndPosition() {
        this.canvas = {
            w: window.innerWidth * 0.75,
            h: (window.innerWidth * 0.75) / 2
        }
        this.canvasDOM.setAttribute('width', this.canvas.w)
        this.canvasDOM.setAttribute('height', this.canvas.h)
    },

    start() {
        this.reset()

        this.interval = setInterval(() => {

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            this.clear()

            this.drawBackground()

            this.drawPowerups()
            this.spawnRandomPowerup()

            this.drawEnemies()
            this.spawnRandomEnemy()

            this.drawPlayer()

            this.clearEnvironment()

            this.isEnemyCollision()
            this.isPowerupCollision()

            this.updateStatusbar()

        }, 1000 / this.FPS)
    },

    reset() {
        this.intervalStop()
        this.background = new Background(this.ctx, this.canvas)
        this.player = new Player(this.ctx, this.canvas, this.background, this.enemies, this.powerups)
        this.enemies = []
        this.powerups = []
        this.statusbar = new StatusBar(this.ctx, this.canvas, this.background, this.player, this.enemies, this.powerups)
    },

    updateStatusbar() {
        this.statusbar.update()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.w, this.canvas.h)
    },

    drawBackground() {
        this.background.draw()
    },

    drawPlayer() {
        this.player.draw()
    },

    drawEnemies() {
        this.enemies.forEach(enemy => enemy.draw())
    },

    spawnRandomEnemy() {
        const randomSpawnTime_MIN = 50 //a decidir
        const randomSpawnTime_MAX = 100 //a decidir
        const randomSpawnTime = Math.floor(Math.random() * (randomSpawnTime_MAX + 1 - randomSpawnTime_MIN) + randomSpawnTime_MIN)
        if (this.framesCounter % randomSpawnTime === 0) {
            this.enemies.push(new Enemy(this.ctx, this.canvas, this.background, this.player))
        }
    },

    drawPowerups() {
        this.powerups.forEach(powerup => powerup.draw())
    },

    spawnRandomPowerup() {
        const randomSpawnTime_MIN = 210 //a decidir
        const randomSpawnTime_MAX = 360 //a decidir
        const randomSpawnTime = Math.floor(Math.random() * (randomSpawnTime_MAX + 1 - randomSpawnTime_MIN) + randomSpawnTime_MIN)
        if (this.framesCounter % randomSpawnTime === 0) {
            this.powerups.push(new PowerUp(this.ctx, this.canvas, this.background, this.player))
        }
    },

    clearEnvironment() {
        this.enemies = this.enemies.filter(enemy => (enemy.posX + enemy.w) >= 0)
        this.powerups = this.powerups.filter(powerup => powerup.posX >= 0)
    },

    isEnemyCollision() {
        this.enemies.forEach(elm => {
            if (
                this.player.posX + this.player.w >= elm.posX &&
                this.player.posY + this.player.h >= elm.posY &&
                this.player.posX <= elm.posX + elm.w &&
                this.player.posY <= elm.posY + elm.h
            ) {
                this.player.enemyCollision(elm)
            } else null
        })
    },

    isPowerupCollision() {
        this.powerups.forEach(elm => {
            if (
                this.player.posX + this.player.w >= elm.posX &&
                this.player.posY + this.player.h >= elm.posY &&
                this.player.posX <= elm.posX + elm.w &&
                this.player.posY <= elm.posY + elm.h
            ) {
                this.player.powerupPickup(elm)
            } else null
        })
    },

    winProtocol() {
        console.log('YOU WIN!')
        this.intervalStop()
        setTimeout(() => {
            this.ctx.drawImage(this.winScreenAlt, 0, 0, this.canvas.w, this.canvas.h)
        }, this.player.invincibilityDuration)
    },

    deathProtocol() {
        console.log('GAME OVER...')
        this.intervalStop()
        setTimeout(() => {
            this.ctx.drawImage(this.deathScreen, 0, 0, this.canvas.w, this.canvas.h)
        }, this.player.invincibilityDuration)
    },

    intervalStop() {
        clearInterval(this.interval)
        console.log('Game stopped.')
    }

}