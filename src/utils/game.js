import Player from "./player";
import {canvas} from "./playground";

class Game {
    constructor({ctx}) {
        this.ctx = ctx
        this.player = new Player({
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
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    updateGame() {
        this.clearCanvas()
        this.player.update()
        requestAnimationFrame(this.updateGame.bind(this))
    }
}
export default Game
