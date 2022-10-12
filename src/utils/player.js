import {canvas} from "./playground";
import {MovementsControls} from "./movements";

class Player {
    constructor({position, ctx, velocity, height = 150, width = 50, gravity = 0.2, color = "green"}) {
        this.position = position
        this.velocity = velocity
        this.ctx = ctx
        this.height = height
        this.width = width
        this.gravity = gravity
        this.color = color
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            return this.velocity.y = 0
        }
        this.velocity.y += this.gravity
    }

    draw() {
        const {x, y} = this.position
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(x, y, this.width, this.height)
    }
}

class Hero extends Player {
    constructor(obj) {
        super(obj);
        this.controls = new MovementsControls(this)
    }

    stopYStep() {
        this.velocity.y = 0
    }

    stopXStep() {
        this.velocity.x = 0
    }

    up() {
        this.velocity.y -= 5
    }

    rightStep() {
        this.velocity.x += 5
    }

    leftStep() {
        this.velocity.x -= 5
    }

    destroy() {
        this.controls.removeListeners()
    }
}

class Enemy extends Player {
    constructor(obj) {
        super(obj);
    }
}

export {Player, Enemy, Hero}
