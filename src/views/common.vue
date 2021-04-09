<template>
  <div class="box">
    <h2 class="heand-title">{{ titleMsg }}</h2>
    <div class="content-wrap">
      <header>
        <div class="operation-title">请输入分析文本</div>
        <div class="operation-tools">
          <el-button type="text" icon="el-icon-refresh" @click="handleRandom">
            随机切换示例
          </el-button>
          <el-button plain @click="handleClear">重置内容</el-button>
        </div>
      </header>
      <main>
        <el-input
          v-model="myContent"
          :rows="5"
          type="textarea"
          placeholder="请输入内容"
          :maxlength="500"
          show-word-limit
        ></el-input>
      </main>
      <footer>
        <slot name="footer"></slot>
        <el-button
          class="analysis"
          type="primary"
          :loading="analysisLoading"
          @click="handleAnalysis"
          >开始分析</el-button
        >
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";

export default {
  props: {
    titleMsg: {
      type: String,
      default: "",
    },
    textList: {
      type: Array,
      default: () => [],
    },
    analysisLoading: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    let count = 0;
    let myContent = ref("");
    // 初始化赋值
    myContent.value = toRefs(props.textList)[0].value;
    // 随机切换示例
    const handleRandom = () => {
      if (count < props.textList.length - 1) {
        count++;
      } else {
        count = 0;
      }
      myContent.value = props.textList[count];
      ctx.emit("handleAnalysis", myContent.value);
    };
    // 开始分析
    const handleAnalysis = () => {
      ctx.emit("handleAnalysis", myContent.value);
    };
    // 重置内容
    const handleClear = () => {
      myContent.value = "";
    };
    return {
      handleRandom,
      myContent,
      handleAnalysis,
      handleClear,
    };
  },
};
</script>

<style scoped lang="scss">
.box {
  width: 1200px;
  margin: 50px auto;
}

.heand-title {
  height: 50px;
  text-align: center;
}
.content-wrap {
  background-color: #fff;
}
header {
  display: flex;
  min-height: 56px;
  border-bottom: 1px solid #dcdcdc;
  & > * {
    display: flex;
    align-items: center;
  }
  .operation-title {
    padding: 0 24px;
    border-right: 1px solid #dcdcdc;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    line-height: 26px;
  }
  .operation-tools {
    padding: 0 16px;
    flex: 1 1 auto;
    justify-content: space-between;
    display: flex;
  }
  .operation-random {
    margin-right: auto;
  }
}
main {
  padding: 24px;
  /deep/.el-textarea__inner {
    border: none;
    max-height: 240px;
  }
}
footer {
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-top: 1px solid #dcdcdc;
  .analysis {
    margin-left: auto;
  }
}
</style>