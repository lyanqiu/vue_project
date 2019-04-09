import Vue from 'vue'

import App from './App.vue'

//完整版引入mint-ui(薄荷)
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

//按需导入 更好一点 让代码体积变小
//我们现在只想用mint-ui的button组件
// https://cloud.tencent.com/developer/section/1489979
//Button用在html上面
// mui 用了mui 有点问题要解决
// 用一个ui组件
// import { Button } from 'mint-ui';
// Vue.component(Button.name, Button);


//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//配置一个api请求的url地址
//防火墙
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
Vue.http.options.emulateJSON = true
//不好 缓存
// const express = require('express')
// const express = require('express')
// const express = require('express')
// import {
//   Header,
//   Swipe,
//   SwipeItem,
//   Button,
//   Lazyload
// } from 'mint-ui';
// Vue.component(Header.name, Header);
// // import { Swipe, SwipeItem } from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// // import {Button} from 'mint-ui'
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入mui样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // if(!pattern){
  //   pattern = 'YYYY-MM-DD HH:mm:ss'
  // }
  return moment(dataStr).format(pattern)
})


const vm = new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  },
  router
})