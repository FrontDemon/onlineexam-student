<template>
  <div class="profile_reply_detail">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop title="消息列表">
      <a href="javascript:" slot="left" class="go_back" @click="goBack">
        <i class="iconfont iconxiazai6"></i>返回
      </a>
    </HeaderTop>

    <div class="reply_detail">
        <ul v-if="feedbackInfo.length" class="reply_detail_ul" v-for="(item, index) in feedbackInfo" :key="index">
          <li class="feedback_time_li">
            <span class="feedback_time">{{item.feedbackCreateTime | date-format}}</span>
          </li>
          <li class="message_li message_li_stu">
            <viewer>
              <img :src="userInfo.stuImgSrc ? userInfo.stuImgSrc : require('../../common/imgs/profile.jpg')" alt="学生头像">
            </viewer>
            <!--<span class="span_stu">加油继续努力加油继续努力加油继续努力加油继续努力加油继续努力加油继续努力加油继续努力</span>-->
            <span v-html="item.feedbackContent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)" class="span_stu"></span>
          </li>
          <li class="feedback_time_li" v-if="item.ano">
            <span class="feedback_time">{{item.replyTime | date-format}}</span>
          </li>
          <li class="message_li" v-if="item.ano">
            <viewer>
              <img src="../../common/imgs/admin.png" alt="" class="imgleft">
            </viewer>
            <!--<span>加油继续努力加油继续努力加油继续努力加油继续努力加油继续努力加油继续努力加油继续努力</span>-->
            <span>
              <i class="iconfont iconxiazai41 i_read" v-if="item.feedbackStatus === '2' ? true : false">已读</i>
              <i class="iconfont iconxiazai41 i_noread" v-else>未读</i>
              <br>
              您好，我是管理员{{item.admName}}，工号是{{item.ano}}，您的反馈留言已经给您答复。<br>回答内容是：
              <p v-html="item.admAnswer.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></p>
            </span>
          </li>
        </ul>

      <div class="input_send">
        <i class="iconfont iconyuyin1" @click="clickVoice"></i>
        <mt-field type="text" style="width: 200px;touch-action: none;" v-model="feedback"></mt-field>
        <i class="iconfont iconbiaoqing" id="emotionBtn" @click="clickEmotion" :style="{ color: showEmotion?'#6ba7f0':''}"></i>
        <mt-button type="primary" @click.native="sendFeedback">发送</mt-button>
      </div>

      <div v-show="showEmotion" id="emotionDiv" style="z-index: 1000;position: fixed;bottom: 50px;right: 0;left: 0;background-color: #f5f5f5">
        <emotion @emotion="handleEmotion" :height="200"></emotion>
      </div>

      <!--包含表情内容效果显示区域-->
      <!-- /\#[\u4E00-\u9FA5]{1,3}\;/gi 匹配出含 #XXX; 的字段 -->
      <!--<p v-html="feedback.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></p>-->
    </div>

    <!--<div v-else class="no_reply_detail">
      <div class="no_reply_detail_text">
        暂无消息记录
      </div>
      <img src="../../common/imgs/nomessage.jpg" alt="" style="width: 100%;height: 100%">
      <mt-button size="large" type="primary" @click.native="$router.push('/profile/feedback')">前往反馈留言请点击</mt-button>
    </div>-->
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Emotion from '../../components/Emotion/index.vue'
  import { mapState } from 'vuex'
  import { reqSendFeedback, reqUpdateFeedbackStatus } from '../../api'
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    name: "",
    data() {
      return {
        sno:this.$store.state.userInfo.sno,
        feedback:'',
        path: process.env.BASE_WEBSOCKET + this.$store.state.userInfo.sno,
        socket: '',
        showEmotion: false
      }
    },
    mounted() {
      // 初始化
      this.init()
      setTimeout(() => {
        this.scrollToBottom()
      }, 300)
      document.addEventListener('click', (e) => {
        if (!$(e.target).closest("#emotionBtn,#emotionDiv").length) {
          this.showEmotion = false
        }
      })
    },
    destroyed() {
      // 销毁监听
      this.socket.onclose = this.close()
    },
    computed:{
      ...mapState(['userInfo', 'feedbackInfo'])
    },
    watch: {
      feedbackInfo() {
        this.scrollToBottom()
      }
    },
    methods: {
      // 将页面滚动到最底部的方法
      scrollToBottom() {
        this.$nextTick(() => {
          document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
        })
      },
      goBack(){
        this.$router.goBack();
      },
      async sendFeedback() {
        const {sno, feedback} = this;
        let result = await reqSendFeedback({sno, feedback});
        if (result.statu == 0) {
          Toast({
            message: result.msg,
            iconClass: 'iconfont iconunie045',
            duration: 1500
          });
          this.feedbackInfo.push({admAnswer:'',admName:'',ano:'',
            feedbackContent:this.feedback,feedbackCreateTime:new Date(),feedbackId:999999,
            feedbackStatus:2,replyTime:'',sno:this.sno,stuName:this.userInfo.stuName});
          this.feedback = '';
        }
        else if (result.msg == '会话失效，请重新登录') {
          MessageBox.confirm('会话失效，是否重新登录？').then(action => {
            //点击确定按钮操作
            //清空sessionStorage会话
            sessionStorage.clear();
            // 请求退出
            this.$store.dispatch('logout');
            Toast('请重新登录系统');
            this.$router.push('/login')
          }, () => {
            //点击取消按钮操作
          })
        }
        else {
          Toast({
            message: result.msg,
            position: 'bottom',
            duration: 1500
          });
        }
      },
      init: function() {
        if (typeof (WebSocket) === undefined) {
          this.$message.error('您的浏览器不支持socket')
        } else {
          // 实例化socket
          this.socket = new WebSocket(this.path)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
        }
      },
      open: function() {
        console.log('socket连接成功')
      },
      error: function() {
        console.log('连接错误')
      },
      getMessage: function(msg) {
        console.log(msg.data)
        if (msg.data === '留言' && this.$route.path === '/profile/replydetail') {
          console.log('更新留言状态了')
          // 更新留言状态
          this.updateFeedbackStatus(() => {
            // 更新消息列表
            this.$store.dispatch('receiveFeedbackInfo')
          })
        }
      },
      send: function(message) {
        // 群发消息
        this.socket.send(message + '|0')
      },
      close: function() {
        console.log('socket已经关闭')
      },
      async updateFeedbackStatus(callback){
        const {sno} = this
        const result = await reqUpdateFeedbackStatus({sno})
        /*Toast({
          message: '您有' + result.data + '条新的回复消息',
          position: 'bottom',
          duration: 1500
        });*/
        return callback&&callback()
      },
      clickEmotion() {
        this.showEmotion = !this.showEmotion
      },
      clickVoice() {
        Toast({
          message: '暂不支持发送语音',
          duration: 1500
        });
      },
      handleEmotion (i) {
        this.feedback += i
      },
      // 将匹配结果替换表情图片
      emotion (res) {
        let word = res.replace(/\#|\;/gi,'')
        const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
        let index = list.indexOf(word)
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" style="position: relative;top: 4px">`
      }
    },
    components:{
      HeaderTop,
      Emotion
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .profile_reply_detail
    padding-top 45px
    .no_reply_detail
      .no_reply_detail_text
        width 100%
        height 50px
        display flex
        justify-content center
        align-items center
        font-size 20px
        background-color #fff
      img
        margin-bottom 20px
    .reply_detail
      list-style none
      background-color #f5f5f5
      padding-bottom 80px
      .input_send
        background-color #f5f5f5
        top-border-1px(#e4e4e4)
        position fixed
        z-index 1000
        right 0
        bottom 0
        left 0
        width 100%
        height 40px
        padding 5px
        box-shadow 0px 0px 1px rgba(0,0,0,.5)
        display flex
        justify-content space-evenly
        align-items center
        i
          font-size 30px
        .mint-button
          background-color #02a774
          margin-right 5px
      .reply_detail_ul
        padding 8px
        font-size 18px
        .feedback_time_li
          width 100%
          display flex
          justify-content center
          padding-top 15px
          .feedback_time
            display inline-block
            padding 5px
            color #8c8c8c
            font-size 14px
            background-color rgba(0,0,0,.1)
            border-radius 5px
        .message_li
          width 100%
          display flex
          flex-direction row
          padding-top 15px
          i
            font-weight bold
          .i_read
            color #02a774
          .i_noread
            color red
          img
            width 50px
            height 50px
            border-radius 25px
          span
            display block
            max-width 220px
            line-height 25px
            /*letter-spacing 2px*/
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
        .message_li_stu
          flex-direction row-reverse
          margin-right 50px
          .span_stu
            background-color #9eea6a
            position relative
            &:after, &:before
              border solid transparent
              content ''
              width 0
              height 0
              position absolute
            &:after
              border-width 8px
              border-left-color #9eea6a
              left 99.5%
            &:before
              border-width 9px
              border-left-color #ccc
              left 100%
</style>
