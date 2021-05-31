<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col 
        :span="3" 
        class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/10afbf1/img/logo.png">
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input 
            v-model="search" 
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl 
            v-if="isHotPlace"
            class="hotPlace">  <!--状态1-->
            <dt>热门搜索</dt>
            <dd 
              v-for="(item, idx) in this.$store.state.home.hotPlace.slice(0,3)" 
              :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <dl 
            v-if="isSearchList"
            class="searchList">  <!--状态2-->
            <dd 
              v-for="(item, idx) in searchList" 
              :key="idx"><a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a></dd>
          </dl>
        </div>
        <p class="suggest">   
          <a
            v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)" 
            :key="idx"
            :href="'/products?keyword='+encodeURIComponent(item.name)">
            {{ item.name }}
          </a>
          
        </p>
        <ul class="nav">
          <li>
            <nuxt-link 
              to="" 
              class="tackout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="" 
              class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="" 
              class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="" 
              class="apartment">民宿公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="" 
              class="bussiness">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data(){
    return {
      search:"",
      isFocus: false,
      hotPlace: ['火锅','火锅','火锅','火锅','火锅'],
      searchList: []
    }
  },
  computed:{
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  methods:{
    focus () {
      this.isFocus = true
    },
    blur () {
      // this.isFocus = false // 会导致点击链接失效
      setTimeout(() => {
        this.isFocus = false      // 这里老师把this赋值成self,然后self.isFocus = false
      }, 200);
    },
    // 这里可以节流/防抖 优化
    input: _.debounce(async function(){
      let self = this
      let city = self.$store.state.geo.position.city.replace('市', '')
      // console.log(city, self.search)
      self.searchList = []
      let {status, data:{top}} = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      // console.log(top)
      self.searchList = top.slice(0,10)
    },300)
  }
}    

</script>

<style lang="scss">
  
</style>