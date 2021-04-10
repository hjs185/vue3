<template>
  <div>
    <CommonWrap :titleMsg="titleMsg" :textList="textList"></CommonWrap>
    <div class="data-view content-warp">
      <header>
        <div class="title">分析结果</div>
        <div class="tools"></div>
      </header>
      <main>
        <!-- <div class="analys-result">
          <div class="result-box">
            <div id="relat-graph-graph" class="relat-graph-graphs"></div>
            <div v-show="flag" class="from-box">
              <table border="1" class="table-style">
                <tr v-for="(item, index) in tableData.key" :key="index">
                  <td class="key">{{ item | keyToChina }}</td>
                  <td>{{ tableData.value[index] }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
      </main>
    </div>
  </div>
</template>

<script>
const TITILE = "事件图谱";
const TEXTLIST = [
  "王毅将对沙特、土耳其、伊朗、阿联酋和巴林进行正式访问，对阿曼进行工作访问。新华社北京3月22日电应沙特外交大臣费萨尔、土耳其外长恰武什奥卢、伊朗外长扎里夫、阿联酋外长阿卜杜拉、阿曼外交大臣巴德尔和巴林外交大臣扎耶尼邀请，国务委员兼外交部长王毅将于3月24日至30日对沙特、土耳其、伊朗、阿联酋、巴林进行正式访问，对阿曼进行工作访问。",
  "ha2",
  "ha3",
  "ha4",
];
// const sati = require("@sati/examples-build");
// const CHINA = {
//   loc: "地点",
//   hed: "触发词",
//   vob: "客体",
//   main: "主体",
//   time: "时间",
//   event_type: "类型",
// };

// import { onMounted, ref } from "vue";
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