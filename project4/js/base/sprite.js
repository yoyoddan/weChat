//构造精灵类
export default class Sprite {
  constructor(shape = 'rec', width = 0, height = 0, x = 0, y = 0) {

    this.width = width
    this.height = height

    if(shape === 'circle'){
      this.r = this.width/2
    }
    this.x = x
    this.y = y
  }

  //只有圆才有资格调用该方法，block参数为板或者方块
  isCollideWith(block) {
    let blockLeft = block.x
    let blockRight = block.x + block.width
    let blockUp = block.y
    let blockDown = block.y + block.height

    let circleLeft = this.x-this.r
    let circleRight = this.x+this.r
    let circleUp = this.y-this.r
    let circleDown = this.y+this.r
    
    //返回0是没碰到，返回1是上下碰到，返回2是左右碰到
    if(!!(circleUp < blockDown && 
          circleDown > blockUp && 
          circleRight > blockLeft && 
          circleLeft < blockRight)){
      let dif_y = Math.min(Math.abs(blockUp-circleDown), 
                           Math.abs(circleUp-blockDown))
      let dif_x = Math.min(Math.abs(blockRight-circleLeft), 
                           Math.abs(circleRight-blockLeft))
                           
      if(dif_y <= dif_x) return 1
      else return 2
    }
      else return 0
  }
}