<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getSelected[item.id]"></mt-switch>
            <img :src="item.thumb_path" alt>
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <!-- 这块放numbox -->
                <num-box
                  :num="$store.getters.getGoodsCount[item.id]"
                  :id="item.id"
                  @change="updateSelected(item.id)"
                ></num-box>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>
                已勾选商品{{$store.getters.getTotal.count}}件，
                <span
                  class="red"
                >总价&yen;{{$store.getters.getTotal.sum}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NumBox from "../subcomponents/shopcar_number.vue";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  components: {
    NumBox
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取到store中所有的商品的id，然后拼接一个用逗号分割的字符串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      //如果购物车中没有数据，则直接返回    不需要请求数据接口否则会报错
      if (idArr.length <= 0) {
        return;
      }
      //获取商品列表
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(res => {
          if (res.body.status == 0) {
            console.log(res.body);
            this.goodslist = res.body.message;
          }
        });
    },
    // 删除商品
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    updateSelected(id) {
      this.$store.commit("updateSelected", id);
    }
  }
};
</script>
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>