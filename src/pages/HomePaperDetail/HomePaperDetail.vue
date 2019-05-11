<template>
  <section class="paper"
           v-loading="loading"
           element-loading-text="加载中..."
           element-loading-background="rgba(245, 245, 245, 1)">
    <!--顶部标题栏-->
    <HeaderTop title="试卷详情">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>

      <div class="header_message" slot="right">
        <viewer>
          <img src="../../common/imgs/paper-detail.png">
        </viewer>
      </div>
    </HeaderTop>

    <!--试卷名-->
    <div class="paper_name">
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

    <!--试卷详情-->
    <div class="paper_detail">
        <div class="paper_title">
          试卷名称：{{paperInfo.paperName}}
        </div>
        <div class="paper_type">
          <span style="color: #3caafd">
            <i class="iconfont iconleixing"></i>
            试卷类型：
          </span>
          {{paperInfo.paperType == 1 ? '随机组卷' : '固定组卷'}}
        </div>

        <div class="paper_create_time">
          <span style="color: #3caafd">
            <i class="iconfont iconshijian"></i>
            发布时间：
          </span>
          {{paperInfo.paperCreateTime | date-format}}
        </div>

        <div class="paper_total_que">
          <span style="color: #3caafd">
            <i class="iconfont iconquanbu"></i>
            全部题数：
          </span>
          {{queNumInfo.totalNum}}道
        </div>

        <div class="paper_duration">
          <span style="color: #3caafd">
            <i class="iconfont iconzhandoushichang"></i>
            考试时长：
          </span>
          {{Math.round(paperInfo.paperDuration/60)}}分钟
        </div>

        <div class="paper_total_score">
          <span style="color: #3caafd">
            <i class="iconfont iconzongfen"></i>
            试卷总分：
          </span>
          {{totalScore}}分
        </div>

        <div class="paper_pass">
          <span style="color: #3caafd">
            <i class="iconfont iconbiaozhunhua"></i>
            及格标准：
          </span>
          {{Math.round(totalScore*0.6)}}分
        </div>

        <div class="paper_difficulty">
          <span style="color: #3caafd">
            <i class="iconfont iconxishu"></i>
            <span>难度系数：</span>
          </span>
          <Star :score="paperInfo.paperDifficulty" :size="24" />
        </div>

        <div class="paper_participate">
          <span style="color: #3caafd">
            <i class="iconfont iconcanjia"></i>
            参加人数：
          </span>
          {{paperInfo.participateNum}}人
        </div>

        <div class="paper_que_type">
          <span style="color: #3caafd">
            <i class="iconfont icontixing"></i>
            题型介绍：
          </span>
          单选题{{queNumInfo.singleNum}}道每题{{paperInfo.singleScore}}分，多选题{{queNumInfo.multipleNum}}道每题{{paperInfo.multipleScore}}分，判断题{{queNumInfo.judgeNum}}道每题{{paperInfo.judgeScore}}分，填空题{{queNumInfo.fillNum}}道每题{{paperInfo.fillScore}}分
        </div>

        <div class="paper_attention">
          <span style="color: #3caafd">
            <i class="iconfont iconzhuyi"/>
            注意事项：
          </span>
          {{paperInfo.paperAttention}}
        </div>
      </div>

    <!--点击试卷开始按钮-->
    <div class="paper_start">
        <mt-button type="primary" :class="{'complete_flag':currentPaperStatus == 1 ? true : false}" @click.native="toStartPaper" :disabled="currentPaperStatus == 1 ? true : false">
          {{currentPaperStatus == 1 ? '已完成' : '开始考试'}}
        </mt-button>
      </div>
  </section>
</template>

<script>
  import {reqPapersInfoByPaperId, reqCurrentPaperStatus} from '../../api'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Star from '../../components/Star/Star.vue'
  import {Toast, MessageBox, Indicator} from 'mint-ui'
  import { mapState } from 'vuex'
  export default {
    name: "",
    data() {
      return {
        sno:this.$store.state.userInfo.sno,
        paperId:this.$route.params.paperId,
        paperInfo:{},
        queNumInfo:{},
        currentPaperStatus:0,
        loading: false
      }
    },
    created(){
      this.loading = true
      this.getPaperInfoByPaperId();
      this.getCurrentPaperStatus();
      setTimeout(() => {
        this.loading = false
      }, 800)
    },
    computed: {
      optionLeft () {
        return {
          direction: 2,
          limitMoveNum: 2,
          // hoverStop: false
        }
      },
      ...mapState(['examCalendar']),
      totalScore(){
        return this.queNumInfo.singleNum*this.paperInfo.singleScore + this.queNumInfo.multipleNum*this.paperInfo.multipleScore + this.queNumInfo.judgeNum*this.paperInfo.judgeScore + this.queNumInfo.fillNum*this.paperInfo.fillScore
      }
    },
    methods: {
      // 通过paperId获取试卷详情信息
      async getPaperInfoByPaperId(){
        const {paperId} = this;
        let result = await reqPapersInfoByPaperId({paperId});
        if (result.statu === 0){
          this.paperInfo = result.data.paperInfo;
          this.queNumInfo = result.data.queNumInfo;
        }
        else {
          Toast({
            message:result.msg,
            duration: 2000
          });
        }
      },
      // 获取当前试卷的状态，判断是否禁用开始考试按钮
      async getCurrentPaperStatus(){
        const {sno, paperId} = this;
        let result = await reqCurrentPaperStatus({sno, paperId});
        if (result.statu === 0){
          this.currentPaperStatus = result.data;
        }
        else {
          this.currentPaperStatus = 0;
        }
      },
      // 点击开始考试按钮
      toStartPaper(){
        MessageBox.confirm('确定开始考试吗?').then(action => {
          Toast({
            message:'请开始作答',
            duration: 1500
          });
          this.$router.replace('/home/paper/detail/start/' + this.paperId)
        },() => {
          //点击取消按钮操作
        })
      }
    },
    components:{
      HeaderTop,
      Star
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .paper
    padding-top 45px
    padding-bottom 20px
    width 100%
    background-color #f5f5f5
    .paper_name
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
    .paper_detail
      width 80%
      margin 0 auto
      margin-bottom 20px
      padding 20px
      background-color #fff
      background-image url("../../common/imgs/paper-center-top.png"), url("../../common/imgs/paper-right-top.png"), url("../../common/imgs/corner-mark-must.png")
      background-size 50px 18px, 40px 40px, 40px 40px
      background-repeat no-repeat, no-repeat, no-repeat
      background-position 50% 2.5%, 100% 0%, 0% 0%
      border-radius 5px
      box-shadow 0 0 3px #ccc
      .paper_title
        height 50px
        line-height 50px
        font-size 16px
        display flex
        justify-content center
        border-bottom 2px solid rgba(153, 153, 153, .3)
      .paper_type
        height 30px
        line-height 30px
        font-size 14px
        color #999
        margin-top 10px
      .paper_create_time, .paper_duration, .paper_total_score, .paper_pass, .paper_participate, .paper_total_que
        height 30px
        line-height 30px
        font-size 14px
        color #999
      .paper_difficulty
        height 30px
        line-height 30px
        font-size 14px
        color #999
        .star
          display inline-block
          float none
      .paper_que_type, .paper_attention
        line-height 20px
        font-size 14px
        color #999
        margin-top 8px
      .paper_attention
        margin-top 10px
    .paper_start
      width 91%
      margin 0 auto
      .mint-button
        width 100%
        background-color #4ab8a1
      .complete_flag
        background-color #4ab8a1
</style>
