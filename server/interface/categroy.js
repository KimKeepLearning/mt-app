import Router from 'koa-router'
import axios from './utils/axios'
import Categroy from '../dbs/models/categroy'

let router = new Router({
  prefix: '/categroy'
})

const sign = 'd8402a2d5ad7e02e80108270d71831cc'
// const sign = 'a3c9fe0782107295ee9f1709edd15218'

router.get('/crumbs', async (ctx)=>{
  let result = await Categroy.findOne({
    city: ctx.query.city.replace('市', '') || '北京'
  })
  if(result){
    ctx.body = {
      area: result.areas,
      type: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
})

export default router;