class Player {
    constructor(ctx, canvas, background, enemies, powerups) {
        this.ctx = ctx
        this.canvas = canvas
        this.background = background
        this.enemies = enemies
        this.powerups = powerups

        this.init()

        this.initialW = this.background.roadHeight / 4 //a decidir
        this.initialH = this.initialW * 1.1588 //!!! //a decidir
        this.w = this.initialW
        this.h = this.initialH

        this.minW = this.initialW * 0.75 //a decidir
        this.minH = this.initialH * 0.75 //a decidir

        this.ph0MinW = this.minW //a decidir
        this.ph0MinH = this.minH //a decidir

        this.ph1MinW = this.initialW //a decidir
        this.ph1MinH = this.initialH //a decidir

        this.ph2MinW = this.initialW * 1.5 //a decidir
        this.ph2MinH = this.initialH * 1.5 //a decidir

        this.ph3MinW = this.initialW * 2 //a decidir
        this.ph3MinH = this.initialH * 2 //a decidir

        this.ph4MinW = this.initialW * 2.5 //a decidir
        this.ph4MinH = this.initialH * 2.5 //a decidir

        this.ph5MinW = this.initialW * 3 //a decidir
        this.ph5MinH = this.initialH * 3 //a decidir

        this.ph6MinW = this.initialW * 3.5 //a decidir
        this.ph6MinH = this.initialH * 3.5 //a decidir

        this.maxW = this.initialW * 4 //a decidir
        this.maxH = this.initialH * 4 //a decidir

        this.phase = 1

        this.growthRate = 1 + 0.075 // a decidir
        this.minGrowthRate = 1 + 0.025 //a decidir

        this.initialPosX = this.initialW //a decidir
        this.initialPosY = this.background.boundaryTop + this.background.boardwalkHeight + (this.background.roadHeight / 2) - this.h
        this.posX = this.initialPosX
        this.posY = this.initialPosY

        this.speed = this.background.speedX * 3 // a decidir
        this.speedY = this.speed * 2
        this.speedXGoRight = this.speed / 2
        this.speedXGoLeft = this.speed * 2
        this.speedXReturnLFromR = this.background.speedX
        this.speedXReturnRFromL = this.speedXGoRight / 2

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

        this.deadImg = new Image()
        this.deadImg.src = 'images/player/phaseDead/phDead.png'
        this.deadImgFlash = new Image()
        this.deadImgFlash.src = 'images/player/phaseDead/phDeadFlash.png'
        this.deadWScale = 1.4901

        this.ph0Img = new Image()
        this.ph0Img.src = 'images/player/phase0/ph0.png'
        this.ph0ImgFlash = new Image()
        this.ph0ImgFlash.src = 'images/player/phase0/ph0Flash.png'
        this.ph0WScale = 0.8617

        this.ph1Img = new Image()
        this.ph1Img.src = 'images/player/phase1/ph1.png'
        this.ph1ImgFlash = new Image()
        this.ph1ImgFlash.src = 'images/player/phase1/ph1Flash.png'
        this.ph1WScale = 0.9042

        this.ph2Img = new Image()
        this.ph2Img.src = 'images/player/phase2/ph2.png'
        this.ph2ImgFlash = new Image()
        this.ph2ImgFlash.src = 'images/player/phase2/ph2Flash.png'
        this.ph2WScale = 0.9312

        this.ph3Img = new Image()
        this.ph3Img.src = 'images/player/phase3/ph3.png'
        this.ph3ImgFlash = new Image()
        this.ph3ImgFlash.src = 'images/player/phase3/ph3Flash.png'
        this.ph3WScale = 0.9032 //0.7032

        this.ph4Img = new Image()
        this.ph4Img.src = 'images/player/phase4/ph4.png'
        this.ph4ImgFlash = new Image()
        this.ph4ImgFlash.src = 'images/player/phase4/ph4Flash.png'
        this.ph4WScale = 0.9881

        this.ph5Img = new Image()
        this.ph5Img.src = 'images/player/phase5/ph5.png'
        this.ph5ImgFlash = new Image()
        this.ph5ImgFlash.src = 'images/player/phase5/ph5Flash.png'
        this.ph5WScale = 0.9 //1.1769 

        this.phBlobImg = new Image()
        this.phBlobImg.src = 'images/player/phase8108/ph8108.png'
        this.phBlobImgFlash = new Image()
        this.phBlobImgFlash.src = 'images/player/phase8108/ph8108Flash.png'
        this.phBlobWScale = 0.9 //0.7934 
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
            //dead
            this.phase = -1
            this.skin = this.deadImg
            this.skinFlash = this.deadImgFlash
            this.w = this.h * this.deadWScale
            this.invincibility = false
            game.deathProtocol()

            //--------------
        } else if (this.isPhaseX(this.ph1MinH, this.ph1MinW, this.ph0MinH, this.ph0MinW)) {
            //phase 0
            this.phase = 0
            this.skin = this.ph0Img
            this.skinFlash = this.ph0ImgFlash
            this.w = this.h * this.ph0WScale
            //--------------
        } else if (this.isPhaseX(this.ph2MinH, this.ph2MinW, this.ph1MinH, this.ph1MinW)) {
            //initial phase 1
            this.phase = 1
            this.skin = this.ph1Img
            this.skinFlash = this.ph1ImgFlash
            this.w = this.h * this.ph1WScale
            //--------------
        } else if (this.isPhaseX(this.ph3MinH, this.ph3MinW, this.ph2MinH, this.ph2MinW)) {
            //phase 2
            this.phase = 2
            this.skin = this.ph2Img
            this.skinFlash = this.ph2ImgFlash
            this.w = this.h * this.ph2WScale
            //--------------
        } else if (this.isPhaseX(this.ph4MinH, this.ph4MinW, this.ph3MinH, this.ph3MinW)) {
            //phase 3
            this.phase = 3
            this.skin = this.ph3Img
            this.skinFlash = this.ph3ImgFlash
            this.w = this.h * this.ph3WScale
            //--------------
        } else if (this.isPhaseX(this.ph5MinH, this.ph5MinW, this.ph4MinH, this.ph4MinW)) {
            //phase 4
            this.phase = 4
            this.skin = this.ph4Img
            this.skinFlash = this.ph4ImgFlash
            this.w = this.h * this.ph4WScale
            //--------------
        } else if (this.isPhaseX(this.ph6MinH, this.ph6MinW, this.ph5MinH, this.ph5MinW)) {
            //phase 5
            this.phase = 5
            this.skin = this.ph5Img
            this.skinFlash = this.ph5ImgFlash
            this.w = this.h * this.ph5WScale
            //--------------
        } else if (this.isPhaseX(this.maxH, this.maxW, this.phBlobMinH, this.phBlobMinW)) {
            //phase 6 Blob
            this.phase = 6
            this.skin = this.phBlobImg
            this.skinFlash = this.phBlobImgFlash
            this.w = this.h * this.phBlobWScale
            //--------------
        }

