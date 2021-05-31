import Router from 'koa-router'
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'
let router = new Router({
  prefix: '/cart'
})


router.post('/create', async (ctx)=>{
  // 创建购物车，返回购物车信息
  if(!ctx.isAuthenticated()){
    ctx.body={
      code:-1,
      msg:'please login'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random() *1000 + time).toString()
    let {params:{id, detail}} = ctx.request.body
    let cart  = new Cart({
      id, 
      cartNo, 
      time, 
      user:ctx.session.passport.user,
      detail
    })
    let result = await cart.save()
    if(result){
      ctx.body = {
        code:0,
        msg:'',
        id:cartNo // 注意返回购物车id
      }
    } else {
      ctx.body =  {
        code:-1,
        msg:'failed'
      }
    }
  }
})


router.post('/getCart', async ctx=>{
  let {id} = ctx.request.body

  try{
    let result = await Cart.findOne({cartNo:id})
    ctx.body = {
      code:0,
      data:result? result.detail[0]: {}
    }
  } catch(e) {
    ctx.body = {
      code:-1,
      data:{}
    }
  }
  
})

export default router;