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
// 导入mui样式
import './lib/mui/css/mui.css'

// 按需引入
// import {
//   Button
// } from 'mint-ui';
// Vue.component(Button.name, Button);




const vm = new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement(App);
  }
});