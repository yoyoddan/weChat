let instance
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance
    instance = this

    this.reset()
  }

  reset() {
    this.gameOver = false
    this.touch_x = 0
    this.touch_y = 0
    this.frame = 0
    this.score = 0
  

    this.amount_x = 8
    this.amount_y = 5
    this.x = (screenWidth - 
              this.amount_x*(this.width)-
              (this.amount_x-1)*(this.width)/8)/2
    this.y = screenHeight / 10
    this.width = 32*screenWidth / (45*this.amount_x - 5)
    this.height = screenHeight / (9*this.amount_y -1)
    this.colors = ['#CC9999', '#FFFF66', '#CC99CC', '#99CCCC', '#99FF66', '#FF9900']
    
    this.speed = screenWidth/70

    //射出角度
    do{
      var temp_x = (Math.random() - 0.5)
      var temp_y = (0 - Math.random() / 2)
      var temp_tan = temp_y / temp_x
    } while ((temp_tan <= 0.3639702342662 && temp_tan >= 0) || 
             (temp_tan >= - 0.3639702342662 && temp_tan <= 0) ||
             (temp_tan >= 2.7474774194546)||
             (temp_tan <= -2.7474774194546))
    
    //权重
    let weight = Math.sqrt(Math.pow(this.speed,2) / 
                          (Math.pow(temp_x,2) + 
                          Math.pow(temp_y, 2)))
    this.x_inc = temp_x * weight
    this.y_inc = temp_y * weight
  }
}
