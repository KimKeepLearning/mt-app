<template>
  <div class=""/>
</template>

<script>
export default {
  layout: 'blank',
  // 因为要到达这个页面的时候自动执行，所以用了中间件
  // middleware: async (ctx)=>{
  //   let {status, data} = await ctx.$axios.get('/users/exit')
  //   if(status===200 && data && data.code === 0){
  //     window.location.href='/'
  //   }
  // },
  async mounted() {
    let {status, data} = await this.$axios.get('/users/exit')
    if(status===200 && data && data.code === 0){
      window.location.href='/'
    }
  },
}
</script>
