<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容" v-model.trim="txt"></textarea>
    <mt-button size="large" type="primary" @click="addComment">发表评论</mt-button>
    <hr>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in list" :key="index">
        <div
          class="cmt-title"
        >第 {{index+1}} 楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;发表时间：{{item.add_time|dateFormat}}</div>
        <div class="cmt-body">{{item.content}}</div>
      </div>
    </div>
    <mt-button size="large" type="danger" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  props: ["id"],
  created() {
    //请求数据
    this.getData();
  },
  methods: {
    getData() {
      //获取评论
      this.$http
        .get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`)
        .then(res => {
          // console.log(res);
          if (res.body.status == 0) {
            // this.list = res.body.message;
            //延展运算符  第一种获取加载更多
            // this.list = [...this.list, ...res.body.message];
            // 第二种获取加载更多
            this.list = this.list.concat(res.body.message);
          }
        });
    },
    getMore() {
      //获取加载更多数据
      this.pageindex++, this.getData();
    },
    addComment() {
      if (this.txt == "") {
        Toast("数据不能为空");
        return;
      }
      this.$http
        .post(`api/postcomment/${this.id}`, { content: this.txt })
        .then(res => {
          if (res.body.status == 0) {
            // 第一种思路，清空所有的数据   再次请求数据
            // this.list = [];
            // this.pageindex = 1;
            // this.getData();
            // this.txt = "";
            // 第二种思路
            //构建一个新的数据对象
            const Obj = {
              add_time: Date.now(),
              content: this.txt,
              user_name: "匿名用户"
            };
            this.list.unshift(Obj);
            this.txt = "";
          }
        });
    }
  },
  data() {
    return {
      list: [],
      pageindex: 1,
      txt: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>