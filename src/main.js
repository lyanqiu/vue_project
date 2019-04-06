// console.log("ok")
import Vue from "vue";
// 导入App.vue文件
import App from "./App.vue";


// 完整引入mint-ui
// import MintUI from "mint-ui";
// import "mint-ui/lib/style.css";
// Vue.use(MintUI);

import {
  Header
} from 'mint-ui'
Vue.component(Header.name, Header)


// 轮播图部分
import {
  Swipe,
  SwipeItem
} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


// 导入mui样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui.ttf'

// 配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'



// 按需引入
// import {
//   Button
// } from 'mint-ui';
// Vue.component(Button.name, Button);




const vm = new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement(App);
  },
  router
});