<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- /轮播图 -->
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

    <!-- /九宫格 -->
  </div>
</template>
<script>
// 生命周期函数 created 发ajax mounted 操作dom
import { Toast } from "mint-ui";
export default {
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("api/getlunbo").then(res => {
        console.log(res);
        if (res.body.status == 0) {
          //成功
          this.list = res.body.message;
        } else {
          //失败
          Toast("获取轮播数据失败");
        }
      });
    }
  },
  //双向数据绑定 数据模型变了 视图就会变
  data() {
    return {
      list: [] //轮播图的数据
    };
  }
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    img {
      width: 100%;
      height: 200px;
    }
  }
}
.mui-grid-view.mui-grid-9 {
  background: #fff;
  border: none;
  li {
    border: none;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>