<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "anchorScroll",
    provide(){
      return {
        "anchorScroll": this
      }
    },
    props: {
      // 理想的动画执行时间，实际情况由于计算浏览器滚动条也需时间（并且不确定多久），
      // 以及浏览器滚动条最低步进为0.5px，所以实际只是限定了最慢计算时间
      // 综上就是实际操作时间会略超出或低于设置值
      'animationTime': {
        type: Number,
        default: 300
      },
      // 动画执行间隔， 值如果过小，将会导致动画执行时间严重超出设置时间
      // 例如，设置为1毫秒可能无法完成一次滚动条移动的相关操作
      'animationStep': {
        type: Number,
        default: 10
      },
      // 执行完滚动条操作后，是否进行目标区域动画提示
      'animationTips':{
        type: Boolean,
        default: true
      }

    },
    data(){
      return {
        Bus:{}
      }
    },
    methods:{
      goAnchorView(key){
        let element = this.Bus[key].getAnchorViewElement(key)
        if(!this.isLook(element)){
          this.$emit('changeBefore',document.documentElement.scrollTop)
          this.scrollAnimate(element,this.animationTime,this.animationStep).then(()=>{
            this.$emit('changeAfter',document.documentElement.scrollTop)
            if(this.animationTips){
              this.handleTips(key)
            }
          })
        }
      },
      scrollAnimate(element,t,z){
        // const _this = this
        return new Promise((resolve)=>{
          let offsetTop = element.offsetTop
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let viewHeight = window.innerHeight|| document.documentElement.clientHeight||document.body.clientHeight;
          // t为秒数，z为执行间隔，求出需要执行几次才能在规定时间完成
          let count = t/z
          // 等差数列求和公式Sn=(A1+An)n/2，.那么变式为An = Sn*2/n-A1
          let Sn = Math.abs(scrollTop - offsetTop)
          let An =  Sn*2/count-1
          // 再根据An=A1+(n-1)*d变式d=(An-A1)/(n-1)计算出公差
          let d = (An-1)/(count-1)
          // 初始项设置为1
          let number = 1
          // 按照所执行次数创建对应数量数组
          let array = new Array(count)
          // 每次按公差递增赋值
          for(let i = 0;i<array.length;i++){
            array[i] = number
            number += d
          }
          array = array.reverse()
          let num = 0
          let animate = function () {
            // 一旦进入递归，各种距离都要重新获取，防止用户此期间操作以及高度等数据变化
            offsetTop = element.offsetTop
            scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            viewHeight = window.innerHeight|| document.documentElement.clientHeight||document.body.clientHeight;
            setTimeout(() => {
              // 等差数列每项都可能为小数，由于计算偏差，以及滚动条每次操作值需为整数。
              // 所以每项向上取整，这可能会导致动画执行速度略大于预期（即所设时间为最慢执行时间）
              if(scrollTop>offsetTop){
                document.documentElement.scrollTop -= array[num]? Math.ceil(array[num]) : 1
              } else {
                document.documentElement.scrollTop += array[num]? Math.ceil(array[num]) : 1
              }
              num+=1
              // let scrollBottom = document.documentElement.scrollTop+viewHeight
              let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
              let condition
              if(scrollTop>offsetTop){
                condition = !(document.documentElement.scrollTop<=offsetTop)
              } else {
                condition = !(document.documentElement.scrollTop>=offsetTop)
              }
              // 如果条件通过，并且没触底才可以继续,有些设备会出现滚动条已经触底，但经过计算仍然有几像素的问题
              // 所以设置一定误差(此设置可能会导致由底部向上滚动出现不执行的问题)
              if (condition && scrollHeight - (scrollTop  + viewHeight) > 5) {
                animate()
              }else{
                resolve()
              }
            }, z)
          }
          animate()


        })
      },
      // 滑动后提醒效果
      handleTips(key){
        let VNode = this.Bus[key]
        VNode.tips()
      },
      // 判断元素是否在可见区域；若元素高度小于可见区域，只需底部位于可见区最上即算在可见区域。
      isLook(element){
        let viewHeight = window.innerHeight|| document.documentElement.clientHeight||document.body.clientHeight;
        let position = element.getBoundingClientRect()
        let clientHeight = element.clientHeight
        let topY = element.offsetTop
        //let bottomY = topY+clientHeight
        let viewTop = document.documentElement.scrollTop
        //let viewBottom = document.documentElement.scrollTop+viewHeight

        let flag
        if(clientHeight>=viewHeight){
          flag = topY<viewTop
        } else {

          //flag = topY>viewTop&&bottomY<viewBottom-clientHeight
          flag = position.top<viewHeight&&position.top+clientHeight<viewHeight
        }

        return flag

      }
    }
  }
</script>

<style scoped>

</style>
