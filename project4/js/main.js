import Player     from './player/index'
import DataBus    from './databus'
import Ball       from './player/ball'
import Block      from './player/Block'
import Gameinfo   from './interface/gameinfo'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


let ctx = canvas.getContext('2d')
let databus = new DataBus()

 //游戏主函数
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.init()
  }

  init(){
    //玩家动态实例化位置
    this.player = new Player(ctx, screenWidth/5, screenHeight/70, screenHeight/15)

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    //球大小在此定义
    this.ball = new Ball(screenWidth / 2, 
                        this.player.y - screenHeight / 100, 
                        screenHeight/100,
                        '#CCCCCC')

    databus.reset()
    this.blocks = new Array()
    this.gameinfo = new Gameinfo()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    
    let temp_player = this.player
    wx.onTouchStart(function (e){
      databus.touch_x = e.changedTouches[0].clientX.toFixed(0)
      databus.touch_y = e.changedTouches[0].clientY.toFixed(0)
      if (databus.touch_x <= temp_player.x + temp_player.plank_width
        && databus.touch_x >= temp_player.x
        && databus.touch_y >= temp_player.y
        && databus.touch_y <= temp_player.y + temp_player.height){
        temp_player.touched = true
        }
    })

    wx.onTouchEnd(function (e){
      temp_player.touched = false
    })

    wx.onTouchMove(function (e) {
      databus.touch_x = e.changedTouches[0].clientX.toFixed(0)
      databus.touch_y = e.changedTouches[0].clientY.toFixed(0)
    })

    //以下代码为实例化方块

    let x = databus.x
    let y = databus.y
    let width = databus.width
    let height = databus.height
    
    for(let i = 0;i < databus.amount_y; i++)
    {
      for(let j = 0;j < databus.amount_x; j++)
      {
        //生成随机颜色索引
        let n = Math.floor(Math.random() * databus.colors.length + 1) - 1 
        this.blocks.push(new Block(x, y, width, height, databus.colors[n]))

        //此处更改间隙
        x += (width + width/8)
      }
      x = databus.x
      //此处更改间隙
      y += (height + width/8)
    }

    //动画以及主循环
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas)
  }

  update(){
    if (databus.gameOver)
      return;
    
    this.ball.update()

    //方块碰撞检测
    for(let i = 0; i < this.blocks.length; i++)
    {
      let temp_collide = this.ball.isCollideWith(this.blocks[i])
      if (this.blocks[i].isVisible && temp_collide > 0) {
        if(temp_collide === 1) databus.y_inc = -databus.y_inc
        else databus.x_inc = -databus.x_inc
        this.blocks[i].isVisible = false
        databus.score += 4 
        break 
      }   
    }


    //边界碰撞检测
    if (this.ball.x <= this.ball.r || this.ball.x >= screenWidth - this.ball.r){
      databus.x_inc = -databus.x_inc
    }
    if (this.ball.y <= this.ball.r) {
      databus.y_inc = -databus.y_inc
    }

    //玩家碰撞检测
    let temp_collide = this.ball.isCollideWith(this.player)
    if (temp_collide > 0) {
      if (temp_collide === 1) databus.y_inc = -databus.y_inc
      else databus.x_inc = -databus.x_inc
    }


    //每四十帧触发事件
    if(databus.frame === 40){
      databus.frame = 0
      //重设颜色数值
      for(let i = 0; i< this.blocks.length;i++){
        let n = Math.floor(Math.random() * databus.colors.length + 1) - 1
        this.blocks[i].color = databus.colors[n]
      }
    }
    this.player.update()
    if(this.ball.y>=screenHeight){
      databus.gameOver = true
    }
  }

  render() {
    ctx.fillStyle = "#660033"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    let star = new Image()
    star.src = 'images/star.png'
    ctx.drawImage(
                star, 
                screenWidth / 12, 
                screenWidth / 20, 
                screenWidth / 12, 
                screenWidth / 12)

    ctx.fillStyle = "white"
    let font_size = (screenHeight/20).toString()
    ctx.font = font_size + "px Arial bold"
    ctx.fillText( databus.score, 
                  screenWidth / 6 + 6,
                  screenWidth / 8)

    let smile= new Image()
    smile.src = 'images/smile.png'
    ctx.drawImage(
          smile, 
          screenWidth / 4, 
          screenHeight / 3, 
          screenWidth / 2, 
          screenWidth / 2)

    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].isVisible) {
        this.blocks[i].drawToCanvas(ctx)
        //改变球方向
      }
    }

    this.ball.drawToCanvas(ctx)

    this.player.drawToCanvas(ctx)
    
    // 游戏结束停止帧循环
    if(databus.gameOver){
      this.gameinfo.renderGameOver(ctx, databus.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  //游戏结束按钮事件
  touchEventHandler(e) {
    
    let x = e.touches[0].clientX.toFixed(0)
    let y = e.touches[0].clientY.toFixed(0)

    let area = this.gameinfo.btn

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.init()
    
  }

  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
