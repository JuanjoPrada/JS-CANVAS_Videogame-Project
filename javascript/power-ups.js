class PowerUp {
    constructor(ctx, canvas, background, player) {
        this.ctx = ctx
        this.background = background
        this.player = player
        this.canvas = canvas
        this.wScale = 1

        this.type = this.setType()

        this.setSkin()

        this.h = this.setSize().powerupH
        this.w = this.setSize().powerupW

        this.posX = canvas.w
        this.posY = this.setPosY()
        this.speedX = this.background.speedX //8 //a decidir

        this.flash = 0
    }

    //Tipos de powerups:
    //Type A => donuts
    //Type B => cerveza duff
    //Type C => krusty-burgers

    setType() {
        const randomSpawnType = Math.floor(Math.random() * 3)
        let randomType = ''
        switch (randomSpawnType) {
            case 0:
                randomType = 'A'
                break;
            case 1:
                randomType = 'B'
                break;
            case 2:
                randomType = 'C'
                break
        }
        return randomType
    }

    setSkin() {
        this.skin = new Image()
        this.skinFlash = new Image()
        switch (this.type) {
            case 'A':
                this.skin.src = 'images/powerups/donut.png'
                this.skinFlash.src = 'images/powerups/donutFlash.png'
                this.wScale = 1
                break
            case 'B':
                this.skin.src = 'images/powerups/duffBeer.png'
                this.skinFlash.src = 'images/powerups/duffBeerFlash.png'
                this.wScale = 0.5513
                break
            case 'C':
                this.skin.src = 'images/powerups/ribwich.png'
                this.skinFlash.src = 'images/powerups/ribwichFlash.png'
                this.wScale = 1.3336
                break
        }
    }

    setSize() {
        let dimensionsByType = {
            powerupH: 0,
            powerupW: 0
        }
        switch (this.type) {
            case 'A':
                dimensionsByType.powerupH = this.player.initialH / 3 //a decidir
                dimensionsByType.powerupW = dimensionsByType.powerupH * this.wScale
                break
            case 'B':
                dimensionsByType.powerupH = this.player.initialH / 3 //en funcion del background o player //a decidir
                dimensionsByType.powerupW = dimensionsByType.powerupH * this.wScale
                break
            case 'C':
                dimensionsByType.powerupH = this.player.initialH / 3.2 //en funcion del background o player //a decidir
                dimensionsByType.powerupW = dimensionsByType.powerupH * this.wScale
                break
        }
        return dimensionsByType
    }

    setPosY() {
        const randomSpawnPosY_MIN = this.background.boundaryTop
        const randomSpawnPosY_MAX = this.background.boundaryBottom - this.h
        const randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX + 1 - randomSpawnPosY_MIN) + randomSpawnPosY_MIN)
        return randomSpawnPosY
    }

    draw() {  
        this.ctx.drawImage(this.skin, this.posX, this.posY, this.w, this.h)
        this.drawFlash()
        this.move()
    }

    drawFlash() {
        this.flash++
        if (this.flash > (this.speedX * 2)) {
            this.ctx.drawImage(this.skinFlash, this.posX, this.posY, this.w, this.h)
            this.flash = 0
        }
    }

    move() {
        this.posX -= this.speedX
    }
}