const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let restart = new Image()
restart.src = 'images/restart.png'

export default class GameInfo {

  renderGameOver(ctx, score) {
    ctx.fillStyle = "rgba(51,0,0, 0.8)"
    ctx.fillRect(0, 0, screenWidth, screenHeight)

    ctx.fillStyle = "rgba(153,153,204, 0.8)"
    //画底层方块
    ctx.fillRect(screenWidth/4, 
                 screenHeight/4, 
                 screenWidth / 2,
                 screenWidth / 2)

    ctx.fillStyle = "rgb(153,51,102)"
    //画方块
    ctx.fillRect(screenWidth/4+5,screenHeight/4+5,screenWidth / 2-10 , screenWidth/2-10)
    //画箭头
    ctx.drawImage(restart, 3*screenWidth/8,screenHeight/4+screenWidth/8, screenWidth / 4, screenWidth / 4)

 
    this.btn = {
      startX: 3 * screenWidth / 8,
      startY: screenHeight / 4 + screenWidth / 8,
      endX: 3 * screenWidth / 8 + screenWidth / 4,
      endY: screenHeight / 4 + screenWidth / 8 + screenWidth / 4
    }

  }
}