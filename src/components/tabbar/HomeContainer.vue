<template>
  <div>
    <!-- <h3>HomeContainer</h3> -->
    <!-- 轮播图部分 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
}
</style>