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
        canvasId: 'myCanvasLine',
        type: 'line',
        options: {
          padding: 15,                   // canvas 内边距
          bgColor: '#f5f5f5',            // 默认背景颜色
          title: '参加该试题成绩排行',// 图表标题
          titleColor: '#000000',         // 图表标题颜色
          titlePosition: 'bottom',      // 图表标题位置: top / bottom
          yEqual: 4,                     // y轴分成4等分
          fillColor: '#ff4949',          // 默认填充颜色
          contentColor: '#778899',       // 内容横线颜色
          axisColor: '#666666',          // 坐标轴颜色
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
    width 95%
    height 260px
</style>
