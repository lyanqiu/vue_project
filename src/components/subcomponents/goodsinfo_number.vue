<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-max="60">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        @change="countChanged"
        ref="numbox"
        type="number"
        value="1"
      >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  name: "goodsinfo_number",
  mounted() {
    mui(".mui-numbox").numbox();
  },
  data() {
    return {};
  },
  methods: {
    countChanged() {
      // console.log(this.$refs.numbox.value);
      //每当文本框的数据被修改的时候，就立即把最新的数据，通过事件调用，传递给父组件
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  }
};
</script>
<style lang="scss" scoped>
</style>