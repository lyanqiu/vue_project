<template>
  <div class="goodsinfo-container">
    <!-- 加入购物车小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :list="list" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>&yen;{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">&yen;{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <number-box @getCount="getSelectedCount"></number-box>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/Swiper.vue";
import NumberBox from "../subcomponents/goodsinfo_number.vue";
export default {
  name: "GoodsInfo",
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      goodsinfo: {},
      ballFlag: false,
      SelectedCount: 1 //默认用户选中的数量
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    // 轮播图部分
    getLunbotu() {
      this.$http.get(`api/getthumimages/${this.id}`).then(res => {
        if (res.body.status == 0) {
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.list = res.body.message;
        }
      });
    },
    // 详情部分
    getGoodsInfo() {
      this.$http.get(`api/goods/getinfo/${this.id}`).then(res => {
        console.log(res);
        if (res.body.status == 0) {
          this.goodsinfo = res.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
      // 第二种写法 和上面是一样的
      // this.$router.push('/home/goodsdesc/'+id)
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // getBoundingClientRect()利用它进行计算小球和徽标在页面上的位置
      // 获取小球在页面上的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面上的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      // 计算他们之间的横坐标和纵坐标的差值从而得到小球在不同版本下的一个位置
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all cubic-bezier(.17,.67,.8,.99) 1s";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.SelectedCount = count;
    }
  },
  props: ["max"],
  watch: {
    max: function(mewVal, oldVal) {
      // 在js中设置num的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  },
  components: {
    swiper,
    NumberBox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
}
.mui-card-footer {
  display: block;
  button {
    margin: 15px 0;
  }
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 410px;
  left: 77px;

  // transform: translate(200px, 212px);
}
</style>
<style lang="scss">
// 阻止图片抖动
// .mint-swipe-item {
//   -webkit-backface-visibility: hidden;
//   backface-visibility: hidden;
// }
// div {
//   -webkit-transform: translate3d(0, 0, 0);
//   transform: translate3d(0, 0, 0);
// }
</style>