<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            @click="getList(item.id)"
            class="mui-control-item"
            :class="{'mui-active':item.id==0}"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in cateList"
            :key="item.id"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="list">
      <router-link tag="li" :to="'/home/photoinfo/'+item.id" v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url">
        <p class="info">{{item.seo_description}}</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
// vue是严格模式，mui.js使用到了'caller','callee','arguments'这些东西，但是webpack打包好的bundle.js中默认启用的是严格模式，所以这两者会出现冲突。会出现控制台报错。解决方式：在babelrc中添加"transform-remove-strict-mode
import mui from "../../lib/mui/js/mui.js";
export default {
  created() {
    this.getCates();
    this.getList(0); //默认就是全部的图片
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCates() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status == 0) {
          this.cateList = [{ title: "全部", id: 0 }, ...res.body.message];
        }
      });
    },
    getList(id) {
      this.$http.get(`api/getimages/${id}`).then(res => {
        console.log(res);
        if (res.body.status == 0) {
          this.list = res.body.message;
        }
      });
    }
  },

  data() {
    return {
      cateList: [], //获取分类列表数据
      list: [] //所有图片分类的数据
    };
  }
};
</script>
<style lang="scss" scoped>
.list {
  background: #ccc;
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  li {
    position: relative;
    text-align: center;
    background-color: #ccc;
    box-shadow: 0 0 9px #999;
    img {
      width: 100%;
      //   vertical-align: middle;
    }
    .info {
      position: absolute;
      //   bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      text-align: left;
      bottom: 0;
      max-height: 84px;
      //   overflow: hidden;s
    }
  }
}
</style>
