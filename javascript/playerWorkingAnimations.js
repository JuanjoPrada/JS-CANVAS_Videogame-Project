class Player {
    constructor(ctx, canvas, background, enemies, powerups) {
        this.ctx = ctx
        this.canvas = canvas
        this.background = background
        this.enemies = enemies
        this.powerups = powerups

        this.init()

        this.initialW = this.background.roadHeight / 3 //a decidir
        this.initialH = this.initialW * 1.1588 //!!! //a decidir
        this.w = this.initialW
        this.h = this.initialH

        this.minW = this.initialW / 2 //a decidir
        this.minH = this.initialH / 2 //a decidir

        this.ph0MinW = this.minW //a decidir
        this.ph0MinH = this.minH //a decidir

        this.ph1MinW = this.initialW //a decidir
        this.ph1MinH = this.initialH //a decidir

        this.ph2MinW = this.initialW * 2 //a decidir
        this.ph2MinH = this.initialH * 2 //a decidir

        this.maxW = this.initialW * 3 //a decidir
        this.maxH = this.initialH * 3 //a decidir

        this.phase = 1

        this.growthRate = 1 + 0.1 // a decidir
        this.minGrowthRate = 1 + 0.05 //a decidir

        this.initialPosX = this.initialW //a decidir
        this.initialPosY = this.background.boundaryTop + this.background.boardwalkHeight + (this.background.roadHeight / 2) - this.h
        this.posX = this.initialPosX
        this.posY = this.initialPosY

        this.speedY = this.background.speedX * 5 //a decidir 3
        this.speedXGoRight = this.background.speedX * 2 //0.75 //a decidir
        this.speedXGoLeft = this.background.speedX * 3 //2 //a decidir
        this.speedXReturnLFromR = this.background.speedX
        this.speedXReturnRFromL = this.speedXGoRight * 0.25

        this.moveLtoCenterFromR = false
        this.moveRtoCenterFromL = false

        this.invincibility = false //activalo manualmente para dar invencibilidad infinita
        this.invincibilityDuration = 1500 //a decidir
        this.flash = 0
        this.flashDuration = 0.5 //a decidir

        this.enemyTouched = undefined
        this.powerupTouched = undefined
        this.powerupsPickedUp = 0
    }

    init() {
        this.setListeners()
        // this.deadImg = new Image()
        // this.deadImg.src = 'images/player/phase1/dead.png'
        // this.phase0Img = new Image()
        // this.phase0Img.src = ''
        this.phase1Image = new Image()
        this.phase1Image.src = 'images/player/phase1/ph1_walkForward.png'
        this.phase1Image.frames = 7
        this.phase1Image.framesIndex = 0
        this.phase1ImageBack = new Image()
        this.phase1ImageBack.src = 'images/player/phase1/ph1_walkBackward.png'
        this.phase1ImageBack.frames = 7
        this.phase1ImageBack.framesIndex = 0
        this.phase1ImageStanding = new Image()
        this.phase1ImageStanding.src = 'images/player/phase1/ph1_standing.png'
        this.phase1ImageStanding.frames = 1
        this.phase1ImageStanding.framesIndex = 0
        // this.phase2Img = new Image()
        // this.phase2Img.src = ''
    }

    setListeners() {
        document.onkeydown = e => {
            e.key === 'ArrowUp' ? this.move('up', this.speedY) : null
            e.key === 'ArrowDown' ? this.move('down', this.speedY) : null
            e.key === 'ArrowLeft' ? this.move('left', this.speedXGoLeft) : null
            e.key === 'ArrowRight' ? this.move('right', this.speedXGoRight) : null
            //e.key === 'SpaceBar' ? this.spaceAction() : null
            //como añadir movimiento diagonal en caso de dos key presses?
        }
        document.onkeyup = e => {
            e.key === 'ArrowRight' ? this.moveLtoCenterFromR = true : null
            e.key === 'ArrowLeft' ? this.moveRtoCenterFromL = true : null
        }
        //-----?????
        window.addEventListener('keydown', function (e) {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
                e.preventDefault()
            }
        }, false)
        //-----?????
    }

    draw() {
        this.goToCenter()

        this.returnFromTopOrBottom()

        if (this.isPhaseX(this.minH, this.minW)) { //a decidir
            this.phase = -1
            console.log('GAME OVER')
            this.invincibility = false
            this.ctx.drawImage(this.phase1Img, this.posX, this.posY, this.h, this.w)
            this.ctx.fillStyle = 'red'
            this.ctx.strokeRect(this.posX, this.posY, this.h, this.w)
            game.intervalStop()
        } else if (this.isPhaseX(this.ph1MinH, this.ph1MinW, this.ph0MinH, this.ph0MinW)) { //a decidir
            this.phase = 0
            this.ctx.drawImage(this.phase1Image, this.posX, this.posY, this.w, this.h)
            this.ctx.fillStyle = 'pink'
            this.ctx.strokeRect(this.posX, this.posY, this.w, this.h)
        } else if (this.isPhaseX(this.ph2MinH, this.ph2MinW, this.ph1MinH, this.ph1MinW)) { //a decidir
            this.phase = 1
            //this.ctx.drawImage(this.phase1Img, this.posX, this.posY, this.w, this.h)
                this.animate(this.phase1Image, this.background.speedX)
        } else if (this.isPhaseX(this.maxH, this.maxW, this.ph2MinH, this.ph2MinW)) { //a decidir
            this.phase = 2
            this.ctx.drawImage(this.phase1Img, this.posX, this.posY, this.w, this.h)
            this.ctx.fillStyle = 'green'
            this.ctx.strokeRect(this.posX, this.posY, this.w, this.h)
        }

        if (this.invincibility) {
            if (this.flash >= 1) {
                this.ctx.strokeRect(this.posX, this.posY, this.w, this.h) //aqui ira un homer blanco o trasparente
                this.flash = 0
            } else this.flash += this.flashDuration
        }
    }


    move(direction, movSpeed) {
        switch (direction) {
            case 'up':
                if (this.boundaryCollisionDetection() !== 'Top') {
                    this.posY -= movSpeed
                } else {
                    this.posY = this.background.boundaryTop + (this.h / 3) - this.h
                }
                break
            case 'down':
                if (this.boundaryCollisionDetection() !== 'Bottom') {
                    this.posY += movSpeed
                } else {
                    this.posY = this.background.boundaryBottom - this.h
                }
                break
            case 'left':
                if (this.boundaryCollisionDetection() !== 'Left') {
                    this.posX -= movSpeed
                    this.moveRtoCenterFromL = false
                    this.animate(this.phase1ImageBack)
                } else {
                    this.posX = this.background.boundaryLeft
                }
                break
            case 'right':
                if (this.boundaryCollisionDetection() !== 'Right') {
                    this.posX += movSpeed
                    this.moveLtoCenterFromR = false
                    this.animate(this.phase1Image)
                } else {
                    this.posX = this.background.boundaryRight - this.w
                }
                break
        }
    }

    goToCenter() {
        if (this.posX > this.initialPosX && this.moveLtoCenterFromR) {
            if (this.posX > this.initialPosX) {
                this.posX -= this.speedXReturnLFromR
                this.animate(this.phase1ImageStanding, this.background.speedX)
            }
            if (this.posX <= this.initialPosX) this.posX = this.initialPosX
        }
        if (this.posX < this.initialPosX && this.moveRtoCenterFromL) {
            if (this.posX < this.initialPosX) this.posX += this.speedXReturnRFromL
            if (this.posX >= this.initialPosX) this.posX = this.initialPosX
        }
    }

    returnFromTopOrBottom() {
        if ((this.posY + this.h) < (this.background.boundaryTop + (this.h / 3))) {
            this.posY = this.background.boundaryTop + (this.h / 3) - this.h
        }
        if ((this.posY + this.h + this.speedY) > this.background.boundaryBottom) {
            this.posY = this.background.boundaryBottom - this.h
        }
    }

    spaceAction() {
        console.log('space pressed')
    }

    boundaryCollisionDetection() {
        let collisionDirection = ''
        if ((this.posY + this.h - this.speedY) < (this.background.boundaryTop + (this.h / 3))) {
            collisionDirection = 'Top'
        }
        if ((this.posY + this.h + this.speedY) > this.background.boundaryBottom) {
            collisionDirection = 'Bottom'
        }
        if ((this.posX - this.speedXGoLeft) < this.background.boundaryLeft) {
            collisionDirection = 'Left'
        }
        if ((this.posX + this.w + this.speedXGoRight) > this.background.boundaryRight) {
            collisionDirection = 'Right'
        }
        return collisionDirection
    }

    enemyCollision(enemy) {
        this.enemyTouched = enemy
        if (this.phase === 0) {
            if (!this.invincibility) {
                this.enemyDmg()
            }
        } else if (this.phase === 1) {
            if (enemy.type === 'A') {
                game.enemies.splice(game.enemies.indexOf(enemy), 1)
                this.grow(this.minGrowthRate)
            } else {
                if (!this.invincibility) {
                    this.enemyDmg()
                }
            }
        } else if (this.phase === 2) {
            if (enemy.type === 'A' || enemy.type === 'B') {
                game.enemies.splice(game.enemies.indexOf(enemy), 1)
                this.grow(this.minGrowthRate)
            } else {
                if (!this.invincibility) {
                    this.enemyDmg()
                }
            }
        }
    }

    enemyDmg() {
        this.invincibility = true
        this.flash = 1
        this.interval = setTimeout(() => {
            this.invincibility = false
            this.flash = 0
        }, this.invincibilityDuration)

        this.shrink()
    }

    powerupPickup(powerup) {
        game.powerups.splice(game.powerups.indexOf(powerup), 1)
        this.powerupTouched = powerup
        this.grow()
        this.powerupsPickedUp++
    }

    shrink() {
        this.posY += this.h - (this.h / this.growthRate)
        this.h /= this.growthRate
        this.w /= this.growthRate
    }

    grow(growthRate = this.growthRate) {
        if (
            (this.h * growthRate) < this.maxH ||
            (this.w * growthRate) < this.maxW
        ) {
            this.posY -= (this.h * growthRate) - this.h
            this.h *= growthRate
            this.w *= growthRate
        } else {
            this.posY -= this.maxW - this.h
            this.h = this.maxH
            this.w = this.maxW
        }
    }

    isPhaseX(phaseXPlus1MinH, phaseXPlus1MinW, phaseXMinH = 0, phaseXMinW = 0) {
        return (this.h >= phaseXMinH &&
                this.h < phaseXPlus1MinH) ||
            (this.w >= phaseXMinW &&
                this.w < phaseXPlus1MinW)
    }

    animate(imageToAnimate = this.phase1Image, animationSpeed = 1) {
        this.ctx.drawImage(
            imageToAnimate, //imagen
            imageToAnimate.framesIndex * Math.floor(imageToAnimate.width / imageToAnimate.frames), //
            0, // recorte en y
            Math.floor(imageToAnimate.width / imageToAnimate.frames), //ancho de recorte
            imageToAnimate.height, //alto de recorte
            this.posX,
            this.posY,
            this.w,
            this.h
        )
        if (game.framesCounter % animationSpeed === 0) {
            imageToAnimate.framesIndex++;
        }
        switch (this.phase) {
            case 1:
                if (imageToAnimate.framesIndex >= imageToAnimate.frames) {
                    imageToAnimate.framesIndex = 0;
                }
                break
        }
    }
}