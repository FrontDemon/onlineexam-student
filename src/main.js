// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由 其实就是router文件夹下的index.js配置好的路由表
import router from './router'
import store from './store'

//按需引入Muse-UI组件
import { Radio, Checkbox, TextField, Button, Icon } from 'muse-ui';
// import 'muse-ui/lib/styles/base.less';
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Icon);
import 'muse-ui/lib/styles/theme.less';

//引入Vant组件
/*import Popup from 'vant/lib/popup';
import 'vant/lib/popup/style';
Vue.use(Popup);*/

/*// 引入VueLazyload插件
import VueLazyload from 'vue-lazyload'
// 将一张loading图片加载进来
import loading from './common/imgs/loading.gif'*/

//引入过滤器
import './filters'

//引入图片查看器v-viewer
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
});

//全局引入基于VueJS的无缝滚动
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

//全局引入一个用于移动端的可触摸滑动具有回弹效果的可复用Vue组件
import LyTab from 'ly-tab'
Vue.use(LyTab)

//全局引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//全局导入MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

/*Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})*/

//解决移动端click 300ms 延迟
/*import fastclick from 'fastclick'
fastclick.attach(document.body)*/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
