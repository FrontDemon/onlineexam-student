<template>
  <section class="profile_psw_change">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop title="密码修改">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>
    </HeaderTop>

    <div class="profile_psw_change_field">
      <mt-field label="原始密码" placeholder="请输入原始密码" type="password" v-model="password"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="newPassword"></mt-field>
      <mt-field label="确认新密码" placeholder="请再次输入新密码" type="password" v-model="newPasswordConfirm"></mt-field>
      <mt-button type="primary" size="large" @click="checkPswChange">确定</mt-button>
    </div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {reqPswChange} from '../../api'
  import {Toast, MessageBox} from 'mint-ui'
  export default {
    name: "",
    data() {
      return {
        sno:this.$store.state.userInfo.sno,
        password:'',
        newPassword:'',
        newPasswordConfirm:''
      }
    },
    methods: {
      async checkPswChange(){
        const {sno, password, newPassword, newPasswordConfirm} = this;
        let result = await reqPswChange({sno, password, newPassword, newPasswordConfirm});
        if (result.statu == 0) {
          Toast({
            message: '密码修改成功',
            iconClass: 'iconfont iconunie045',
            duration: 1500
          });
          this.$router.replace('/profile');
        }
/*        else if (result.msg == '会话失效，请重新登录'){
          MessageBox.confirm('会话失效，是否重新登录？').then(action => {
            //点击确定按钮操作
            //清空sessionStorage会话
            sessionStorage.clear();
            // 请求退出
            this.$store.dispatch('logout');
            Toast({
              message: '请重新登录系统',
              duration: 1500
            });
            this.$router.push('/login')
          },() => {
            //点击取消按钮操作
          })
        }*/
        else {
          Toast({
            message: result.msg,
            duration: 1500
          });
        }
      }
    },
    components:{
      HeaderTop
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .profile_psw_change
    padding-top 45px
    .profile_psw_change_field
      margin-top 15px
      .mint-button
        background-color #4ab8a1
        margin-top 15px
</style>
