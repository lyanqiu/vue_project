 <template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item) in list" :key="item.id">
        <img :src="item.img" :class="{full:isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
 <script>
export default {
  props: ["list", "isfull"],
  data() {
    return {};
  }
};
</script>
 <style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  text-align: center;
  .mint-swipe-item {
    img {
      // width: 100%;
      height: 200px;
    }
  }
}
.full {
  width: 100%;
}
</style>