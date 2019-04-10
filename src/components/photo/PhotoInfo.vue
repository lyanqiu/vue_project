<template>
  <div class="photoinfo-container">
    <h3>{{data.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{data.add_time|dateFormat}}</span>
      <span>点击：{{data.click}}次</span>
    </p>
    <hr>
    <!-- 缩略图区域 -->
    <vue-preview :slides="slide1"></vue-preview>
    <!-- 图片内容区域 -->
    <div class="content" v-html="data.content"></div>
    <!-- 放置一个现成的评论子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import CommentBox from "../subcomponents/CommentBox.vue";
export default {
  components: {
    CommentBox
  },
  created() {
    this.getData();
    this.getThumbImg();
  },
  methods: {
    getData() {
      this.$http.get(`api/getimageInfo/${this.id}`).then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          this.data = res.body.message[0];
        }
      });
    },
    getThumbImg() {
      this.$http.get(`api/getthumimages/${this.id}`).then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          res.body.message.forEach(item => {
            item.msrc = item.src;
            item.w = 600; //大图的宽度
            item.h = 400; //大图的高度
          });
          this.slide1 = res.body.message;
        }
      });
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      data: [],
      slide1: []
    };
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
<style lang="scss">
.my-gallery {
  display: flex;
  figure {
    flex: 1;
    margin: 10px;
    img {
      width: 100%;
    }
  }
}
</style>