import {canvas} from "./playground";
import {MovementsControls} from "./movements";
import {CONTROLS_BTN} from "../constants/constants";
import sprites from "../games/assets/sprites.png"

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

class Sprite {
    constructor({ctx}) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = sprites
        this.sprite = {
            x:0,
            y:0,
            width:50,
            height:50
        }

    }

    update({x, y, width, height}) {
        // this.ctx.drawImage(this.image, x, y, width, height)
    }

}

class Player {
    constructor({position, ctx, velocity, height = 150, width = 50, gravity = 0.2, color = "green"}) {
        this.position = position
        this.velocity = velocity
        this.ctx = ctx
        this.height = height
        this.width = width
        this.gravity = gravity
        this.color = color
        this.health = 100
        this.harm = 5
        this.sprite = new Sprite({ctx})
        this.attackBox = {
            position: this.position,
            width: this.width * 1.5,
            height: this.height / 2,
            attack: false
        }

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

    damage(callback) {
        if (this.health <= 0) {
            this.destroy()
            // alert("game is over")
        }
        callback?.()
        this.health -= this.harm
    }

    attack() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    draw() {
        const {x, y} = this.position
        this.ctx.fillStyle = this.color
        // this.ctx.fillText(`x:${x} y: ${y}`, x, y)
        this.ctx.fillText(this.health, x, y)
        this.ctx.fillRect(x, y, this.width, this.height)
        this.sprite.update({x, y, width: this.width, height: this.height})
        // this.healthBar()

    }

    healthBar() {
        // this.ctx.fillText(this.health)
        // this.ctx.fillRect(x, y, this.width, this.height)
    }

    destroy() {
        this.height = 0
        this.width = 0
        this.position.x = -canvas.width
        this.position.y = 0
        this.position.x = canvas.width - this.width
    }
}

class Hero extends Player {
    constructor(obj) {
        super(obj);
        this.controls = new MovementsControls(this)
        this.collision = {
            x: 0,
            y: 0,
            isCollision: false
        }
    }

    draw() {
        super.draw();
        if (this.position.x - 5 < 0 && this.controls.lastKeyPress === CONTROLS_BTN.ArrowLeft) {
            return this.velocity.x = 0
        }
        if (this.position.x + this.width > canvas.width && this.controls.lastKeyPress === CONTROLS_BTN.ArrowRight) {
            return this.velocity.x = 0
        }
        if (this.attackBox.attack) {
            this.attack()
        }
    }

    stopYStep() {
        this.velocity.y = 0
    }

    stopXStep() {
        this.velocity.x = 0
    }

    up() {
        this.velocity.y -= 5
        // this.attack()
        // this.color="magenta"
    }

    stopAttack() {
        this.attackBox.attack = false
        this.harm = 20
    }

    rightStep() {
        if (this.collision.isCollision && this.controls.lastKeyPress === CONTROLS_BTN.ArrowRight) {
            // return this.velocity.x += 0
        }
        this.velocity.x += 5
    }

    leftStep() {
        // if (this.controls.lastKeyPress === CONTROLS_BTN.ArrowLeft) {
        //     // this.velocity.x = 0
        // }

        this.velocity.x -= 5
    }

    attack() {
        this.attackBox.attack = true
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        this.harm = 0
    }

    collisionDetector(object1, object2) {
        const result = {
            attackCollision: {
                x: object1.attackBox.position.x + object1.attackBox.width >= object2.position.x &&
                    object1.attackBox.position.x + object1.attackBox.width <= object2.position.x + object2.width
                    && object1.attackBox.attack,
                y: Math.floor(object1.attackBox.position.y + object1.attackBox.height) - Math.floor(object2.position.y) > 0,
                get collide() {
                    let result = Boolean(this.x && this.y)
                    object1.collision.isCollision = result
                    return result
                }
            },
            axis: {
                x:
                    object1.position.x + object1.width >= object2.position.x &&
                    object1.position.x <= object2.position.x + object2.width,
                y: Math.floor(object1.position.y + object1.height) - Math.floor(object2.position.y) > 0,
                get collide() {
                    let result = Boolean(this.x && this.y)
                    object1.collision.isCollision = result
                    return result
                }
            },
            ontoEnemy: Math.floor(object1.attackBox.position.y + object1.height) - Math.floor(object2.position.y) < 5,


        }
        return result
    }

    detectCollision(elPosition, enemy) {
        const o = this.collisionDetector(this, enemy)
        if (o.attackCollision.collide && this.attackBox.attack) {
            this.attack()
            enemy.damage(() => {
                this.stopAttack()
                // enemy.health-=this.harm
            })
            return this.color = "magenta"
        }
        if (o.axis.collide) {
            this.velocity.x = 0
            this.velocity.y = 0
            return this.color = "gold"
        }
        this.color = "green"
        // if (options.xAttackCollision && !options.yAxis && this.attackBox.attack) {
        //     // ememy.position.x += 10
        //     this.collision.isCollision = true
        //     return ememy.color = "tomato"
        // }
        // ememy.color = "red"
        // if (options.xAxis && !options.yAxis) {
        //     this.color = "gold"
        //     this.collision.isCollision = true
        //     this.velocity.x = 0
        //     this.velocity.y = 0
        //     if (options.ontoEnemy) {
        //         ememy.destroy()
        //         this.color = "blue"
        //     }
        //
        //     if (this.controls.lastKeyPress === CONTROLS_BTN.ArrowRight || this.controls.lastKeyPress === CONTROLS_BTN.ArrowLeft) {
        //         // this.velocity.x = 0
        //
        //     }
        //
        //     if (this.controls.lastKeyPress === CONTROLS_BTN.ArrowUp) {
        //         // this.velocity.y = 0
        //     }
        // } else {
        //     this.color = "green"
        //     this.collision.isCollision = false
        // }


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
