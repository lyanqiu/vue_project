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

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

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

import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 当页面一打开的时候就显示存储的数据
    car: JSON.parse(localStorage.getItem('car')) || []
  },
  mutations: {
    addCar: function (state, obj) {
      // console.log(obj);
      var flag = false
      for (var i = 0; i < state.car.length; i++) {
        if (state.car[i].id == obj.id) {
          state.car[i].count += obj.count
          flag = true
          break
        }
      }
      if (!flag) {
        state.car.push(obj)
      }
      // 把最新的car数据存在本地存储，可以在页面刷新的时候数据还存在
      localStorage.setItem('car', JSON.stringify(state.car))
      // 第二种方式
      // var flag = false
      // state.car.some(item => {
      //   if (item.id == obj.id) {
      //     item.count += obj.count
      //     flag = true
      //     return true
      //   }
      // })
      // if (!flag) {
      //   state.car.push(obj)
      // }

    },
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    updateSelected(state, id) {
      var index = state.car.findIndex(item => item.id == id)
      state.car[index].selected = !state.car[index].selected
      localStorage.setItem("car", JSON.stringify(state.car));
    }
  },
  getters: {
    total(state) {
      var sum = 0;
      state.car.forEach(item => {
        sum += item.count
      })
      return sum
    },
    // 映射id和商品数量
    getGoodsCount(state) {
      var obj = {}
      state.car.forEach(item => {
        obj[item.id] = item.count
      })
      return obj
    },
    getSelected(state) {
      var obj = {}
      state.car.forEach(item => {
        obj[item.id] = item.selected
      })
      return obj
    },
    getTotal(state) {
      var obj = {
        count: 0,
        sum: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          obj.count += parseInt(item.count)
          obj.sum += item.price * item.count
        }
      })
      return obj
    }
  },
  actions: {}
})
const vm = new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  },
  router,
  store
})