// import {ctx, canvas, DPI_WIDTH, DPI_HEIGHT} from "../utils/playground";
// import Game from "../utils/game";
// import background from "./assets/background.jpg";
// import sprites from "./assets/sprites1.png"
//
// // const game = new Game({ctx, imageSrc: background})
// //
// //
// // game.startGame()
// // 1102 861
//
// const btn1 = document.getElementById("one")
// const btn2 = document.getElementById("second")
// const inp1 = document.querySelector(".one")
// const inp2 = document.querySelector(".second")
// let y = 0
// let x = 0
// let textW = 0
// let textH = 0
// btn1.addEventListener("click", ()=> {
//     x++
// })
// btn1.addEventListener("click", ()=> {
//     y++
// })
// inp1.addEventListener("change", (e)=> {
//     textW = +e.target.value
//     // console.log(e.target.value)
// })
// inp1.addEventListener("change", (e)=> {
//     textH = +e.target.value
//
// })
// const playerImage = new Image()
// playerImage.src = sprites
//
// const config = {
//     width: 139,
//     height: 135
// }
//
//
// function animate() {
//     ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
//     ctx.drawImage(playerImage, x*textW, y*textH, config.width, config.height, 0, 0, config.width, config.height)
//     // ctx.drawImage(playerImage, 0, 0, config.width, config.height, 0, 0, config.width, config.height)
//     requestAnimationFrame(animate)
// }
//
// animate()
//
//
//
//

import {CanvasObj, animate} from "./animations/animation"
animate()



