<template>
  <section class="paper">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop :title="languageInfoById.langName">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>

      <div class="header_message" slot="right">
        <viewer>
          <img :src="languageInfoById.langImgSrc">
        </viewer>
      </div>
    </HeaderTop>

    <div class="lang_desc">
      <span>{{languageInfoById.langDesc}}</span>
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

    <div class="search_btn" @click="showPopup = true" v-show="showSearchBtn">
      <mu-button fab color="teal" >
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </div>

    <div class="paper_screen">
      <mt-popup v-model="showPopup" position="bottom" style="width: 100%">
        <div class="popup_div">
          <div class="click_event">
            <span @click="showPopup = false">取消</span>
            <span @click="correctSearch">筛选</span>
          </div>
          <div class="popup_item">
            <span>试卷类型</span>
            <el-select v-model="paperTypeValue" placeholder="请选择">
              <el-option
                v-for="(item, index) in paperTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="popup_item">
            <span>最低试卷难度</span>
            <el-rate v-model="minDifficulty"></el-rate>
          </div>
          <div class="popup_item">
            <span>最高试卷难度</span>
            <el-rate v-model="maxDifficulty"></el-rate>
          </div>
          <div class="popup_item">
            <span>最少参加人数</span>
            <el-input-number v-model="minJoinNum" :min="0"></el-input-number>
          </div>
          <div class="popup_item">
            <span>最多参加人数</span>
            <el-input-number v-model="maxJoinNum" :min="0"></el-input-number>
          </div>
        </div>
      </mt-popup>
    </div>

    <!--<transition-group enter-active-class="bounceIn" :duration="{enter:200}">-->
      <mt-loadmore v-if="papersInfo.length" :top-method="loadTop" ref="loadmore">
        <div class="paper_list"  v-for="(item, index) in papersInfo" :key="item.paperId">
          <div class="paper_list_item" :class="{'corner_top': index == 0, 'corner_new':index == 1, 'corner_hot':item.participateNum > 10}">
            <div class="paper_title">
              试卷名称：{{item.paperName}}
            </div>
            <div class="paper_type">
              试卷类型：{{item.paperType == 1 ? '随机组卷' : '固定组卷'}}
            </div>
            <div class="paper_create_time">
              发布时间：{{item.paperCreateTime | date-format}}
            </div>
            <div class="paper_difficulty">
              <span>难度系数：</span>
              <Star :score="item.paperDifficulty" :size="24" />
            </div>
            <div class="paper_participate">
              <div class="paper_participate_left">
                <img src="../../common/imgs/person.png" alt=""><span style="color: #FF0000">{{item.participateNum}}</span>人参加
              </div>
              <div class="paper_participate_right">
                <mt-button size="small" type="primary" @click.native="toPaperDetail(item.paperId)">查看详情</mt-button>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_tips">
          <span>我是有底线的</span>
        </div>
      </mt-loadmore>
    <!--</transition-group>-->

    <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade" />

    <!--animate动画-->
    <transition enter-active-class="bounceIn" :duration="{enter:500}">
      <div class="no_paper_list animated" v-show="isPaperList">
        <img src="../../common/imgs/nopaper.png" alt="">
        <h3>{{noPaperTip}}</h3>
      </div>
    </transition>

  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import BackToTop from '../../components/BackToTop'
  import {reqLanguageInfoById, reqPapersInfo} from '../../api'
  import {Toast} from 'mint-ui'
  import Star from '../../components/Star/Star.vue'
  import { mapState } from 'vuex'
  export default {
    name: "",
    data() {
      return {
        topStatus: '',
        myBackToTopStyle: {
          right: '37px',
          bottom: '90px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#909399'// 按钮的背景颜色 The background color of the button
        },
        langId:this.$route.params.langId,
        languageInfoById:{},
        papersInfo:[],
        isPaperList:false,
        loading:false,
        minJoinNum:0,//筛选最低参加人数
        maxJoinNum:0,//筛选最高参加人数
        minDifficulty:0,//筛选最低试卷难度
        maxDifficulty:0,//筛选最高试卷难度
        paperTypeValue:'',//选中试卷类型
        paperTypeOptions:[//筛选试卷类型
          {
            value: '1',
            label: '随机组卷'
          },
          {
            value: '2',
            label: '固定组卷'
          },
          {
            value: '3',
            label: '全部类型'
          }
        ],
        showPopup:false,
        noPaperTip:'暂无发布相关试卷',
        showSearchBtn: false
      }
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
    created(){
      this.getLanguageInfoById();
      this.getPapersInfo();
    },
    methods: {
      loadTop() {
        this.getPapersInfo()
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded()
        }, 1000)
      },
      async getLanguageInfoById(){
        this.loading = true;
        const {langId} = this;
        let result = await reqLanguageInfoById({langId});
        if (result.statu == 0){
          this.languageInfoById = result.data;
        }
        else {
          Toast({
            message:result.msg,
            duration: 2000
          });
        }
      },
      async getPapersInfo(){
        const {langId} = this;
        let result = await reqPapersInfo({langId});
        if (result.statu == 0){
          this.papersInfo = result.data;
          if (this.papersInfo.length <= 2){
            this.showSearchBtn = false;
          } else {
            this.showSearchBtn = true;
          }
        }
        else if (result.msg == '试卷列表为空') {
          this.showSearchBtn = false;
          this.isPaperList = true;
        }
        else {
          Toast({
            message:result.msg,
            duration: 2000
          });
        }
      },
      toPaperDetail(paperId){
        this.$router.push('/home/paper/detail/' + paperId)
      },
      async correctSearch(){
        const {langId} = this;
        let result = await reqPapersInfo({langId});
        if (result.statu == 0){
          let papersInfo = result.data;
          if (this.paperTypeValue === '' || this.paperTypeValue === '3'){
            this.papersInfo = papersInfo.filter(item => item.paperDifficulty >= this.minDifficulty &&
              item.paperDifficulty <= this.maxDifficulty &&
              item.participateNum >= this.minJoinNum &&
              item.participateNum <= this.maxJoinNum);
          }
          else {
            this.papersInfo = papersInfo.filter(item => item.paperType === parseInt(this.paperTypeValue) &&
              item.paperDifficulty >= this.minDifficulty &&
              item.paperDifficulty <= this.maxDifficulty &&
              item.participateNum >= this.minJoinNum &&
              item.participateNum <= this.maxJoinNum);
          }
          // console.log(this.papersInfo)
          this.showPopup = false;
/*          this.paperTypeValue = '';
          this.minDifficulty = 0;
          this.maxDifficulty = 0;
          this.minJoinNum = 0;
          this.maxJoinNum = 0;*/
        }
        if (!this.papersInfo.length) {
          this.noPaperTip = '该筛选暂无结果';
          this.isPaperList = true;
        }
        else {
          this.noPaperTip = '暂无发布相关试卷';
          this.isPaperList = false;
        }
      }
    },
    components:{
      HeaderTop,
      Star,
      BackToTop
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .paper
    padding-top 45px
    width 100%
    background-color #f5f5f5
    .paper_screen
      width 100%
      .popup_div
        padding 15px
        .click_event
          display flex
          justify-content space-between
          padding-bottom 15px
          span
            color #1989fa
        .popup_item
          display flex
          justify-content space-between
          align-items center
          height 50px
          span
            color #4b4b4b
    .mint-spinner-snake
      position absolute
      top 50%
      left 50%
    .lang_desc
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
          width 710px
          li
            float left
            margin-right 10px
    .search_btn
      position fixed
      bottom 20px
      right 30px
      z-index 1000
      opacity .7
    .paper_list
      width 100%
      display flex
      flex-direction column
      .paper_list_item
        width 80%
        margin 0 auto
        margin-bottom 20px
        padding 20px
        background-color #fff
        background-image url("../../common/imgs/paper-center-top.png"), url("../../common/imgs/paper-right-top.png"), url("../../common/imgs/paper.png")
        background-size 50px 18px, 40px 40px, 32px 32px
        background-repeat no-repeat, no-repeat, no-repeat
        background-position 50% 5%, 100% 0%, 85% 40%
        border-radius 5px
        box-shadow 0 0 3px #ccc
        &.corner_top
          background-image url("../../common/imgs/paper-center-top.png"), url("../../common/imgs/paper-right-top.png"), url("../../common/imgs/paper.png"), url("../../common/imgs/corner-mark-top.png")
          background-size 50px 18px, 40px 40px, 32px 32px ,40px 40px
          background-repeat no-repeat, no-repeat, no-repeat, no-repeat
          background-position 50% 5%, 100% 0%, 85% 40%, 0% 0%
        &.corner_new
          background-image url("../../common/imgs/paper-center-top.png"), url("../../common/imgs/paper-right-top.png"), url("../../common/imgs/paper.png"), url("../../common/imgs/corner-mark-new.png")
          background-size 50px 18px, 40px 40px, 32px 32px ,40px 40px
          background-repeat no-repeat, no-repeat, no-repeat, no-repeat
          background-position 50% 5%, 100% 0%, 85% 40%, 0% 0%
        &.corner_hot
          background-image url("../../common/imgs/paper-center-top.png"), url("../../common/imgs/paper-right-top.png"), url("../../common/imgs/paper.png"), url("../../common/imgs/corner-mark-hot.png")
          background-size 50px 18px, 40px 40px, 32px 32px ,40px 40px
          background-repeat no-repeat, no-repeat, no-repeat, no-repeat
          background-position 50% 5%, 100% 0%, 85% 40%, 0% 0%
        .paper_title
          height 50px
          line-height 50px
          font-size 16px
        .paper_type
          height 30px
          line-height 30px
          font-size 14px
          color #999
        .paper_create_time
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
        .paper_participate
          height 50px
          line-height 50px
          font-size 16px
          display flex
          justify-content space-between
          .paper_participate_left
            color lightslategray
            display flex
            align-items center
            >img
              width 25px
              height 25px
    .no_paper_list
      display flex
      flex-direction column
      align-items center
      padding-top 100px
      >h3
        font-size 17px
        color #6a6a6a
</style>
