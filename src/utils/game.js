import {Enemy, Hero} from "./player";
import {canvas} from "./playground";
// import assets from "../games/assets/assets";
// assets.combat.background
// import background from "../games/assets/background.jpg"

class Game {
    constructor({ctx, imageSrc}) {
        this.ctx = ctx
        this.background = new Image()
        this.background.src = imageSrc
        this.player = new Hero({
            position: {
                x: 0,
                y: 0
            },
            ctx,
            velocity: {
                x: 0,
                y: 5
            },
            height: 30,
            width: 20,
        })
        this.enemy = new Enemy({
            position: {
                x: 100,
                y: 0
            },
            ctx,
            velocity: {
                x: 0,
                y: 5
            },
            height: 30,
            width: 20,
            color: "#ff0000",
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.ctx.fillStyle = "#333"
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        this.ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
    }

    updateGame() {
        requestAnimationFrame(this.updateGame.bind(this))
        this.clearCanvas()
        this.player.update()
        this.enemy.update()
        this.player.detectCollision(this.player.position, this.enemy)
    }

    startGame() {
        this.updateGame()
    }
}

export default Game
