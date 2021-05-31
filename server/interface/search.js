import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'

let router = new Router({
  prefix: '/search'
})

const sign = 'a3c9fe0782107295ee9f1709edd15218'


router.get('/top', async (ctx) => {
  // console.log(ctx.query.input, ctx.query.input)
  let top = await Poi.find({
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
  })
  // console.log('111',top)
  ctx.body = {
      code:0,
      top: top.map(item=>{
          return{
              name: item.name,
              type: item.type
          }
      }),
      type: top.length ? top[0].type: ''
  }
})

router.get('/hotPlace', async (ctx)=>{
  let city = ctx.store? ctx.store.geo.position.city : ctx.query.city

  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '丽人'
    }).limit(10)
    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
   city = ctx.store

})

router.get('/redultsByKeywords', async (ctx)=>{
  // const {city, keyword} = ctx.query;
  // let {
  //   status,
  //   data: {
  //     count,
  //     pois
  //   }
  // } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
  //   params: {
  //     city,
  //     keyword,
  //     sign
  //   }
  // })

  const status = 1
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200
      ? pois
      : []
  }
  
})


router.get('/products', async (ctx)=>{
  const {city, keyword} = ctx.query;
  // let {
  //   status,
  //   data: {
  //     product,
  //     more
  //   }
  // } = await axios.get('http://cp-tools.cn/search/product', {
  //   params: {
  //     keyword,
  //     city,
  //     sign
  //   }
  // })

  // // const status = 1
  // if(status ===200){
  //   ctx.body = {
  //     product,
  //     more: ctx.isAuthenticated()? more: [],
  //     login: ctx.isAuthenticated()
  //   }
  // } else {
  //   ctx.body = {
  //     product:{},
  //     more: ctx.isAuthenticated()? more: [],
  //     login: ctx.isAuthenticated()
  //   }
  // }
  ctx.body = {
    product:{},
    more: ctx.isAuthenticated()? more: [], // 这个好像是团购列表
    login: ctx.isAuthenticated()
  }
  
})

export default router;