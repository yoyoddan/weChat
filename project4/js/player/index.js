import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

let databus = new DataBus()

export default class Player extends Sprite {
  constructor(context, plank_width, plank_length, plank_interval) {
    super('rec',
          plank_width,
          plank_length,
          (screenWidth - plank_width) / 2,
          screenHeight - plank_length - plank_interval)

    this.initPlank(context, plank_width, plank_length, plank_interval)
  }

  initPlank(context, plank_width, plank_length, plank_interval){
    this.plank_width = plank_width
    this.plank_length = plank_length
    this.plank_interval = plank_interval

    this.x = (screenWidth - this.plank_width)/2
    this.y = screenHeight - this.plank_length - this.plank_interval

    this.color = '#CC9999'
    this.touched = false

  }

  drawToCanvas(context){
    context.fillStyle = this.color
    context.fillRect(this.x, this.y,this.plank_width, this.plank_length)
  }

  update(){
    if(this.touched){
      this.x = databus.touch_x - this.width/2
    }
    if(this.x < 0) this.x = 0
    if(this.x + this.width > screenWidth) this.x = screenWidth - this.width
  }



}
