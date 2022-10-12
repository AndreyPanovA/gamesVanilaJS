class MovementsControls {
    constructor(player) {
        this.player = player
        this.addListeners()
        this.controlsBtn = {
            ArrowRight: "ArrowRight",
            ArrowLeft: "ArrowLeft",
            ArrowUp: "ArrowUp",
            ArrowDown: "ArrowDown"
        }
    }

    onKeyDown = (event) => {
        switch (event.key) {
            case this.controlsBtn.ArrowUp:
                return this.player.up()
            case this.controlsBtn.ArrowLeft:
                return this.player.leftStep()
            case this.controlsBtn.ArrowRight:
                return this.player.rightStep()
            default:
                console.log(event.key)
        }

    }
    onKeyUp = (event) => {
        switch (event.key) {
            case this.controlsBtn.ArrowUp:
                return this.player.stopYStep()
            case this.controlsBtn.ArrowLeft:
                return this.player.stopXStep()
            case this.controlsBtn.ArrowRight:
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
