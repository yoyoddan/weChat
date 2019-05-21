import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

export default class Ball extends Sprite {
  constructor(x, y, r, color) {
    super('circle', r * 2, r * 2, x, y)
    this.init(x, y, r, color)

  }

  init(x, y, r, color,speed) {
    this.x = x
    this.y = y
    this.r = r
    this.color = color
  }
  
  drawToCanvas(context){
    context.fillStyle = this.color
    context.beginPath()
    context.arc(this.x,this.y, this.r, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
  }

  update(){
    this.x += databus.x_inc
    this.y += databus.y_inc
  }

}
