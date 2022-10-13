import {canvas} from "./playground";
import {MovementsControls} from "./movements";
import {CONTROLS_BTN} from "../constants/constants";

const customConsole = (...rest) => {
    let counter = 0
    return (...rest) => {
        if (counter > 0) {
            return
        }
        counter++
        console.log(...rest)
    }
}
const console1 = customConsole()

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
        this.ctx.fillText(`x:${x} y: ${y}`, x, y)
        this.ctx.fillRect(x, y, this.width, this.height)
    }

    destroy() {
        // this.height = 0
        // this.width = 0
        // this.position.x = -canvas.width
        // this.position.y = 0
        // this.position.x = canvas.width-this.width
    }
}

class Hero extends Player {
    constructor(obj) {
        super(obj);
        this.controls = new MovementsControls(this)
        this.attackBox = {
            position: this.position,
            width: this.width * 1.5,
            height: this.height / 2
        }
        this.collision = {
            x: 0,
            y: 0,
            isCollision: false
        }
    }

    draw() {
        super.draw();
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

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
        if (this.collision.isCollision && this.controls.lastKeyPress === CONTROLS_BTN.ArrowRight) {
            // return this.velocity.x += 0
        }
        this.velocity.x += 5
    }

    leftStep() {
        if (this.controls.lastKeyPress === CONTROLS_BTN.ArrowLeft) {
            // this.velocity.x = 0
        }
        this.velocity.x -= 5
    }
    attack() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

    }

    detectCollision(elPosition, ememy) {
        const options = {
            // xAxis: this.attackBox.position.x + this.attackBox.width >= ememy.position.x && this.attackBox.position.x <= ememy.position.x + ememy.width,
            xAxis: this.attackBox.position.x + this.width >= ememy.position.x && this.attackBox.position.x <= ememy.position.x + ememy.width,
            yAxis:
            // this.attackBox.position.y + this.attackBox.height >= ememy.position.y &&
            // this.attackBox.position.y <= ememy.position.y + ememy.height ||
                this.attackBox.position.y + this.height <= ememy.position.y,
            ontoEnemy: Math.floor(this.attackBox.position.y + this.height) - Math.floor(ememy.position.y) < 5,
            xAttackCollision: this.attackBox.position.x + this.attackBox.width  >= ememy.position.x && this.attackBox.position.x + this.attackBox.width <= ememy.position.x + ememy.width,
        }
        if (options.xAttackCollision && !options.yAxis) {
            ememy.position.x +=10
            return ememy.color = "tomato"
        }
        ememy.color = "red"
        if (options.xAxis && !options.yAxis) {
            this.color = "gold"
            this.collision.isCollision = true
            this.velocity.x = 0
            this.velocity.y = 0
            if (options.ontoEnemy) {
                ememy.destroy()
                this.color = "blue"
            }

            if (this.controls.lastKeyPress === CONTROLS_BTN.ArrowRight || this.controls.lastKeyPress === CONTROLS_BTN.ArrowLeft) {
                // this.velocity.x = 0

            }

            if (this.controls.lastKeyPress === CONTROLS_BTN.ArrowUp) {
                // this.velocity.y = 0
            }
        } else {
            this.color = "green"
            this.collision.isCollision = false
        }


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
