<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd 
        :class="{active:kind==='all'}"
        kind="all">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa">丽人spa</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item, idx) in cur"
        :key="idx">
        <el-card 
          :body-style="{padding: '0px'}"
          shadow="never">
          <img 
            :src="item.src" 
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">{{ item.pos }}</li>
            <li class="price">￥<em>{{ item.price }}</em></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        kind: "all", // part, spa, movie, travel
        list: {
          all: [{
            src: "//p1.meituan.net/movie/7f73fd63f27f8a952c484ac3773505ac202519.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/7f73fd63f27f8a952c484ac3773505ac202519.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/7f73fd63f27f8a952c484ac3773505ac202519.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }],
          part: [{
            src: "//p1.meituan.net/movie/d6e3e1dc75fd4fbcd3ebc7fb7c09f1d72989216.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/d6e3e1dc75fd4fbcd3ebc7fb7c09f1d72989216.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/d6e3e1dc75fd4fbcd3ebc7fb7c09f1d72989216.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }],
          spa: [{
            src: "//p0.meituan.net/movie/48774506dc0e68805bc25d2cd087d1024316392.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p0.meituan.net/movie/48774506dc0e68805bc25d2cd087d1024316392.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p0.meituan.net/movie/48774506dc0e68805bc25d2cd087d1024316392.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }],
          movie:[{
            src: "//p1.meituan.net/movie/7f73fd63f27f8a952c484ac3773505ac202519.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/7f73fd63f27f8a952c484ac3773505ac202519.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/7f73fd63f27f8a952c484ac3773505ac202519.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }],
          travel: [{
            src: "//p1.meituan.net/movie/d6e3e1dc75fd4fbcd3ebc7fb7c09f1d72989216.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/d6e3e1dc75fd4fbcd3ebc7fb7c09f1d72989216.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }, {
            src: "//p1.meituan.net/movie/d6e3e1dc75fd4fbcd3ebc7fb7c09f1d72989216.jpg@214w_297h_1e_1c",
            title: "111",
            pos:"beijing",
            price:12
          }]
        }
      }
    },
    computed:{
      cur () {
        return this.list[this.kind]
      }
    },
    methods : {
      over (e) {
        this.kind = e.target.getAttribute('kind') || 'all'
      }
    }
  }
</script>

<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>