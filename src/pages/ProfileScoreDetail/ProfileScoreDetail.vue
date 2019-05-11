<template>
  <section class="score_detail">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop title="成绩报告">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>
    </HeaderTop>

    <!--试卷标题-->
    <div class="paper_title">
      <span>{{paperInfo.paperName}}</span>
    </div>

    <!--教师公告无缝跑马灯-->
    <div class="notices_run">
      <i class="iconfont iconxiazai41"></i>

      <vue-seamless-scroll :data="examCalendar" :class-option="optionLeft" class="seamless-warp2">
        <ul class="item">
          <li>
            最新公告消息:{{examCalendar[0].noticeContent}}
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>

    <!--成绩报告图表-->
    <div class="score_chart">
      <RingSchart :chartData="chartDataRingScore"/>
      <BarSchart :chartData="chartDataBarCorrect"/>
      <LineSchart :chartData="chartDataLineRanking"/>
      <div class="score_text">
        <p>
          <span>你的分数：<span>{{myScore}}</span>分</span>
          <span>当前排名：第<span>{{ranking}}</span>名</span>
        </p>
        <p>
          <span>最高分：<span>{{maxScore}}</span>分</span>
          <span>最低分：<span>{{minScore}}</span>分</span>
        </p>
        <p>
          <span>平均分：<span>{{averageScore}}</span>分</span>
          <span>参加总人数：<span>{{chartDataLineRanking.length}}</span>人</span>
        </p>
        <div>
          <el-progress type="circle" :percentage="percentage" status="text"><span>{{myScore}}</span>分</el-progress>
        </div>
        <div class="percentage_title">你的分数与试卷总分比例</div>
      </div>
      <PieSchart :chartData="chartDataPieTime"/>
      <div class="bottom_tips" style="margin-top: 35px">
        <span>我是有底线的</span>
      </div>
    </div>

    <!--点击返回顶部按钮-->
    <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade" />
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import RingSchart from '../../components/Schart/RingSchart.vue'
  import BarSchart from '../../components/Schart/BarSchart.vue'
  import LineSchart from '../../components/Schart/LineSchart.vue'
  import PieSchart from '../../components/Schart/PieSchart.vue'
  import BackToTop from '../../components/BackToTop'
  import {reqScoreReport} from '../../api'
  import {Toast, Indicator} from 'mint-ui'
  import { mapState } from 'vuex'
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
        },
        sno:this.$store.state.userInfo.sno,
        paperId:this.$route.params.paperId,
        chartDataRingScore: [
          {name: '单选题', value: 20},
          {name: '多选题', value: 10},
          {name: '判断题', value: 4},
          {name: '填空题', value: 6},
        ],
        chartDataBarCorrect:[
          {name: '单选题20道', value: 5},
          {name: '多选题5道', value: 2},
          {name: '判断题5道', value: 1},
          {name: '填空题5道', value: 3},
        ],
        chartDataLineRanking:[],
        chartDataPieTime:[],
        paperInfo:{},
        myScore:0,
        maxScore:0,
        minScore:0,
        ranking:0,
        percentage:0,
        averageScore:0
      }
    },
    created(){
      Indicator.open({
        text: '报告生成中...',
        spinnerType: 'snake'
      });
      this.getScoreReport();
    },
    computed: {
      optionLeft () {
        return {
          direction: 2,
          limitMoveNum: 2,
          // hoverStop: false
        }
      },
      ...mapState(['examCalendar'])
    },
    methods: {
      // 获取成绩报告数据
      async getScoreReport(){
        const {sno, paperId} = this;
        let result = await reqScoreReport({sno, paperId});
        if (result.statu == 0){
          this.chartDataRingScore = result.data.chartDataRingScore;
          this.chartDataBarCorrect = result.data.chartDataBarCorrect;
          this.chartDataLineRanking = result.data.chartDataLineRanking;
          this.chartDataPieTime = result.data.chartDataPieTime;
          this.paperInfo = result.data.paperInfo;
          //全部人分数
          var score = 0;
          this.chartDataLineRanking.forEach((item, index) => {
            score += item.value;
            if (item.name == '我'){
              this.myScore = item.value;
              this.ranking = this.chartDataLineRanking.length - index;
            }
          });
          this.maxScore = this.chartDataLineRanking[this.chartDataLineRanking.length - 1].value;
          this.minScore = this.chartDataLineRanking[0].value;
          this.percentage = this.myScore/result.data.totalScore*100;
          // this.averageScore = (score/this.chartDataLineRanking.length).toFixed(2);
          this.averageScore = Math.round(score/this.chartDataLineRanking.length);
          setTimeout(() => {
            Indicator.close();
          }, 500)
        }
        else {
          Indicator.close();
          Toast({
            message:result.msg,
            duration: 1500
          });
        }
      }
    },
    components:{
      HeaderTop,
      RingSchart,
      BarSchart,
      LineSchart,
      PieSchart,
      BackToTop
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .score_detail
    padding-top 45px
    width 100%
    background-color #f5f5f5
    padding-bottom 20px
    .paper_title
      width 100%
      height 35px
      display flex
      justify-content center
      align-items center
      font-size 16px
      color #fff
      background-color #4ab8a1
    .notices_run
      display flex
      justify-content center
      align-items center
      background-color rgba(125,125,125,.3)
      color lightcoral
      margin-bottom 20px
      i
        margin-right 10px
        font-weight bolder
      .seamless-warp2
        overflow hidden
        height 30px
        line-height 30px
        width 300px
        font-size 14px
        border-radius 30px
        ul
          width 700px
          li
            float left
            margin-right 10px
    .score_chart
      .score_text
        padding 15px
        div
          display flex
          justify-content center
          span
            color #FF0000
        .percentage_title
          height 30px
          line-height 30px
          font-weight 120px
        p
          height 28px
          line-height 28px
          display flex
          justify-content space-between
          span
            span
              color #FF0000
</style>
