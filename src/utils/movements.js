import {CONTROLS_BTN} from "../constants/constants";

class MovementsControls {
    constructor(player) {
        this.player = player
        this.addListeners()
        this.lastKeyPress = null
    }

    onKeyDown = (event) => {
        this.lastKeyPress = event.key
        switch (event.key) {
            case CONTROLS_BTN.ArrowUp:
                return this.player.up()
            case CONTROLS_BTN.ArrowLeft:
                return this.player.leftStep()
            case CONTROLS_BTN.ArrowRight:
                return this.player.rightStep()
            default:
                console.log(event.key)
        }

    }
    onKeyUp = (event) => {
        switch (event.key) {
            case CONTROLS_BTN.ArrowUp:
                return this.player.stopYStep()
            case CONTROLS_BTN.ArrowLeft:
                return this.player.stopXStep()
            case CONTROLS_BTN.ArrowRight:
                return this.player.stopXStep()
            default:
                console.log(event.key)
        }
    }

    addListeners() {
        window.addEventListener("keyup", this.onKeyUp)
        window.addEventListener("keydown", this.onKeyDown)

    }

    removeListeners() {
        window.removeEventListener("keyup", this.onKeyUp)
        window.removeEventListener("keydown", this.onKeyDown)
    }
}

export {MovementsControls}
