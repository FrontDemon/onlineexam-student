<template>
  <div class="wrong">
    <HeaderTop :title="paperInfo.paperName" class="paper_header">
      <a href="javascript:" slot="left" class="go_back" @click="toBack()">
        <i class="iconfont iconfanhui"></i>
      </a>

      <div class="header_message" slot="right" @click="toPaperCard">
        <img src="../../common/imgs/wrong-card.png">
        <span>错题卡</span>
      </div>
    </HeaderTop>

    <!--收藏题目和当前题数-->
    <div class="wrong_sub_title">
      <span class="wrong_statistics">
        <i class="iconfont icontongji"></i>{{currentIndex + 1}}/{{queNumInfo.totalNum}}
      </span>
    </div>

    <!--考卷进度条提醒-->
    <div>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
    </div>

    <!--试卷问题及选项区域-->
    <div class="paper_container" v-show="showPaperContainer">
      <!--单选题列表-->
      <section class="que" v-for="(item, index) in singleQueList" :key="'single'+ item.singleId"
               v-show="index == currentIndex">
        <div class="content">
          <span class="que_type">
            (单选题)<img :src="isCollect == '0' ? require('../../common/imgs/no-collect.png') : require('../../common/imgs/yes-collect.png')" @click="clickCollect(item.isCollect,index, item.answerId)"/>
          </span>
          <span class="que_content">{{index + 1}}.&nbsp;{{item.singleContent}}<span class="que_score">[{{paperInfo.singleScore}}分]</span></span>

          <img :src="item.pictureSrc" alt="" style="width: 100%" v-if="item.pictureSrc">

          <div class="single_option" v-for="(option, optionIndex) in item.options"
               :key="'single'+ item.singleId + optionIndex">
            <mu-radio :value="option.value" v-model="item.singleAnswer" disabled :label="option.label" v-if="option.label"></mu-radio>
          </div>

          <div class="answer_row">正确答案：<span class="correct_answer">{{item.singleAnswer}}</span></div>
          <div class="answer_row">你的答案：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.stuAnswer || '你太优秀了，该题无作答'}}</span></div>
          <div class="answer_row">是否正确：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.isCorrect == '1' ? '正确' : '错误'}}</span></div>
          <div class="answer_row">答案解析：<span class="correct_answer">{{item.explain || '暂无解析呀老哥，给个解析呗'}}</span></div>
        </div>
      </section>

      <!--多选题列表-->
      <section class="que" v-for="(item, index) in multipleQueList" :key="'multiple'+ item.multipleId"
               v-show="(index + queNumInfo.singleNum) == currentIndex">
        <div class="content">
          <span class="que_type">
            (多选题)<img :src="isCollect == '0' ? require('../../common/imgs/no-collect.png') : require('../../common/imgs/yes-collect.png')" @click="clickCollect(item.isCollect,index, item.answerId)"/>
          </span>
          <span class="que_content">{{index + 1 + queNumInfo.singleNum}}.&nbsp;{{item.multipleContent}}<span class="que_score">[{{paperInfo.multipleScore}}分]</span></span>

          <img :src="item.pictureSrc" alt="" style="width: 100%" v-if="item.pictureSrc">

          <div class="multiple_option" v-for="(option, optionIndex) in item.options"
               :key="'multiple'+ item.multipleId + optionIndex">
            <mu-checkbox :value="option.value" v-model="item.multipleAnswerArray" disabled :label="option.label" v-if="option.label"></mu-checkbox>
          </div>

          <div class="answer_row">正确答案：<span class="correct_answer">{{item.multipleAnswer}}</span></div>
          <div class="answer_row">你的答案：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.stuAnswer || '你太优秀了，该题无作答'}}</span></div>
          <div class="answer_row">是否正确：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.isCorrect == '1' ? '正确' : '错误'}}</span></div>
          <div class="answer_row answer_explain">答案解析：<span class="correct_answer">{{item.explain || '暂无解析呀老哥，给个解析呗'}}</span></div>
        </div>
      </section>

      <!--判断题列表-->
      <section class="que" v-for="(item, index) in judgeQueList" :key="'judge'+ item.judgeId"
               v-show="(index + queNumInfo.singleNum + queNumInfo.multipleNum) == currentIndex">
        <div class="content">
          <span class="que_type">
            (判断题)<img :src="isCollect == '0' ? require('../../common/imgs/no-collect.png') : require('../../common/imgs/yes-collect.png')" @click="clickCollect(item.isCollect,index, item.answerId)"/>
          </span>
          <span class="que_content">{{index + 1 + queNumInfo.singleNum + queNumInfo.multipleNum}}.&nbsp;{{item.judgeContent}}<span class="que_score">[{{paperInfo.judgeScore}}分]</span></span>

          <div class="judge_option" v-for="(option, optionIndex) in item.options"
               :key="'judge'+ item.judgeId + optionIndex">
            <mu-radio :value="option.value" v-model="item.judgeAnswer" disabled :label="option.label" v-if="option.label"></mu-radio>
          </div>

          <div class="answer_row">正确答案：<span class="correct_answer">{{item.judgeAnswer}}</span></div>
          <div class="answer_row">你的答案：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.stuAnswer || '你太优秀了，该题无作答'}}</span></div>
          <div class="answer_row">是否正确：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.isCorrect == '1' ? '正确' : '错误'}}</span></div>
          <div class="answer_row">答案解析：<span class="correct_answer">{{item.explain || '暂无解析呀老哥，给个解析呗'}}</span></div>
        </div>
      </section>

      <!--填空题列表-->
      <section class="que" v-for="(item, index) in fillQueList" :key="'fill'+ item.fillId"
               v-show="(index + queNumInfo.singleNum + queNumInfo.multipleNum + queNumInfo.judgeNum) == currentIndex">
        <div class="content">
          <span class="que_type">
            (填空题)<img :src="isCollect == '0' ? require('../../common/imgs/no-collect.png') : require('../../common/imgs/yes-collect.png')" @click="clickCollect(item.isCollect,index, item.answerId)"/>
          </span>
          <span class="que_content">{{index + 1 + queNumInfo.singleNum + queNumInfo.multipleNum + queNumInfo.judgeNum}}.&nbsp;{{item.fillContent}}<span class="que_score">[{{paperInfo.fillScore}}分]</span></span>

          <div class="answer_row">正确答案：<span class="correct_answer">{{item.fillAnswer}}</span></div>
          <div class="answer_row">你的答案：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.stuAnswer || '你太优秀了，该题无作答'}}</span></div>
          <div class="answer_row">是否正确：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.isCorrect == '1' ? '正确' : '错误'}}</span></div>
          <div class="answer_row">答案解析：<span class="correct_answer">{{item.explain || '暂无解析呀老哥，给个解析呗'}}</span></div>
        </div>
      </section>

      <!--上一题和下一题按钮-->
      <div class="paper_button">
        <mt-button type="primary" @click.native="preItem"
                   :disabled="currentIndex < 1">{{currentIndex < 1 ? '无' :
          '上一题'}}
        </mt-button>
        <mt-button type="primary" @click.native="nextItem" :disabled="currentIndex == queNumInfo.totalNum-1">
          {{currentIndex == queNumInfo.totalNum-1 ? '到底了哥' : '下一题'}}
        </mt-button>
        </mt-button>
      </div>
    </div>

    <!--试卷答题卡区域-->
    <div class="paper_card" v-show="showPaperCard">

      <div class="card_title">
        错题卡（注意：绿色为答对题，红色为答错题）
      </div>

      <div class="card_options">
        <!--答题卡单选题-->
        <div class="options">
          <div class="options_title" style="padding-top: 15px" v-if="paperInfo.singleScore">
            单选题(每题{{paperInfo.singleScore}}分)
          </div>

          <div class="row">
            <div class="item" v-for="(singleItem, singleIndex) in singleQueList" :key="singleIndex">
              <div @click="toPaperQue(singleIndex + 1)"
                   :class="[singleItem.isCorrect == '1' ? 'correct_flag' : 'error_flag']"><span>{{singleIndex + 1}}</span></div>
            </div>
          </div>
        </div>

        <!--答题卡多选题-->
        <div class="options">
          <div class="options_title" v-if="paperInfo.multipleScore">
            多选题(每题{{paperInfo.multipleScore}}分)
          </div>

          <div class="row">
            <div class="item" v-for="(multipleItem, multipleIndex) in multipleQueList" :key="multipleIndex">
              <div @click="toPaperQue(multipleIndex + 1 + queNumInfo.singleNum)"
                   :class="[multipleItem.isCorrect == '1' ? 'correct_flag' : 'error_flag']"><span>{{multipleIndex + 1 + queNumInfo.singleNum}}</span>
              </div>
            </div>
          </div>
        </div>

        <!--答题卡判断题-->
        <div class="options">
          <div class="options_title" v-if="paperInfo.judgeScore">
            判断题(每题{{paperInfo.judgeScore}}分)
          </div>

          <div class="row">
            <div class="item" v-for="(judgeItem, judgeIndex) in judgeQueList" :key="judgeIndex">
              <div @click="toPaperQue(judgeIndex + 1 + queNumInfo.singleNum + queNumInfo.multipleNum)"
                   :class="[judgeItem.isCorrect == '1' ? 'correct_flag' : 'error_flag']"><span>{{judgeIndex + 1 + queNumInfo.singleNum + queNumInfo.multipleNum}}</span>
              </div>
            </div>
          </div>
        </div>

        <!--答题卡填空题-->
        <div class="options">
          <div class="options_title" v-if="paperInfo.fillScore">
            填空题(每题{{paperInfo.fillScore}}分)
          </div>

          <div class="row">
            <div class="item" v-for="(fillItem, fillIndex) in fillQueList" :key="fillIndex">
              <div @click="toPaperQue(fillIndex + 1 + queNumInfo.singleNum + queNumInfo.multipleNum + queNumInfo.judgeNum)"
                   :class="[fillItem.isCorrect == '1' ? 'correct_flag' : 'error_flag']">
                <span>{{fillIndex + 1 + queNumInfo.singleNum + queNumInfo.multipleNum + queNumInfo.judgeNum}}</span></div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {Toast, MessageBox} from 'mint-ui'
  import {reqPapersInfoByWrongPaperId, reqUpdatePaperAnswerIsCollect} from '../../api'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "",
    data() {
      return {
        //学号
        sno: this.$store.state.userInfo.sno,
        //路由传值paperId
        paperId: this.$route.params.paperId,
        //试卷信息
        paperInfo: {},
        //试卷问题类型数量
        queNumInfo: {},
        //单选题数组
        singleQueList: [],
        //多选题数组
        multipleQueList: [],
        //判断题数组
        judgeQueList: [],
        //填空题数组
        fillQueList: [],
        //是否显示paperContainer,默认进入页面为true
        showPaperContainer: true,
        //是否显示paperCard答题卡，默认进入页面为false，当点击答题卡区域为true
        showPaperCard: false,
        isCollect:'0',
        percentage:0 //进度条值
      }
    },
    created(){
      this.getPapersInfoByWrongPaperId();
    },
    computed:{
      ...mapState([
        'currentIndex'//当前题数
      ])
    },
    methods: {
      ...mapActions([
        'nextQue',//点击下一题
        'prevQue',//点击上一题
        'cardQue',//点击答题卡序号
        'refreshCurrentIndex'
      ]),
      async getPapersInfoByWrongPaperId(){
        const {sno, paperId} = this;
        let result = await reqPapersInfoByWrongPaperId({sno, paperId});
        if (result.statu == 0) {
          this.paperInfo = result.data.paperInfo;
          this.queNumInfo = result.data.queNumInfo;
          this.singleQueList = result.data.singleQueList;
          this.multipleQueList = result.data.multipleQueList;
          this.judgeQueList = result.data.judgeQueList;
          this.fillQueList = result.data.fillQueList;
          // this.isCollect = result.data.singleQueList[0].isCollect;
          this.percentage = parseInt((this.currentIndex+1)/this.queNumInfo.totalNum*100);
        }
        else {
          Toast({
            message: result.msg,
            duration: 1500
          });
        }
      },
      async updatePaperAnswerIsCollect(answerId, isCollect){
        let result = await reqUpdatePaperAnswerIsCollect(answerId, isCollect);
        if (result.statu == 0){
          return true;
        }
        else {
          return false;
        }
      },
      clickCollect(isCollect, index, answerId){
        if (this.isCollect == '0') {
          this.isCollect = '1';
          if (this.currentIndex < this.queNumInfo.singleNum){
            this.singleQueList[this.currentIndex].isCollect = '1';
          }
          else if (this.currentIndex < (this.queNumInfo.singleNum + this.queNumInfo.multipleNum)) {
            this.multipleQueList[this.currentIndex - this.queNumInfo.singleNum].isCollect = '1';
          }
          else if (this.currentIndex < (this.queNumInfo.singleNum + this.queNumInfo.multipleNum + this.queNumInfo.judgeNum)) {
            this.judgeQueList[this.currentIndex - this.queNumInfo.singleNum - this.queNumInfo.multipleNum].isCollect = '1';
          }
          else {
            this.fillQueList[this.currentIndex - this.queNumInfo.singleNum - this.queNumInfo.multipleNum - this.queNumInfo.judgeNum].isCollect = '1';
          }
          // this.singleQueList[index].isCollect = '1';
          // this.$set(this.singleQueList, index, item);
          // this.singleQueList.splice(index, 1, 1);
          if (this.updatePaperAnswerIsCollect(answerId, '1')) {
            Toast({
              message:'收藏成功',
              duration: 1000,
              position:'bottom'
            });
          }
        }
        else {
          this.isCollect = '0';
          if (this.currentIndex < this.queNumInfo.singleNum){
            this.singleQueList[this.currentIndex].isCollect = '0';
          }
          else if (this.currentIndex < (this.queNumInfo.singleNum + this.queNumInfo.multipleNum)) {
            this.multipleQueList[this.currentIndex - this.queNumInfo.singleNum].isCollect = '0';
          }
          else if (this.currentIndex < (this.queNumInfo.singleNum + this.queNumInfo.multipleNum + this.queNumInfo.judgeNum)) {
            this.judgeQueList[this.currentIndex - this.queNumInfo.singleNum - this.queNumInfo.multipleNum].isCollect = '0';
          }
          else {
            this.fillQueList[this.currentIndex - this.queNumInfo.singleNum - this.queNumInfo.multipleNum - this.queNumInfo.judgeNum].isCollect = '0';
          }
          // this.singleQueList[index].isCollect = '0';
          // this.$set(this.singleQueList, index, item);
          // this.singleQueList.splice(index, 1, 0);
          if (this.updatePaperAnswerIsCollect(answerId, '0')) {
            Toast({
              message:'已取消收藏',
              duration: 1000,
              position:'bottom'
            });
          }
        }
      },
      //点击上一题
      preItem() {
        this.prevQue();
      },
      //点击下一题
      nextItem() {
        this.nextQue();
      },
      //点击显示答题卡
      toPaperCard() {
        this.showPaperContainer = false;
        this.showPaperCard = true;
      },
      //点击显示试卷问题
      toPaperQue(index) {
        this.cardQue(index);
        this.showPaperCard = false;
        this.showPaperContainer = true;
      },
      toBack(){
        //清除sessionStorage数据
        sessionStorage.removeItem("currentIndex");
        //清除vuex数据
        this.refreshCurrentIndex(0);
        this.$router.goBack();
      }
    },
    components: {
      HeaderTop
    },
    watch:{
/*      singleQueList:{
        handler: function (newVal) {
          console.log(newVal)
        },
        deep: true    //深度监听
      }*/
      currentIndex() {
        this.percentage = parseInt((this.currentIndex+1)/this.queNumInfo.totalNum*100);
        if (this.currentIndex < this.queNumInfo.singleNum){
          this.isCollect = this.singleQueList[this.currentIndex].isCollect;
        }
        else if (this.currentIndex < (this.queNumInfo.singleNum + this.queNumInfo.multipleNum)) {
          this.isCollect = this.multipleQueList[this.currentIndex - this.queNumInfo.singleNum].isCollect;
        }
        else if (this.currentIndex < (this.queNumInfo.singleNum + this.queNumInfo.multipleNum + this.queNumInfo.judgeNum)) {
          this.isCollect = this.judgeQueList[this.currentIndex - this.queNumInfo.singleNum - this.queNumInfo.multipleNum].isCollect;
        }
        else {
          this.isCollect = this.fillQueList[this.currentIndex - this.queNumInfo.singleNum - this.queNumInfo.multipleNum - this.queNumInfo.judgeNum].isCollect;
        }
        sessionStorage.removeItem("currentIndex");
        sessionStorage.setItem("currentIndex",this.currentIndex)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .wrong
    width 100%
    padding-top 45px
    background-color #f5f5f5
    min-height 900px
    .paper_header
      background-color lightslategrey
      .go_back
        width 40px
      .header_message
        display flex
        flex-direction column
        justify-content center
        align-items center
        > img
          border-radius 2px
          height 24px
          width 24px
        > span
          font-size 12px
    .wrong_sub_title
      width 100%
      height 35px
      display flex
      flex-direction row-reverse
      align-items center
      background-color #4ab8a1
      font-size 16px
      > span
        display inline-block
        color #f5f5f5
      .wrong_statistics
        padding-right 15px
        .icontongji
          padding-right 10px
    .paper_container
      width 90%
      margin 15px auto
      margin-bottom 15px
      background-color #f5f5f5
      .que
        .content
          height 24px
          line-height 24px
          .answer_explain
            display inline
            padding-bottom 20px
          .answer_row
            height 28px
            line-height 28px
            .correct_answer
              color #4ab8a1
            .your_answer
              color #FF0000
          > span
            display block
          .que_type, .que_score
            color #4ab8a1
          .que_type
            display flex
            justify-content space-between
            align-items center
            >img
              height 18px
              width 18px
              padding-right 15px
          .que_content
            padding-bottom 10px
        .single_option,.multiple_option,.judge_option,.fill_option
          margin-top 25px
          margin-bottom 25px
      .paper_button
        position fixed
        z-index 100
        left 0
        right 0
        bottom 0
        width 100%
        display flex
        justify-content space-evenly
        .mint-button
          width 40%
          background-color #4ab8a1
    .paper_card
      background-color #f5f5f5
      padding-bottom 50px
      .card_title
        width 100%
        height 35px
        display flex
        justify-content center
        align-items center
        font-size 16px
        color #fff
        background-color #778899
      .card_options
        .options
          .options_title
            padding-left 15px
            color #4ab8a1
          .row
            display flex
            align-items center
            width 100%
            flex-wrap wrap
            margin-top 6px
            .item
              display flex
              justify-content center
              align-items center
              width 20%
              padding-top 10px
              padding-bottom 10px
              > div
                display flex
                justify-content center
                align-items center
                width 24px
                height 24px
                border 1px solid #778899
                border-radius 12px
                color #778899
              .correct_flag
                border 1px solid #4ab8a1
                background-color #4ab8a1
                color #fff
              .error_flag
                border 1px solid #FF0000
                background-color #FF0000
                color #fff
      .card_button
        .mint-button
          width 80%
          position fixed
          z-index 100
          left 10%
          right 0
          bottom 0
          background-color #4ab8a1
</style>
