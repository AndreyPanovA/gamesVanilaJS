import {css} from "./css"
function createCanvas() {
    const HEIGHT = 800
    const WIDTH = 800
    const DPI_WIDTH = WIDTH * 2
    const DPI_HEIGHT = HEIGHT * 2
    const PADDING = 40
    const canvas = document.createElement("canvas")
    css(canvas, {width: WIDTH + "px", height: HEIGHT + "px"})
    const ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)
    return {
        canvas,
        ctx,
        HEIGHT,
        WIDTH,
        DPI_HEIGHT,
        DPI_WIDTH,
        PADDING
    }
}
const {canvas, ctx, DPI_WIDTH, DPI_HEIGHT} = createCanvas()
export {canvas, ctx, DPI_WIDTH, DPI_HEIGHT}
