<template>
  <div class="goodsdesc-container">
    <h3>{{desc.title}}</h3>
    <hr>
    <div v-html="desc.content" class="content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      desc: {}
    };
  },
  created() {
    this.getDesc();
  },
  methods: {
    getDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(res => {
        //   console.log(res);
        if (res.body.status == 0) {
          this.desc = res.body.message[0];
        }
      });
    }
  }
};
</script>
<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>