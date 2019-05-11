/*
  路由模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
VueRouter.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1)
};
// 引入路由组件文件夹下的组件
// import Home from '../pages/Home/Home.vue'
// import Wrong from '../pages/Wrong/Wrong.vue'
// import Search from '../pages/Search/Search.vue'
// import Profile from '../pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'
import ProfileInfo from '@/pages/ProfileInfo/ProfileInfo.vue'
import ProfileStuScore from '@/pages/ProfileStuScore/ProfileStuScore.vue'
import ProfileWrongCollection from '@/pages/ProfileWrongCollection/ProfileWrongCollection.vue'
import SingleCollection from '@/pages/ProfileCollectionDetail/SingleCollection.vue'
import MultipleCollection from '@/pages/ProfileCollectionDetail/MultipleCollection.vue'
import JudgeCollection from '@/pages/ProfileCollectionDetail/JudgeCollection.vue'
import FillCollection from '@/pages/ProfileCollectionDetail/FillCollection.vue'
import ProfileScoreDetail from '@/pages/ProfileScoreDetail/ProfileScoreDetail.vue'
import ProfilePswChange from '@/pages/ProfilePswChange/ProfilePswChange.vue'
import ProfileInfoChange from '@/pages/ProfileInfoChange/ProfileInfoChange.vue'
import ProfileFeedback from '@/pages/ProfileFeedback/ProfileFeedback.vue'
import ProfileReplyDetail from '@/pages/ProfileReplyDetail/ProfileReplyDetail.vue'
import ProfileExamCalendar from '@/pages/ProfileExamCalendar/ProfileExamCalendar.vue'
import HomePaper from '@/pages/HomePaper/HomePaper.vue'
import HomePaperDetail from '@/pages/HomePaperDetail/HomePaperDetail.vue'
import HomePaperStart from '@/pages/HomePaperStart/HomePaperStart.vue'
import WrongDetail from '@/pages/WrongDetail/WrongDetail.vue'
/*import PaperContainer from '../pages/HomePaperStart/PaperContainer/PaperContainer.vue'
import PaperCard from '../pages/HomePaperStart/PaperCard/PaperCard.vue'*/

// 路由组件懒加载
const Home = () => import('@/pages/Home/Home.vue')
const Wrong = () => import('@/pages/Wrong/Wrong.vue')
const Search = () => import('@/pages/Search/Search.vue')
const Profile = () => import('@/pages/Profile/Profile.vue')

Vue.use(VueRouter)

// 配置路由表并导出
export default new VueRouter({
  //  去掉地址中的哈希#
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name:'Home',
      component: Home,
      // 此时的Home等都是返回路由组件的函数，只有请求对应的路由路径时(第一次)才会执行此函数并加载路由组件
      // 标识此路由是否显示FooterGuide
      meta: {
        showFooter: true
      }
    },
    {
      path:'/home/paper/:langId',
      component:HomePaper
    },
    {
      path:'/home/paper/detail/:paperId',
      component:HomePaperDetail
    },
    {
      path:'/home/paper/detail/start/:paperId',
      component:HomePaperStart,
/*      children:[
        {
          path:'papercontainer',
          component:PaperContainer
        },
        {
          path:'papercard',
          component:PaperCard
        },
        {
          path:'',
          redirect: 'papercontainer'
        }
      ]*/
    },

    {
      path:'/wrong',
      name:'Wrong',
      component:Wrong,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/wrong/detail/:paperId',
      component: WrongDetail
    },

    {
      path:'/search',
      name:'Search',
      component:Search,
      meta: {
        showFooter: true
      }
    },

    {
      path:'/profile',
      name:'Profile',
      component:Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile/info',
      component: ProfileInfo
    },
    {
      path: '/profile/stuscore',
      component: ProfileStuScore
    },
    {
      path: '/profile/wrongcollection',
      component: ProfileWrongCollection
    },
    {
      path: '/profile/collection/single/:answerId',
      component: SingleCollection
    },
    {
      path: '/profile/collection/multiple/:answerId',
      component: MultipleCollection
    },
    {
      path: '/profile/collection/judge/:answerId',
      component: JudgeCollection
    },
    {
      path: '/profile/collection/fill/:answerId',
      component: FillCollection
    },
    {
      path:'/profile/stuscore/detail/:paperId',
      component:ProfileScoreDetail
    },
    {
      path:'/profile/pswchange',
      component:ProfilePswChange
    },
    {
      path:'/profile/infochange',
      component:ProfileInfoChange
    },
    {
      path:'/profile/feedback',
      component:ProfileFeedback
    },
    {
      path:'/profile/replydetail',
      component:ProfileReplyDetail
    },
    {
      path:'/profile/examcalendar',
      component:ProfileExamCalendar
    },

    {
      path: '/login',
      name:'Login',
      component: Login
    }
  ]
})