        this.ctx.drawImage(this.skin, this.posX, this.posY, this.w, this.h)

        if (this.invincibility) {
            this.drawFlash()
        }
    }

    drawFlash() {
        if (this.flash >= 1) {
            this.ctx.drawImage(this.skinFlash, this.posX, this.posY, this.w, this.h) //aqui ira un homer blanco o trasparente
            this.flash = 0
        } else this.flash += this.flashDuration
    }

    move(direction, movSpeed) {
        switch (direction) {
            case 'up':
                if (this.boundaryCollisionDetection() !== 'Top') {
                    this.posY -= movSpeed
                } else {
                    this.posY = this.background.boundaryTop + (this.background.boardwalkHeight * 0.6667) - this.h
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
                } else {
                    this.posX = this.background.boundaryLeft
                }
                break
            case 'right':
                if (this.boundaryCollisionDetection() !== 'Right') {
                    this.posX += movSpeed
                    this.moveLtoCenterFromR = false
                } else {
                    this.posX = this.background.boundaryRight - this.w
                }
                break
        }
    }

    goToCenter() {
        if (this.posX > this.initialPosX && this.moveLtoCenterFromR) {
            if (this.posX > this.initialPosX) this.posX -= this.speedXReturnLFromR
            if (this.posX <= this.initialPosX) this.posX = this.initialPosX
        }
        if (this.posX < this.initialPosX && this.moveRtoCenterFromL) {
            if (this.posX < this.initialPosX) this.posX += this.speedXReturnRFromL
            if (this.posX >= this.initialPosX) this.posX = this.initialPosX
        }
    }

    returnFromTopOrBottom() {
        if ((this.posY + this.h) < (this.background.boundaryTop + (this.background.boardwalkHeight * 0.6667))) {
            this.posY = this.background.boundaryTop + (this.background.boardwalkHeight * 0.6667) - this.h
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
        if ((this.posY + this.h - this.speedY) < (this.background.boundaryTop + (this.background.boardwalkHeight * 0.6667))) {
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
        } else if (this.phase === 3) {
            if (enemy.type === 'A' || enemy.type === 'B' || enemy.type === 'C+' || enemy.type === 'C-') {
                game.enemies.splice(game.enemies.indexOf(enemy), 1)
                this.grow(this.minGrowthRate)
            } else {
                if (!this.invincibility) {
                    this.enemyDmg()
                }
            }
        } else if (this.phase === 4) {
            if (enemy.type === 'A' || enemy.type === 'B' || enemy.type === 'C+' || enemy.type === 'C-' || enemy.type === 'D') {
                game.enemies.splice(game.enemies.indexOf(enemy), 1)
                this.grow(this.minGrowthRate)
            } else {
                if (!this.invincibility) {
                    this.enemyDmg()
                }
            }
        } else if (this.phase === 5) {
            if (enemy.type === 'A' || enemy.type === 'B' || enemy.type === 'C+' || enemy.type === 'C-' || enemy.type === 'D' || enemy.type === 'EUp' || enemy.type === 'EDown') {
                game.enemies.splice(game.enemies.indexOf(enemy), 1)
                this.grow(this.minGrowthRate)
            } else {
                if (!this.invincibility) {
                    this.enemyDmg()
                }
            }
        } else if (this.phase === 6) {
            if (enemy.type === 'A' || enemy.type === 'B' || enemy.type === 'C+' || enemy.type === 'C-' || enemy.type === 'D' || enemy.type === 'EUp' || enemy.type === 'EDown' || enemy.type === 'Z') {
                if (enemy.type === 'Z') {
                    game.enemies.splice(game.enemies.indexOf(enemy), 1)
                    game.winProtocol()
                } else {
                    game.enemies.splice(game.enemies.indexOf(enemy), 1)
                    this.grow(this.minGrowthRate)
                }
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
}