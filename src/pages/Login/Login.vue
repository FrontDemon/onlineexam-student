<template>
  <section class="login-container">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop title="在线考试系统学生端">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>

      <div class="header_message" slot="right">
        <viewer>
          <img src="../../common/imgs/school.jpg">
        </viewer>
      </div>
    </HeaderTop>

    <!--显示登录注册页面Vue标志图标-->
    <div class="login-logo">
      <viewer>
        <img src="../../common/imgs/college.jpg" class="logo_img">
      </viewer>
    </div>

    <!--实现登录功能-->
    <!--<transition name="el-fade-in">-->
    <div class="login-wrap" v-show="showLogin">
        <mt-field label="学号" placeholder="请输入12位数字学号" v-model="sno" :state="snoState" @blur.native.capture="checkSno"/>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="stuPsw" :state="pswState" @blur.native.capture="checkPsw" @keyup.enter.native="checkLogin"/>
        <mt-button type="primary" size="large" @click.native="checkLogin">登录</mt-button>

        <div class="toggle-login">
          <span @click="toRegister">没有账号？马上注册</span>
          <span @click="toFindPsw">忘记密码？</span>
        </div>
      </div>
    <!--</transition>-->

    <!--实现注册功能-->
    <!--<transition name="el-fade-in">-->
    <div class="register-wrap" v-show="showRegister">
      <!--<p v-show="showTishi">{{tips}}</p>-->
      <mt-field label="学号" placeholder="请输入12位数字学号" v-model="newSno" :state="newSnoState"
                @blur.native.capture="checkNewSno"/>
      <mt-field label="密码" placeholder="请输入至少6位数字密码" type="password" v-model="newPsw" :state="newPswState"
                @blur.native.capture="checkNewPsw"/>
      <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="newPswConfirm"
                :state="newPswConfirmState" @blur.native.capture="checkNewPswConfirm"/>
      <mt-field label="姓名" placeholder="请输入姓名" v-model="newName" :state="newNameState"
                @blur.native.capture="checkNewName"/>

      <mt-field label="邮箱" placeholder="请输入邮箱" v-model="newEmail" :state="newEmailState"
                @blur.native.capture="checkNewEmail"/>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="newPhone"
                :state="newPhoneState" @blur.native.capture="checkNewPhone"/>
      <mt-field label="安全码" placeholder="用于密码找回至少6位数字" type="password" v-model="newSecurityCode"
                :state="newSecurityCodeState" @blur.native.capture="checknewSecurityCode"/>
      <mt-field label="确认安全码" placeholder="请再次输入安全码" type="password" v-model="newSecurityCodeConfirm"
                :state="newSecurityCodeConfirmState" @blur.native.capture="checknewSecurityCodeConfirm"
                @keyup.enter.native="stuRegister"/>
      <mt-button type="primary" size="large" @click.native="stuRegister">注册</mt-button>

      <div class="toggle-register">
        <span @click="toLogin">已有账号？马上登录</span>
        <span @click="toFindPsw">忘记密码？</span>
      </div>
    </div>
    <!--</transition>-->

    <!--实现找回密码功能-->
    <div class="find-psw-wrap" v-show="showFindPsw">
      <mt-field label="学号" placeholder="请输入12位数字学号" v-model="findSno"
                :state="findSnoState" @blur.native.capture="checkfindSno"/>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="findPhone"
                :state="findPhoneState" @blur.native.capture="checkfindPhone">
        <button class="get-captcha" @click="getCaptcha">获取验证码</button>
      </mt-field>
      <mt-field label="安全码" placeholder="请输入安全码校验找回" type="password" v-model="findSecurityCode"
                :state="findSecurityCodeState" @blur.native.capture="checkfindSecurityCode"/>
      <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="findNewPsw"
                :state="findNewPswState" @blur.native.capture="checkfindNewPsw"/>
      <mt-field label="确认新密码" placeholder="请再次输入新密码" type="password" v-model="findNewPswConfirm"
                :state="findNewPswConfirmState" @blur.native.capture="checkfindNewPswConfirm"
                @keyup.enter.native="stuFindPsw"/>
      <mt-button type="primary" size="large" @click="stuFindPsw">找回密码</mt-button>

      <div class="toggle-find-psw">
        <span @click="toLogin">已有账号？马上登录</span>
        <span @click="toRegister">没有账号？马上注册</span>
      </div>
    </div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {reqLogin, reqRegister, reqFindPsw} from '../../api'
  import {Toast, MessageBox} from 'mint-ui'
  export default {
    name: "",
    data() {
      return {
        showLogin: true,
        showRegister: false,
        showFindPsw:false,
        sno: '',
        snoState:'',
        stuPsw: '',
        pswState:'',
        newSno: '',
        newSnoState:'',
        newPsw: '',
        newPswState:'',
        newPswConfirm:'',
        newPswConfirmState:'',
        newName:'',
        newNameState:'',
        newEmail:'',
        newEmailState:'',
        newPhone:'',
        newPhoneState:'',
        newSecurityCode:'',
        newSecurityCodeState:'',
        newSecurityCodeConfirm:'',
        newSecurityCodeConfirmState:'',
        findSno:'',
        findSnoState:'',
        findPhone:'',
        findPhoneState:'',
        findSecurityCode:'',
        findSecurityCodeState:'',
        findNewPsw:'',
        findNewPswState:'',
        findNewPswConfirm:'',
        findNewPswConfirmState:''
      }
    },
    methods: {
      // 登录校验学号
      checkSno(){
        if (this.sno === '') {
          this.snoState = '';
        }
        else if (!/^\d{12}$/.test(this.sno)){
          this.snoState = 'error';
        }
        else{
          this.snoState = 'success';
        }
      },
      // 登录校验密码
      checkPsw(){
        if (this.sno === '') {
          this.pswState = '';
        }
        else if (this.stuPsw.length < 6){
          this.pswState = 'error';
        }
        else {
          this.pswState = 'success';
        }
      },
      // 异步学生登录
      async checkLogin(){
        const {sno, stuPsw} = this;
        let result = await reqLogin({sno, stuPsw});
        if (result.statu == 0) {
          const user = result.data;
          Toast({
            message: '登录成功',
            iconClass: 'iconfont iconunie045',
            duration: 1500
          });
          //将数据存储到sessionStorage中，防止刷新页面自动退出
          sessionStorage.setItem("userInfo",JSON.stringify(user));
          // 将user保存到vuex的state
          this.$store.dispatch('recordUser', user);
          // 去个人中心界面
          this.$router.replace('/profile')
        }
        else {
          Toast({
            message: result.msg,
            duration: 1500
          });
        }
      },
      //点击展示登录面板
      toLogin(){
        this.sno = '';
        this.snoState = '';
        this.stuPsw = '';
        this.pswState = '';
        this.showLogin = true;
        this.showRegister = false;
        this.showFindPsw = false;
      },
      //点击展示注册面板
      toRegister(){
        this.newSno = '';
        this.newSnoState = '';
        this.newPsw = '';
        this.newPswState = '';
        this.newPswConfirm = '';
        this.newPswConfirmState = '';
        this.newName = '';
        this.newNameState = '';
        this.newEmail = '';
        this.newEmailState = '';
        this.newPhone = '';
        this.newPhoneState = '';
        this.newSecurityCode = '';
        this.newSecurityCodeState = '';
        this.newSecurityCodeConfirm = '';
        this.newSecurityCodeConfirmState = '';
        this.showLogin = false;
        this.showRegister = true;
        this.showFindPsw = false;
      },
      //点击展示找回密码面板
      toFindPsw(){
        this.findSno = '';
        this.findSnoState = '';
        this.findPhone = '';
        this.findPhoneState = '';
        this.findSecurityCode = '';
        this.findSecurityCodeState = '';
        this.findNewPsw = '';
        this.findNewPswState = '';
        this.findNewPswConfirm = '';
        this.findNewPswConfirmState = '';
        this.showLogin = false;
        this.showRegister = false;
        this.showFindPsw = true;
      },
      // 注册校验学号
      checkNewSno(){
        if (this.newSno === '') {
          this.newSnoState = '';
        }
        else if (!/^\d{12}$/.test(this.newSno)){
          this.newSnoState = 'error';
        }
        else {
          this.newSnoState = 'success';
        }
      },
      // 注册校验密码
      checkNewPsw(){
        if (this.newPsw === '') {
          this.newPswState = '';
        }
        else if (this.newPsw.length >= 6){
          this.newPswState = 'success';
        }
        else {
          this.newPswState = 'error';
        }
      },
      //注册校验再次输入密码
      checkNewPswConfirm(){
        if (this.newPswConfirm === '') {
          this.newPswConfirmState = '';
        }
        else if (this.newPswConfirm.length >= 6 && this.newPswConfirm === this.newPsw){
          this.newPswConfirmState = 'success';
        }
        else {
          this.newPswConfirmState = 'error';
        }
      },
      //注册校验姓名
      checkNewName(){
        if (this.newName === ''){
          this.newNameState = '';
        }
        else {
          this.newNameState = 'success';
        }
      },
      //注册校验邮箱
      checkNewEmail(){
        if (this.newEmail === '') {
          this.newEmailState = '';
        }
        else if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.newEmail)){
          this.newEmailState = 'error';
        }
        else {
          this.newEmailState = 'success';
        }
      },
      //注册校验手机号
      checkNewPhone(){
        if (this.newPhone === '') {
          this.newPhoneState = '';
        }
        else if (!/^1[34578]\d{9}$/.test(this.newPhone)){
          this.newPhoneState = 'error';
        }
        else {
          this.newPhoneState = 'success';
        }
      },
      //注册校验安全码
      checknewSecurityCode(){
        if (this.newSecurityCode === '') {
          this.newSecurityCodeState = '';
        }
        else if (this.newSecurityCode.length >= 6){
          this.newSecurityCodeState = 'success';
        }
        else {
          this.newSecurityCodeState = 'error';
        }
      },
      //注册校验再次输入安全码
      checknewSecurityCodeConfirm(){
        if (this.newSecurityCodeConfirm === '') {
          this.newSecurityCodeConfirmState = '';
        }
        else if (this.newSecurityCodeConfirm.length >= 6 && this.newSecurityCodeConfirm === this.newSecurityCode){
          this.newSecurityCodeConfirmState = 'success';
        }
        else {
          this.newSecurityCodeConfirmState = 'error';
        }
      },
      //异步学生注册
      async stuRegister(){
        const {newSno, newPsw, newPswConfirm, newName, newEmail, newPhone, newSecurityCode, newSecurityCodeConfirm} = this;
        let result = await reqRegister({newSno, newPsw, newPswConfirm, newName, newEmail, newPhone, newSecurityCode, newSecurityCodeConfirm});
        if (result.statu == 0) {
          MessageBox.confirm('注册成功，是否自动登录?').then(action => {
            //点击确定按钮操作
            this.sno = this.newSno
            this.stuPsw = this.newPsw
            this.checkLogin();
          },() => {
            //点击取消按钮操作
            this.newSno = '';
            this.newSnoState = '';
            this.newPsw = '';
            this.newPswState = '';
            this.newPswConfirm = '';
            this.newPswConfirmState = '';
            this.newName = '';
            this.newNameState = '';
            this.newEmail = '';
            this.newEmailState = '';
            this.newPhone = '';
            this.newPhoneState = '';
            this.newSecurityCode = '';
            this.newSecurityCodeState = '';
            this.newSecurityCodeConfirm = '';
            this.newSecurityCodeConfirmState = '';
          })
        }
        else {
          Toast({
            message: result.msg,
            duration: 1500
          });
        }
      },
      //获取验证码按钮点击事件函数
      getCaptcha(){
        Toast({
          message: '没钱接入短信验证码平台哈哈哈...将就用免费的安全码找回呗',
          duration: 2000,
          position:'bottom'
        });
      },
      //找回密码校验学号
      checkfindSno(){
        if (this.findSno === '') {
          this.findSnoState = '';
        }
        else if (!/^\d{12}$/.test(this.findSno)){
          this.findSnoState = 'error';
        }
        else {
          this.findSnoState = 'success';
        }
      },
      //找回密码校验学号
      checkfindPhone(){
        if (this.findPhone === '') {
          this.findPhoneState = '';
        }
        else if (!/^1[34578]\d{9}$/.test(this.findPhone)){
          this.findPhoneState = 'error';
        }
        else {
          this.findPhoneState = 'success';
        }
      },
      //找回密码校验学号
      checkfindSecurityCode(){
        if (this.findSecurityCode === '') {
          this.findSecurityCodeState = '';
        }
        else if (this.findSecurityCode.length >= 6){
          this.findSecurityCodeState = 'success';
        }
        else {
          this.findSecurityCodeState = 'error';
        }
      },
      //找回密码校验学号
      checkfindNewPsw(){
        if (this.findNewPsw === '') {
          this.findNewPswState = '';
        }
        else if (this.findNewPsw.length >= 6){
          this.findNewPswState = 'success';
        }
        else {
          this.findNewPswState = 'error';
        }
      },
      //找回密码校验学号
      checkfindNewPswConfirm(){
        if (this.findNewPswConfirm === '') {
          this.findNewPswConfirmState = '';
        }
        else if (this.findNewPswConfirm.length >= 6 && this.findNewPswConfirm === this.findNewPsw){
          this.findNewPswConfirmState = 'success';
        }
        else {
          this.findNewPswConfirmState = 'error';
        }
      },
      //异步学生找回密码
      async stuFindPsw(){
        const {findSno, findPhone, findSecurityCode, findNewPsw, findNewPswConfirm} = this;
        let result = await reqFindPsw({findSno, findPhone, findSecurityCode, findNewPsw, findNewPswConfirm});
        if (result.statu == 0) {
          MessageBox.confirm('设置新密码成功，是否跳转到登录页面?').then(action => {
            //点击确定按钮操作
            this.toLogin();
          },() => {
            //点击取消按钮操作
            this.findSno = '';
            this.findSnoState = '';
            this.findPhone = '';
            this.findPhoneState = '';
            this.findSecurityCode = '';
            this.findSecurityCodeState = '';
            this.findNewPsw = '';
            this.findNewPswState = '';
            this.findNewPswConfirm = '';
            this.findNewPswConfirmState = '';
          })
        }
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
  .login-container
    padding-top 45px
    background-color #f5f5f5
    >h3
      padding 20px
    .login-logo
      width 90%
      margin 20px auto
      text-align center
      margin-bottom 20px
      background-image url("../../common/imgs/java.png"), url("../../common/imgs/cplus.png"), url("../../common/imgs/php.png"), url("../../common/imgs/android.png"), url("../../common/imgs/h5.png"), url("../../common/imgs/ios.png"), url("../../common/imgs/js.png"), url("../../common/imgs/python.png")
      background-size 50px 50px, 50px 50px, 50px 50px, 50px 50px, 44px 44px, 32px 32px, 28px 28px, 32px 32px
      background-repeat no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat
      background-position 2% 5%, 95% 5%, 90% 40%, 12% 42%, 95% 80%, 5% 78%, 80% 100%, 18% 100%
      .logo_img
        width 160px
        height 160px
        border-radius 80px
    .login-wrap
      width 90%
      margin 0 auto
      .mint-button
        background-color #4ab8a1
        margin-top 15px
        margin-bottom 15px
      .toggle-login
        display flex
        justify-content space-between
        color #4ab8a1
    .register-wrap
      width 90%
      margin 0 auto
      padding-bottom 80px
      .mint-button
        background-color #4ab8a1
        margin-top 15px
        margin-bottom 15px
      .toggle-register
        display flex
        justify-content space-between
        color #4ab8a1
    .find-psw-wrap
      width 90%
      margin 0 auto
      padding-bottom 80px
      .get-captcha
        height 30px
        background-color #4ab8a1
        color #fff
        border-radius 2px
        border 0
      .mint-button
        background-color #4ab8a1
        margin-top 15px
        margin-bottom 15px
      .toggle-find-psw
        display flex
        justify-content space-between
        color #4ab8a1
</style>
