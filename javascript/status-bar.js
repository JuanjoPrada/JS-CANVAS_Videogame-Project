class StatusBar {
    constructor(ctx, canvas, background, player, enemies, powerups) {
        this.ctx = ctx
        this.canvas = canvas
        this.background = background
        this.player = player
        this.enemies = enemies
        this.powerups = powerups

        this.homerSizeBlock = document.querySelector('#homer-size')
        this.defconBlock = document.querySelector('#defcon')

        this.foodTextBlock = document.querySelector('#food span')
        this.livesTextBlock = document.querySelector('#lives span')
        this.homerSizeTextBlock = document.querySelector('#homer-size span')
        this.defconTextBlock = document.querySelector('#defcon span')

        this.foodValue = undefined
        this.livesValue = undefined
        this.homerSizeValue = undefined
        this.defconValue = undefined

        this.foodImg = document.querySelector('#food img')
        this.livesImg = document.querySelector('#lives img')

        this.init()
    }

    init() {
        this.statusbarDOM = document.querySelector('#game-statusbar')
        this.statusbarDOM.setAttribute('width', this.canvas.w)
        this.statusbarDOM.setAttribute('height', this.canvas.h)
    }


    update() {
        this.updateFood()
        //this.updateLives()
        this.updateHomerSize()
        this.updateDefcon()
    }

    updateFood() {
        this.foodValue = this.player.powerupsPickedUp
        if (this.foodValue <= 9) {
            this.foodValue = '0' + this.foodValue
        }
        this.foodTextBlock.innerText = this.foodValue
        if (this.player.powerupTouched) {
            this.foodImg.src = this.player.powerupTouched.skin.src
        }
    }

    updateLives() {
        if (this.player.phase = -1) {
            this.livesTextBlock.innerText = 0
        }
    }

    updateHomerSize() {
        let homerSizeFont = ''
        switch (this.player.phase) {
            case -1:
                this.homerSizeValue = 'Starved Homer'
                homerSizeFont = 'starved'
                break
            case 0:
                this.homerSizeValue = 'Biggie Small'
                homerSizeFont = 'biggie'
                break
            case 1:
                this.homerSizeValue = 'Safety Concern'
                homerSizeFont = 'safety'
                break
            case 2:
                this.homerSizeValue = 'Just Fat'
                homerSizeFont = 'fat'
                break
            case 3:
                this.homerSizeValue = 'Family Size Homer'
                homerSizeFont = 'family'
                break
            case 4:
                this.homerSizeValue = 'Hangry Homer'
                homerSizeFont = 'hangry'
                break
            case 5:
                this.homerSizeValue = 'Ooooobese'
                homerSizeFont = 'obese'
                break
            case 6:
                this.homerSizeValue = 'Homer Blob'
                homerSizeFont = 'blob'
                break
        }
        this.homerSizeTextBlock.innerText = this.homerSizeValue
        this.homerSizeBlock.setAttribute('class', homerSizeFont)
    }

    updateDefcon() {
        let defconColor = ''
        switch (this.player.phase) {
            case -1:
                this.defconValue = ''
                defconColor = 'black'
                break
            case 0:
                this.defconValue = ''
                defconColor = 'black'
                break
            case 1:
                this.defconValue = '5'
                defconColor = 'blue'
                break
            case 2:
                this.defconValue = '4'
                defconColor = 'green'
                break
            case 3:
                this.defconValue = '3'
                defconColor = 'yellow'
                break
            case 4:
                this.defconValue = '3'
                defconColor = 'yellow'
                break
            case 5:
                this.defconValue = '2'
                defconColor = 'red'
                break
            case 6:
                this.defconValue = '1'
                defconColor = 'white'
                break
        }
        this.defconTextBlock.innerText = this.defconValue
        this.defconBlock.setAttribute('class', defconColor)
    }

}