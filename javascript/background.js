class Background {

    constructor(ctx, canvas) {
        this.ctx = ctx
        this.w = canvas.w
        this.h = canvas.h

        this.posX = 0
        this.posY = 0

        this.gameAreaHeight = canvas.h 
        this.grassHeight = (this.gameAreaHeight / 2) * 0.175 //     |                                //a decidir
        this.boardwalkHeight = (this.gameAreaHeight / 2) * 0.175 // | Estos 3 deberian sumar 1.00    //a decidir
        this.roadHeight = this.gameAreaHeight * 0.65 //             |                                //a decidir
        this.streetlineWidth = this.roadHeight / 125
        this.boardwalkBorderWidth = this.roadHeight / 100
        this.roadBorderWidth = this.boardwalkBorderWidth
        
        this.boundaryTop = this.grassHeight
        this.boundaryBottom = this.boundaryTop + (2 * this.boardwalkHeight) + this.roadHeight
        this.boundaryLeft = 0
        this.boundaryRight = this.w

        this.speedX = 6 //aumenta la difucltad del juego //a decidir

        this.grassColor = 'rgb(124, 185, 111)' //a decidir
        this.boardwalkColor = 'rgb(203, 205, 250)' //a decidir
        this.roadColor = 'rgb(153, 153, 153)' //a decidir
        this.streetLineColor = 'yellow' //a decidir
        this.boardwalkBorderColor = 'rgb(178, 178, 193)' //a decidir
        this.roadBorderColor = 'darkGray' //a decidir
    }

    draw() {
        this.constructRoad()
        this.move()
    }

    move() {
        if (this.posX <= -this.w) {
            this.posX = 0
        }
        this.posX -= this.speedX
    }

    constructRoad() {
        this.ctx.fillStyle = this.grassColor
        this.ctx.fillRect(this.posX, 0, this.w, this.h)
        this.ctx.fillStyle = this.boardwalkColor
        this.ctx.fillRect(this.posX, this.grassHeight, this.w, ((this.boardwalkHeight * 2) + this.roadHeight))
        this.ctx.fillStyle = this.roadColor
        this.ctx.fillRect(this.posX, this.grassHeight + this.boardwalkHeight, this.w, this.roadHeight)

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.boardwalkBorderColor
        this.ctx.lineWidth = this.boardwalkBorderWidth
        this.ctx.moveTo(this.posX, this.boundaryTop)
        this.ctx.lineTo(this.posX + this.w, this.boundaryTop)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.roadBorderColor
        this.ctx.lineWidth = this.roadBorderWidth
        this.ctx.moveTo(this.posX, this.boundaryTop + this.boardwalkHeight)
        this.ctx.lineTo(this.posX + this.w, this.boundaryTop + this.boardwalkHeight)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.boardwalkBorderColor
        this.ctx.lineWidth = this.boardwalkBorderWidth
        this.ctx.moveTo(this.posX, this.boundaryBottom)
        this.ctx.lineTo(this.posX + this.w, this.boundaryBottom)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.roadBorderColor
        this.ctx.lineWidth = this.roadBorderWidth
        this.ctx.moveTo(this.posX, this.boundaryBottom - this.boardwalkHeight)
        this.ctx.lineTo(this.posX + this.w, this.boundaryBottom - this.boardwalkHeight)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.streetLineColor
        this.ctx.lineWidth = this.streetlineWidth
        this.ctx.setLineDash([this.streetlineWidth * 7, (this.streetlineWidth * 4)])
        this.ctx.moveTo(this.posX, (this.grassHeight + this.boardwalkHeight + (2 * (this.roadHeight / 3)) - (this.streetlineWidth / 2)))
        this.ctx.lineTo(this.posX + this.w, (this.grassHeight + this.boardwalkHeight + (2 * (this.roadHeight / 3)) - (this.streetlineWidth / 2)))
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.streetLineColor
        this.ctx.lineWidth = this.streetlineWidth
        this.ctx.setLineDash([this.streetlineWidth * 7, (this.streetlineWidth * 4)])
        this.ctx.moveTo(this.posX, (this.grassHeight + this.boardwalkHeight + (this.roadHeight / 3) - (this.streetlineWidth / 2)))
        this.ctx.lineTo(this.posX + this.w, (this.grassHeight + this.boardwalkHeight + (this.roadHeight / 3) - (this.streetlineWidth / 2)))
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.fillStyle = this.grassColor
        this.ctx.fillRect(this.posX + this.w, 0, this.w, this.h)
        this.ctx.fillStyle = this.boardwalkColor
        this.ctx.fillRect(this.posX + this.w, this.grassHeight, this.w, ((this.boardwalkHeight * 2) + this.roadHeight))
        this.ctx.fillStyle = this.roadColor
        this.ctx.fillRect(this.posX + this.w, this.grassHeight + this.boardwalkHeight, this.w, this.roadHeight)

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.boardwalkBorderColor
        this.ctx.lineWidth = this.boardwalkBorderWidth
        this.ctx.moveTo(this.posX + this.w, this.boundaryTop)
        this.ctx.lineTo(this.posX + (2 * this.w), this.boundaryTop)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.roadBorderColor
        this.ctx.lineWidth = this.roadBorderWidth
        this.ctx.moveTo(this.posX + this.w, this.boundaryTop + this.boardwalkHeight)
        this.ctx.lineTo(this.posX + (2 * this.w), this.boundaryTop + this.boardwalkHeight)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.streetLineColor
        this.ctx.lineWidth = this.streetlineWidth
        this.ctx.setLineDash([this.streetlineWidth * 7, (this.streetlineWidth * 4)])
        this.ctx.moveTo(this.posX + this.w, (this.grassHeight + this.boardwalkHeight + (this.roadHeight / 3) - (this.streetlineWidth / 2)))
        this.ctx.lineTo(this.posX + (2 * this.w), (this.grassHeight + this.boardwalkHeight + (this.roadHeight / 3) - (this.streetlineWidth / 2)))
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.streetLineColor
        this.ctx.lineWidth = this.streetlineWidth
        this.ctx.setLineDash([this.streetlineWidth * 7, (this.streetlineWidth * 4)])
        this.ctx.moveTo(this.posX + this.w, (this.grassHeight + this.boardwalkHeight + (2 * (this.roadHeight / 3)) - (this.streetlineWidth / 2)))
        this.ctx.lineTo(this.posX + (2 * this.w), (this.grassHeight + this.boardwalkHeight + (2 * (this.roadHeight / 3)) - (this.streetlineWidth / 2)))
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.roadBorderColor
        this.ctx.lineWidth = this.roadBorderWidth
        this.ctx.moveTo(this.posX + this.w, this.boundaryBottom - this.boardwalkHeight)
        this.ctx.lineTo(this.posX + (2 * this.w), this.boundaryBottom - this.boardwalkHeight)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.boardwalkBorderColor
        this.ctx.lineWidth = this.boardwalkBorderWidth
        this.ctx.moveTo(this.posX + this.h, this.boundaryBottom)
        this.ctx.lineTo(this.posX + (2 * this.w), this.boundaryBottom)
        this.ctx.stroke()
        this.ctx.setLineDash([])
        this.ctx.closePath()
    }
}
