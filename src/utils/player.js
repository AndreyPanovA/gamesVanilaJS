import {canvas} from "./playground";

class Player {
    constructor({position, ctx, velocity, height = 150, width = 50, gravity = 0.2}) {
        this.position = position
        this.velocity = velocity
        this.ctx = ctx
        this.height = height
        this.width = width
        this.gravity = gravity
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            return this.velocity.y = 0
        }
        this.velocity.y += this.gravity
    }

    draw() {
        const {x, y} = this.position
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(x, y, this.width, this.height)
    }
}

export default Player
