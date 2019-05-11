<template>
  <section class="exam_calendar">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop title="考试日历">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>
    </HeaderTop>

    <div class="exam_calendar_detail" v-if="examCalendar.length">
      <ul class="exam_calendar_detail_ul" v-for="(item, index) in examCalendar" :key="index">
        <li class="exam_calendar_time_li">
          <span class="exam_calendar_time">发布时间：{{item.noticeCreateTime | date-format}}</span>
        </li>
        <li class="message_li">
          <viewer>
            <img src="../../common/imgs/teacher2.jpg" alt="">
          </viewer>
          <span>
              <i class="iconfont iconxiazai41">考试公告</i>
              <br>
              您好，我是{{item.teaName}}，教工号是{{item.tno}}，现发布相关考试公告。
            <br>内容如下：
            <br>{{item.noticeContent}}
          </span>
        </li>

      </ul>

      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade" />

      <div class="bottom_tips" style="margin-top: 30px">
        <span>我是有底线的</span>
      </div>
    </div>

    <div v-else class="no_exam_calendar_detail">
      <div class="no_exam_calendar_detail_text">
        暂无考试公告
      </div>
    </div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import BackToTop from '../../components/BackToTop'
  import {reqExamCalendar} from '../../api'
  import {mapState} from 'vuex'
  export default {
    name: "",
    data() {
      return {
        myBackToTopStyle: {
          right: '15px',
          bottom: '15px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        }
      }
    },
    created(){
      this.$store.dispatch('getExamCalendar');
    },
    methods: {},
    components:{
      HeaderTop,
      BackToTop
    },
    computed:{
      ...mapState(['examCalendar'])
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .exam_calendar
    padding-top 45px
    .no_exam_calendar_detail
      .no_exam_calendar_detail_text
        width 100%
        height 50px
        display flex
        justify-content center
        align-items center
        font-size 20px
        background-color #fff
    .exam_calendar_detail
      list-style none
      background-color #f5f5f5
      padding-bottom 20px
      .exam_calendar_detail_ul
        padding 8px
        font-size 18px
        .exam_calendar_time_li
          width 100%
          display flex
          justify-content center
          padding-top 15px
          .exam_calendar_time
            display inline-block
            padding 5px
            color #8c8c8c
            font-size 14px
            background-color rgba(0,0,0,.1)
            border-radius 5px
      .message_li
        width 100%
        display flex
        padding-top 15px
        i
          font-weight bold
          color #02a774
        img
          width 50px
          height 50px
          border-radius 25px
        span
          display block
          max-width 220px
          line-height 25px
          background #fff
          padding 12px
          border-radius 10px
          margin 3px 10px 0 12px
          box-shadow 0 0 3px #ccc
          position relative
          &:after, &:before
            border solid transparent
            content ''
            width 0
            height 0
            position absolute
          &:after
            border-width 8px
            border-right-color #fff
            left -15px
            top 13px
          &:before
            border-width 9px
            border-right-color #ccc
            left -18px
</style>
