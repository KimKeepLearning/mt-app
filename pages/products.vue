<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"/>
    </el-col>
  </el-row>

</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data(){
    return {
      // 这里先用假数据
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[]
    }
  },
  async asyncData(ctx){
    let keyword = encodeURIComponent(ctx.query.keyword)
    let city = encodeURIComponent(ctx.store.state.geo.position.city)
    // let {status, data:{count, pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
    //   params:{
    //     keyword,
    //     city
    //   }
    // })
    let {status:status2, data:{areas, types}} = await ctx.$axios.get('/categroy/crumbs',{
      params:{
        city
      }
    })
    /**我写的 */
    return {
      list: [
        {
          img: '//p0.meituan.net/hoteltdc/641db876a4d48100304be6450c81ef692213337.jpg@220w_125h_1e_1c', 
          rate:5, 
          commemt:Math.floor(Math.random()*10000), 
          type:'丽人', 
          addr:'xiamensiming', 
          price:'840', 
          status:'whatsthis',
          name: "故宫",
          tel:18261195537
        }
      ],
      keyword,
      // areas: ['北京']

    }
    // if(status===200 && count > 0 && status2 === 200){
    //   return {
    //     list: pois.filter(item=>item.photos.length).map(item=>{
    //      return{
    //        type:item.type,
    //        img: item.photos.length?item.photos[0].url:'',
    //        name: item.name,
    //        comment: Math.floor(Math.random()*10000),
    //        rate:Number(item.biz_ext.rating),
    //        price:Number(item.biz_ext.cost),
    //        scene:item.tag,
    //        tel:item.tel,
    //        location:item.location,
    //        module:item.type.split(';')[0]
    //      } 
    //     }),
    //     keyword,
    //     areas: areas.filter(item=>item.type!=='').slice(0,5),
    //     types:types.filter(item=>item.type!=='').slice(0, 5),
    //     point: (pois.find(item=>item.location).location||'').split(',')

    //   }
    // }

  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
