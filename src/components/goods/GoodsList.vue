<template>
  <div class="goods-list">
    <div @click="goDetail(item.id)" class="goods-item" v-for="item in list" :key="item.id">
      <img :src="item.img_url" alt>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">&yen;{{item.sell_price}}</span>
          <span class="old">&yen;{{item.market_price}}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageindex: 1,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get(`api/getgoods?pageindex=${this.pageindex}`).then(res => {
        console.log(res);
        if (res.body.status == 0) {
          this.list = [...this.list, ...res.body.message]; //利用es6的结构赋值的方式
        }
      });
    },
    getMore() {
      //   console.log(12);
      this.pageindex++;
      this.getList();
    },
    goDetail(id) {
      //   console.log(id);
      //   第一种方式
      //   this.$router.push("/home/goodsinfo/" + id);
      //   第二种方式
      //   this.$router.push({ path: "/home/goodsinfo/" + id });
      // 第三种方式
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>



<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
}
.goods-item {
  width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  margin: 4px 0;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 229px;
  img {
    width: 100%;
  }
  .title {
    font-size: 14px;
  }
  .info {
    background: #eee;
    p {
      margin: 0;
      padding: 5px;
      .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .old {
        text-decoration: line-through;
      }
    }
  }
}
</style>