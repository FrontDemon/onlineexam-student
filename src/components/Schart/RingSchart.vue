<template>
  <div>
    <schart class="wrapper" :canvasId="canvasId" :type="type" :data="chartData" :options="options"/>
  </div>
</template>

<script>
  import Schart from 'vue-schart'
  export default {
    props:["chartData"],
    name: "",
    data() {
      return {
        canvasId: 'myCanvasRing',
        type: 'ring',
        options: {
          padding: 15,                   // canvas 内边距
          bgColor: '#f5f5f5',            // 默认背景颜色
          title: '四种题型得分情况',// 图表标题
          titleColor: '#000000',         // 图表标题颜色
          titlePosition: 'bottom',      // 图表标题位置: top / bottom
          legendColor: '#000000',         // 图例文本颜色
          legendTop: 10,               // 图例距离顶部的长度
          colorList: ['#1E9FFF', '#13CE66', '#F7BA2A', '#FF4949', '#72f6ff'],   // 环形图颜色列表
          radius: 70,                     // 环形图外圆半径
          innerRadius: 40            // 环形图内圆半径
        }
      }
    },
    methods: {},
    components:{
      Schart
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    width 100%
    height 260px
</style>
