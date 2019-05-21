import Sprite from '../base/sprite'
import DataBus from '../databus'

let databus = new DataBus()

export default class Block extends Sprite {
  constructor(x, y, width, height, color) {
    super('rec',width,height,x,y)
    this.init(color)

  }

  init(color) {
    this.color = color
    this.isVisible = true
  }

  drawToCanvas(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}
