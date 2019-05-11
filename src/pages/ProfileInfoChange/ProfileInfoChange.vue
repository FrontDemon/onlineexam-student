<template>
  <section class="profile_info_change">
    <!--利用$router.back()返回上一级路由 -->
    <HeaderTop title="信息修改">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconxiazai6"></i>返回
      </a>
    </HeaderTop>

    <!--个人信息修改-->
    <div class="profile_info_change_field">
      <label for="fileInput">
        <mt-cell :title="stuImg" is-link>
          <!--<img :src="stuImgSrc" class="profile_img" v-if="userInfo.sno">-->
          <!--<img src="../../common/imgs/profile.jpg" class="profile_img" v-else>-->
          <img :src="stuImgSrc ? stuImgSrc : require('../../common/imgs/profile.jpg')" class="profile_img">
        </mt-cell>
      </label>
      <input v-show="false" type="file" id="fileInput" class="img_file"
             accept="image/jpeg,image/jpg,image/png,image/gif" @change="getImgFile" ref="imgFile">
      <mt-cell title="姓名" :value="stuName" is-link @click.native="changeName"></mt-cell>
      <mt-cell title="姓别" :value="stuSex" is-link @click.native="changeSex"></mt-cell>
      <mt-cell title="邮箱" :value="stuEmail" is-link @click.native="changeEmail"></mt-cell>
      <mt-cell title="手机号" :value="stuPhone" is-link @click.native="changePhone"></mt-cell>
      <mt-button type="primary" size="large" @click.native="changeInfo">保存修改</mt-button>
    </div>

  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {Toast, MessageBox } from 'mint-ui'
  import {mapState} from 'vuex'
  import {reqInfoChange, reqUserInfoBySno} from '../../api'
  export default {
    name: "",
    data() {
      return {
        stuImg:'点击上传头像',
        stuImgSrc:this.$store.state.userInfo.stuImgSrc,
        stuName:this.$store.state.userInfo.stuName,
        stuSex:this.$store.state.userInfo.stuSex,
        stuEmail:this.$store.state.userInfo.stuEmail,
        stuPhone:this.$store.state.userInfo.stuPhone,
        tempImgSrc:this.$store.state.userInfo.stuImgSrc
      }
    },
    methods: {
      changeName(){
        MessageBox.prompt('修改姓名','',{inputValue: this.stuName,
          inputValidator:function(v){return v !== '';},
          inputErrorMessage:'姓名不能为空'}).then(({ value, action }) => {
          this.stuName = value;
        },() => {});
      },
      changeSex(){
        MessageBox.prompt('修改姓别','',{inputValue: this.stuSex,
          inputValidator:function(v){return v == '男' || v == '女';},
          inputErrorMessage:'请输入男或者女'}).then(({ value, action }) => {
          this.stuSex = value;
        },() => {});
      },
      changeEmail(){
        MessageBox.prompt('修改邮箱','',{inputValue: this.stuEmail,
          inputValidator:function(v){return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(v);},
          inputErrorMessage:'请输入正确的邮箱'}).then(({ value, action }) => {
          this.stuEmail = value;
        },() => {});
      },
      changePhone(){
        MessageBox.prompt('修改手机号','',{inputValue: this.stuPhone,
          inputValidator:function(v){return /^1[34578]\d{9}$/.test(v);},
          inputErrorMessage:'请输入正确的手机号'}).then(({ value, action }) => {
          this.stuPhone = value;
        },() => {});
      },
      async changeInfo(){
        // 声明一个FormData对象，有file以表单方式发送请求
        var formData = new window.FormData();
        const {stuName, stuSex, stuEmail, stuPhone} = this;
        var stuImgSrc = this.$refs.imgFile.files[0];
        if (typeof stuImgSrc !== 'undefined' && stuImgSrc.size > 4194304) {
          // console.log(stuImgSrc.size)
          Toast({
            message: '请选择4M以内的图片',
            duration: 1500
          });
        } else {
          formData.append('stuImgSrc',stuImgSrc);
          formData.append('stuName',this.stuName);
          formData.append('stuSex',this.stuSex);
          formData.append('stuEmail',this.stuEmail);
          formData.append('stuPhone',this.stuPhone);
          formData.append('sno',this.$store.state.userInfo.sno);
          // console.log(formData.get('stuImgSrc'))
          let result = await reqInfoChange(formData);
          if (result.statu == 0){
            var user = result.data;
            // console.log(this.tempImgSrc)
            user.stuImgSrc = this.tempImgSrc;
            this.$store.dispatch('recordUser', user);
            //更新sessionStorage中userInfo
            sessionStorage.setItem("userInfo",JSON.stringify(user));
            Toast({
              message: result.msg,
              iconClass: 'iconfont iconunie045',
              duration: 1500
            });
            this.$router.push('/profile');
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
        }
      },
      getImgFile(){
        if (typeof this.$refs.imgFile.files[0] === 'undefined') {
          Toast({
            message: '若无法上传头像，可能是由于微信内置浏览器暂不支持Android版上传文件，请点击右上角选择其他浏览器打开',
            iconClass: 'iconfont iconxinxi',
            duration: 4000
          });
        }
        if (this.$refs.imgFile.value) {
          var _self = this;
          this.stuImg = '头像路径：' + this.$refs.imgFile.value;
          //前端实现上传头像预览
          var fileObj = this.$refs.imgFile;
          var file = fileObj.files[0];
          var fReader = new FileReader();
          fReader.readAsDataURL(file);
          fReader.onload = function () {
            _self.tempImgSrc = this.result;
            _self.stuImgSrc = this.result;
          }
        }
/*        else {
          this.stuImg = '点击上传头像';
          this.stuImgSrc = 'data:image/png;base64,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'
        }*/
      }
    },
    components:{
      HeaderTop
    },
    computed:{
      ...mapState(['userInfo'])
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .profile_info_change
    padding-top 45px
    .profile_info_change_field
      .profile_img
        width 24px
        height 24px
        border-radius 50%
      .mint-button
          background-color #4ab8a1
          margin-top 15px
      .img_file
        width 60%
        background-color #fff
        position absolute
        top 55px
        left 70px
</style>
