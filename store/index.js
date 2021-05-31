import Vue from 'vue'
import Vuex from 'vuex'

import geo from './modules/geo'
import home from './modules/home'


Vue.use(Vuex)


const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    // 和 服务端的数据传到客户端 有关
    async nuxtServerInit({commit}, {req, app}) {
      // 定位模块就不做了，请求不到接口
      // const {status, data:{province, city}} = await app.$axios.get('/geo/getPosition')
      const status = 200, city = '三亚', province = '海南'
      commit('geo/setPosition', status===200?{city, province} : {city:"", province:""})

      const {status: status2, data:{menu}} = await app.$axios.get('/geo/menu')
      commit('home/setMenu', status2===200? menu : [])
      
      const {status:status3,data:{result}}=await app.$axios.get('/search/hotPlace',{
        params:{
          city
        }
      })
      commit('home/setHotPlace',status3 === 200? result : [])
    }
  }
})

export default store
