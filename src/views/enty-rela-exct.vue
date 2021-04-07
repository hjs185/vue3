<template>
  <div>
    <CommonWrap :titleMsg="titleMsg" :textList="textList"></CommonWrap>
    <div class="data-view content-warp">
      <header>
        <div class="title">分析结果</div>
        <div class="tools"></div>
      </header>
      <main></main>
    </div>
  </div>
</template>

<script>
const TITILE = "实体关系抽取";
const TEXTLIST = ["ha1", "ha2", "ha3", "ha4"];
import CommonWrap from "./common";
export default {
  components: {
    CommonWrap,
  },
  setup() {
    return {
      titleMsg: TITILE,
      textList: TEXTLIST,
    };
  },
};
</script>
<style scoped lang="scss">
@import url("~@/style/index.scss");
</style>