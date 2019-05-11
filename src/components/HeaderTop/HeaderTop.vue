<template>
  <header class="header">
    <!-- 插槽是父组件与子组件的通讯方式，子组件中的slot可以显示父组件传递给子组件的内容 -->
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  // 外部组件传递给此组件的属性
  props: {
    title: String
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .header
    background-color lightslategrey
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .go_back
      width 18%
      height 100%
      display flex
      justify-content center
      align-items center
      color #fff
    .header_message
      img
        width 30px
        height 30px
        background-color #fff
        border-radius 50%
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .iconsousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
        .profile_img
          width 30px
          height 30px
          border-radius 50%
    .header_message
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      color #fff
      .header_message_text
        .iconfont
          font-size 24px
        .mint-badge
          position absolute
          bottom 14px
          left 10px
</style>
