import VueRouter from "vue-router";

// 导入路由组件
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";

var router = new VueRouter({
  routes: [
    //配置路由规则
    { path: "/home", component: HomeContainer },
    { path: "/member", component: MemberContainer },
    { path: "/search", component: SearchContainer },
    { path: "/shopcar", component: ShopcarContainer }
  ],
  linkActiveClass: "mui-active"
});

export default router;
