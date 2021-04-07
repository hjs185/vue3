<template>
  <div>
    <CommonWrap
      :titleMsg="titleMsg"
      :textList="textList"
      @handleAnalysis="handleAnalysis"
    ></CommonWrap>
    <div class="content">
      <div class="data-view left">
        <header>
          <div class="title">分析结果</div>
          <div class="tools"></div>
        </header>
        <main></main>
      </div>
      <div class="data-view right">
        <header>
          <div class="title">分析结果</div>
          <div class="tools"></div>
        </header>
        <main></main>
      </div>
    </div>
  </div>
</template>

<script>
import CommonWrap from "./common";
// import { ref } from "vue";
const TITILE = "实体抽取";
const TEXTLIST = ["ha1", "ha2", "ha3", "ha4"];
export default {
  components: {
    CommonWrap,
  },
  setup() {
    const handleAnalysis = (val) => {
      console.log(val);
    };
    return {
      titleMsg: TITILE,
      textList: TEXTLIST,
      handleAnalysis,
    };
  },
};
</script>

<style scoped lang="scss">
@import url("~@/style/index.scss");
.content {
  width: 1200px;
  margin: 0 auto;
  min-height: 120px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 55%;
}
.right {
  width: 40%;
}
</style>