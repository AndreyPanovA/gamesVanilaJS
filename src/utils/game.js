import {Enemy, Hero} from "./player";
import {canvas} from "./playground";

class Game {
    constructor({ctx}) {
        this.ctx = ctx
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
            height: 50,
            width: 50
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
            height: 50,
            width: 50,
            color:"#ff0000",
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    updateGame() {
        this.clearCanvas()
        this.player.update()
        this.enemy.update()
        requestAnimationFrame(this.updateGame.bind(this))
    }
    startGame() {
        this.updateGame()
    }
}
export default Game
