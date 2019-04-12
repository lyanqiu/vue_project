<template>
  <div>
    <commentt-box :id="$route.params.id"></commentt-box>
  </div>
</template>
<script>
import CommenttBox from "../subcomponents/CommentBox.vue";
export default {
  data() {
    return {};
  },
  components: {
    CommenttBox
  }
};
</script>
<style lang="scss" scoped>
</style>