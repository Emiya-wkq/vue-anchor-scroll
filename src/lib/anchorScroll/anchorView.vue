<template>
  <div :ref="anchorKey" :class="{'tips': tipsSwitch}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "anchorView",
    inject:["anchorScroll"],
    data(){
      return {
        tipsSwitch: false
      }
    },
    props:{
      anchorKey:{
        type: String
      }
    },
    mounted(){
      this.anchorScroll.Bus[this.anchorKey] = this
    },
    methods:{
      getAnchorViewElement(key){
        let element = this.$refs[key]?this.$refs[key]:undefined
        return element
      },
      tips(){
        this.tipsSwitch = true
        setTimeout(()=>{
          this.tipsSwitch = false
        },2000)
      }
    }
  }
</script>

<style scoped>
  @keyframes shade{
    0% {
      box-shadow: 0 0 10px #008dff;
    }
    25% {
      box-shadow: 0 0 10px white;
    }
    50%{
      box-shadow: 0 0 10px #008dff;
    }
    100%{
      box-shadow: 0 0 10px white;
    }
  }
  .tips{
    animation: shade 2s;
  }
</style>
