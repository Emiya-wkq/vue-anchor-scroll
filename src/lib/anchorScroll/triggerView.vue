<template>
  <div @click="handle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "triggerView",
    inject:["anchorScroll"],
    data(){
      return {

      }
    },
    props:{
      triggerKey:{
        type: String
      }
    },
    methods:{
      handle(){
        this.anchorScroll.goAnchorView(this.triggerKey)
      }
    }
  }
</script>

<style scoped>

</style>
