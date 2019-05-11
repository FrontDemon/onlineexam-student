<template>
  <div id="app">
    <!-- 设置路由组件的视图位置 -->
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <!-- 并放置非路由组件 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import { mapState } from 'vuex'
  export default {
    data(){
      return {
        transitionName: 'slide-right',  // 默认动态路由变化为slide-right
        socket: ''
      }
    },
    computed: {
      ...mapState([ 'userInfo' ])
    },
    components:{
      FooterGuide
    },
    created(){
/*      try {
        document.body.removeChild(document.getElementById('appLoading'));
   /!*     setTimeout(function() {
          document.getElementById('app').style.display = 'block';
        }, 500)*!/
      } catch (e) {

      }*/
      //刷新页面时从sessionStorage中取出userInfo
      //如果sessionStorage中有userInfo则取出
      if (sessionStorage.getItem("userInfo")) {
        var user = JSON.parse(sessionStorage.getItem("userInfo"));
        // 将user保存到vuex的state
        this.$store.dispatch('recordUser', user);
      }
      //刷新页面时从sessionStorage中取出feedbackInfo
      //如果sessionStorage中有feedbackInfo则取出
      if (sessionStorage.getItem("feedbackInfo")) {
        var feedbackInfo = JSON.parse(sessionStorage.getItem("feedbackInfo"));
        // 将反馈信息保存到vuex的state
        this.$store.dispatch('recordFeedbackInfo', feedbackInfo);
      }
      //刷新页面时从sessionStorage中取出examCalendar
      //如果sessionStorage中有examCalendar则取出
      if (sessionStorage.getItem("examCalendar")) {
        var examCalendar = JSON.parse(sessionStorage.getItem("examCalendar"));
        // 将反馈信息保存到vuex的state
        this.$store.dispatch('recordExamCalendar', examCalendar);
      }

      //考试页面刷新若sessionStorage有对应数据从sessionStorage取出数据放入
      if (sessionStorage.getItem("currentIndex")) {
        this.$store.dispatch('refreshCurrentIndex', (Number)(sessionStorage.getItem("currentIndex")))
      }
      if (sessionStorage.getItem("singleAnswers")) {
        this.$store.dispatch('refreshSingleAnswers', JSON.parse(sessionStorage.getItem("singleAnswers")))
      }
      if (sessionStorage.getItem("multipleAnswers")) {
        this.$store.dispatch('refreshMultipleAnswers', JSON.parse(sessionStorage.getItem("multipleAnswers")))
      }
      if (sessionStorage.getItem("judgeAnswers")) {
        this.$store.dispatch('refreshJudgeAnswers', JSON.parse(sessionStorage.getItem("judgeAnswers")))
      }
      if (sessionStorage.getItem("fillAnswers")) {
        this.$store.dispatch('refreshFillAnswers', JSON.parse(sessionStorage.getItem("fillAnswers")))
      }
      if (sessionStorage.getItem("firstCurrentTime")) {
        this.$store.dispatch('refreshFirstCurrentTime', (Number)(sessionStorage.getItem("firstCurrentTime")))
      }
    },
    watch: {
      '$route' (to, from) {
        let isBack = this.$router.isBack;  //  监听路由变化时的状态为前进还是后退
        if (from.path === '/profile' && to.path === '/search' || from.path === '/profile' && to.path === '/wrong'
          || from.path === '/profile' && to.path === '/home'
          || from.path === '/search' && to.path === '/wrong'
          || from.path === '/search' && to.path === '/home'
          || from.path === '/wrong' && to.path === '/home') {
   /*       console.log(from.path);
          console.log(to.path);*/
          this.transitionName = 'slide-right'
        } else if(isBack) {
          // console.log(isBack);
          this.transitionName = 'slide-right'
        } else if (to.path.length < from.path.length) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        // console.log(this.transitionName);
        this.$router.isBack = false
      },
      userInfo(newValue) {
        if (JSON.stringify(newValue) !== '{}') {
          // 初始化
          this.init()
        } else {
          // 销毁监听
          this.socket.onclose = this.close()
        }
      }
    },
    destroyed() {
      // 销毁监听
      this.socket.onclose = this.close()
    },
    methods: {
      init: function() {
        if (typeof (WebSocket) === undefined) {
          this.$message.error('您的浏览器不支持socket')
        } else {
          if (JSON.parse(sessionStorage.getItem("userInfo"))) {
            // 实例化socket
            this.socket = new WebSocket(process.env.BASE_WEBSOCKET + JSON.parse(sessionStorage.getItem("userInfo")).sno)
            // 监听socket连接
            this.socket.onopen = this.open
            // 监听socket错误信息
            this.socket.onerror = this.error
            // 监听socket消息
            this.socket.onmessage = this.getMessage
          } else {
            // console.log('请先登录系统')
          }
        }
      },
      open: function() {
        console.log('socket连接成功')
      },
      error: function() {
        console.log('连接错误')
      },
      getMessage: function(msg) {
        if (msg.data === '留言' && this.$route.path !== '/profile/replydetail') {
          console.log(msg.data)
          // 更新消息列表
          setTimeout(() => {
            this.$store.dispatch('getUnreadMsgCount')
            this.$store.dispatch('receiveFeedbackInfo')
          }, 1000)
        }
        if (msg.data === '公告') {
          console.log(msg.data)
          // 更新公告列表
          setTimeout(() => {
            this.$store.dispatch('getExamCalendar')
          }, 1000)
        }
      },
      send: function(message) {
        // 群发消息
        this.socket.send(message + '|0')
      },
      close: function() {
        console.log('socket已经关闭')
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  // 整个应用组件的样式
  #app
    width 100%
    min-height 100vh
    background #f5f5f5
/*    .v-enter
      opacity 0
      transform translateX(100%)
    .v-leave-to
      opacity 0
      transform translateX(-100%)
      position absolute
    .v-enter-active,.v-leave-active
      transition all 0.5s ease*/
    .Router
      position absolute
      width 100%
      transition all .5s ease
    .slide-left-enter, .slide-right-leave-active
      opacity 0
      -webkit-transform translate(100%, 0)
      transform translate(100%, 0)
    .slide-left-leave-active, .slide-right-enter
      opacity 0
      -webkit-transform translate(-100%, 0)
      transform translate(-100% 0)
</style>
