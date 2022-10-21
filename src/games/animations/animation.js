import spritesDog from "../assets/shadow_dog.png"
import CustomArray from "../../utils/indexedArray"
const {WIDTH, HEIGHT, SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_RATIO} = getConstants()

const PlayerImage = elConfigure(new Image(), {src: spritesDog})
let frameX = 0
let gameFrame = 0
const staggerFrames = 3
const spriteAnimationsDefault = [
    {id: "default", frames: 6},
    {id: "jump", frames: 6},
    {id: "fall", frames: 6},
    {id: "run", frames: 6},
    {id: "dizzy", frames: 10},
    {id: "sit", frames: 4},
    {id: "hit", frames: 6},
]

const spriteAnimations = new CustomArray(...spriteAnimationsDefault)
let anim = spriteAnimations.getAnimationsList[0]
addOptions(spriteAnimations.getAnimationsList)

const CanvasObj = mount("canvas", {width: WIDTH + "px", height: HEIGHT + "px", background: "#333"},
    {
        width: WIDTH,
        height: HEIGHT
    })
const ctx = CanvasObj.el.getContext("2d")


function dogAnimation(ctx, img) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.drawImage(img, frameX * SPRITE_WIDTH, spriteAnimations.findById(anim).y * SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT, 1, 0, SPRITE_WIDTH * SPRITE_RATIO, SPRITE_HEIGHT * SPRITE_RATIO)
    if (gameFrame % staggerFrames == 0) {
        if (frameX < spriteAnimations.findById(anim).frames) frameX++
        else frameX = 0
    }
    gameFrame++

}

function animate() {
    dogAnimation(ctx, PlayerImage)
    requestAnimationFrame(animate)
}

function getConstants() {
    return {
        WIDTH: 800,
        HEIGHT: 400,
        get SPRITE_RATIO() {
            return this.SPRITE_WIDTH / this.WIDTH
        },
        get SPRITE_WIDTH() {
            return 575
        },
        SPRITE_HEIGHT: 523,
        get DPI_WIDTH() {
            return this.WIDTH * 2
        },
        get DPI_HEIGHT() {
            return this.HEIGHT * 2
        }
    }
}

function css(el, styles = {}) {
    Object.assign(el, styles)
}

function elConfigure(el, itemConfig = {}) {
    Object.assign(el, itemConfig)
    return el
}

function mount(tagName = "canvas", styles = {}, itemConfig = {}) {
    const el = document.createElement(tagName)
    css(el.style, styles)
    elConfigure(el, itemConfig)
    document.body.appendChild(el)
    return {
        el,
    }
}

function addOptions(options) {
    let container = document.createElement("select")
    for (let item of options) {
        const option = document.createElement("option")
        option.textContent = item
        option.value = item
        container.appendChild(option)
    }
    document.body.appendChild(container)
    let select = document.querySelector("select")
    const onChange = ({target: {value}}) => anim = value
    select.addEventListener("change", onChange)
    return {
        destroy() {
            select.removeEventListener("change", onChange)
        }
    }
}

export {CanvasObj, animate, anim}
