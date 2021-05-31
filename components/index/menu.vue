<template>
  <div class="m-menu">
    <dl 
      class="nav" 
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd 
        v-for="(item, idx) in $store.state.home.menu " 
        :key="idx"
        @mouseenter="enter">
        <i :class="item.type"/> {{ item.name }} <span class="arrow"/>
      </dd>
    </dl>
    <div 
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout">
      <template
        v-for="(item ,idx) in curdetail">
        <h4 :key="idx">{{ item.title }}</h4>
        <span 
          v-for="v in item.child" 
          :key="v">
          {{ v }}
        </span>
      </template>
    </div>
  </div>
</template>


<script>
/* eslint-disable */
  export default{
    data () {
      return {
        kind: '',
        menu: [{
          type: 'food',
          name: '美食',
          child: [{
            title: '美食',
            child: ['代金券', '甜点','饮品','自助餐']
          }]
        },{
          type: 'takeout',
          name: '外卖',
          child: [{
            title: '外卖',
            child: ['代金券', '甜点','饮品','自助餐']
          }]
        }, {
          type: 'food',
          name: '美食',
          child: [{
            title: '美食',
            child: ['代金券', '甜点','饮品','自助餐']
          }]
        }]
      }
    },
    computed: {
      curdetail(){
        return this.$store.state.home.menu.filter(item=>item.type===this.kind)[0]['child']
      }
    },
    methods:{
      mouseleave () {
        let self =this
        self._timer = setTimeout(function(){
          self.kind=''
        }, 150)
      },
      enter (e) {
        this.kind = e.target.querySelector('i').className
      },
      sover () {
        clearTimeout(this._timer)
      },
      sout () {
        this.kind = ""
      }
    },
    
  }
</script>

