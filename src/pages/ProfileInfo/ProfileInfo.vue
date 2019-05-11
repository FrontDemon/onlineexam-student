<template>
  <section class="profile_info">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop title="个人信息">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>
    </HeaderTop>

    <!--个人信息展示-->
    <mt-cell title="头像（点击可预览）">
      <viewer>
        <img :src="userInfo.stuImgSrc ? userInfo.stuImgSrc : require('../../common/imgs/profile.jpg')"
             alt="头像" class="profile_img">
        <!--<img src="../../common/imgs/profile.jpg" alt="头像" class="profile_img" v-else>-->
      </viewer>
      <i class="iconfont iconjiantou"></i>
    </mt-cell>
    <mt-cell title="学号" :value="userInfo.sno"/>
    <mt-cell title="姓名" :value="userInfo.stuName"/>
    <mt-cell title="性别" :value="userInfo.stuSex"/>
    <mt-cell title="邮箱" :value="userInfo.stuEmail || '暂无绑定邮箱'"/>
    <mt-cell title="手机号" :value="userInfo.stuPhone || '暂无绑定手机号'"/>
    <mt-cell title="注册时间" :value="userInfo.stuCreateTime | date-format"/>
    <mt-cell title="最近登录时间" :value="userInfo.stuLastLoginTime | date-format"/>
    <mt-cell title="账号状态" :value="userInfo.stuStatus ? '正常' : '禁用'"/>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {mapState} from 'vuex'
  export default {
    name: "",
    data() {
      return {}
    },
    methods: {},
    components:{
      HeaderTop
    },
    computed:{
      ...mapState(['userInfo'])
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .profile_info
    width 100%
    padding-top 45px
    .iconfont
      font-size 25px
    .profile_img
      width 24px
      height 24px
      border-radius 50%
</style>
