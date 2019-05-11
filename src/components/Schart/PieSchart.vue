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
        canvasId: 'myCanvasPie',
        type: 'pie',
        options: {
          padding: 15,                   // canvas 内边距
          bgColor: '#f5f5f5',            // 默认背景颜色
          title: '花费时间与考试时长',// 图表标题
          titleColor: '#000000',         // 图表标题颜色
          titlePosition: 'bottom',      // 图表标题位置: top / bottom
          legendColor: '#000000',         // 图例文本颜色
          legendTop: 10,               // 图例距离顶部的长度
          colorList: [ '#FF4949', '#13CE66', '#F7BA2A', '#72f6ff', '#1E9FFF'],   // 环形图颜色列表
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
