<template>
  <div>
    <CommonWrap
      :titleMsg="titleMsg"
      :textList="textList"
      :analysisLoading="loading"
      @handleAnalysis="handleAnalysis"
    ></CommonWrap>
    <div class="data-view content-warp">
      <header>
        <div class="title">分析结果</div>
        <div class="tools"></div>
      </header>
      <main class="content-main" v-loading="loading">
        <div class="analys-result">
          <div class="result-box">
            <div id="relat-graph-graph" class="relat-graph-graphs"></div>
            <div v-show="flag" class="from-box">
              <el-table
                :data="tableData"
                align="center"
                :header-cell-style="{ background: '#f5f7fa' }"
                height="380"
              >
                <el-table-column prop="main" label="主体"> </el-table-column>
                <el-table-column prop="event" label="事件"> </el-table-column>
                <el-table-column prop="hed" label="事件类型"> </el-table-column>
                <el-table-column prop="loc" label="地点"> </el-table-column>
                <el-table-column prop="vob" label="客体"> </el-table-column>
                <el-table-column prop="time" label="时间"> </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
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
const sati = require("@sati/examples-build");

import { Axios } from "@/axios";
import { onMounted, ref } from "vue";
import CommonWrap from "./common";
export default {
  components: {
    CommonWrap,
  },
  setup() {
    let sativis = ref(null);
    let resultData = ref(null);
    let loading = ref(false);
    let tableData = ref([]);
    let flag = ref(false);
    let cloneResultData = ref([]);
    let renderData = ref(null);
    let timer = ref(null);

    // 开始分析
    const handleAnalysis = (val) => {
      loading.value = true;
      Axios("/nlp/ee", [{ key: "query", value: val }]).then((datas) => {
        loading.value = false;
        let { code, object } = datas.data;
        if (code === "200") {
          let args = object.output.res.map((item, index) => {
            return {
              main: item["主体"],
              event: item["事件"],
              hed: item["事件类型"],
              loc: item["地点"],
              vob: item["客体"],
              time: item["时间"],
              id: index.toString(),
            };
          });
          resultData.value = {
            args,
            rls: [],
          };
          dataInit();
        }
      });
    };
    handleAnalysis(TEXTLIST[0]);

    const dataInit = () => {
      try {
        let tempData = resultData.value;
        if (tempData.rls.length) {
          cloneResultData.value = JSON.parse(JSON.stringify(tempData.rls));
          tempData.args.forEach((item) => {
            cloneResultData.value.forEach((item2) => {
              if (item2.start === item.id) {
                item2.start = item.event;
                item2.startData = item;
                item2.startId = item.id;
              }
              if (item2.end === item.id) {
                item2.end = item.event;
                item2.endData = item;
                item2.endId = item.id;
              }
            });
          });
          cloneResultData.value = JSON.parse(
            JSON.stringify(cloneResultData.value).replace(/start/g, "e1")
          );
          cloneResultData.value = JSON.parse(
            JSON.stringify(cloneResultData.value).replace(/end/g, "e2")
          );
        } else {
          cloneResultData.value = tempData.args.map((item) => {
            return {
              e1: item.event,
              r: "",
              e2: "",
              e1Data: item,
              startId: item.id,
            };
          });
        }
        getData();
      } catch (error) {
        // console.log(error);
      }
    };

    // 获取数据
    const getData = () => {
      tableData.value = [];
      renderData.value = dataHandler(cloneResultData.value);

      // 比较生成的节点数量和返回数据的数量是否相等 如果不相等 则存在没有关系的空节点
      compareRenderData();
      // 当关系条件没有时 会出现id为undefined的数据,进行过滤
      filterId();
      // 如果没有关系线段
      if (!resultData.value.rls.length) {
        renderData.value.edges = [];
        renderData.value.nodes = renderData.value.nodes.filter((item) => {
          return item.properties.name;
        });
      }
      try {
        sativis.value.clear();
      } catch (error) {
        // todo: 当前出现清空图谱时报错,目前判断当未渲染图谱时清空导致的,所以catch异常信息,正常执行.若图谱有数据则可以正常清空图谱! 大概率与依存分析有关
      }
      putData(renderData.value);
      timer.value = setInterval(() => {
        sativis.value.view.layout.warmup();
      }, 50);
      setTimeout(() => {
        clearInterval(timer.value);
        sativis.value.view.layout.cooldown();
      });
    };

    onMounted(() => {
      sativis.value = sati.network("#relat-graph-graph");
      window.sativis = sativis.value;
      sativis.value.config.set("node.radius", 5);
      sativis.value.config.set("node.label.enable", true);
      sativis.value.config.set("edge.label.enable", true);
      sativis.value.on("click", (node) => {
        findTableRow(node);
      });
    });

    // 导入数据方法
    const putData = (data) => {
      try {
        sativis.value.put(data);
        sativis.value.edges.forEach((item) => {
          // 设置虚线
          item.animate({ state: true });
        });
        // 隐藏表层dom
        let dom = document.getElementsByClassName("edge");
        // console.log(dom);
        for (let i = 0; i < dom.length; i++) {
          dom[i].children[1].style.stroke = "transparent";
        }
      } catch (error) {
        // console.log(error);
      }
    };

    const filterId = () => {
      renderData.value.nodes = renderData.value.nodes.filter((item) => {
        return item.id;
      });
    };

    const compareRenderData = () => {
      let domLength = renderData.value.nodes;
      let dataLength = JSON.parse(JSON.stringify(resultData.value.args));
      let arr = [];
      if (domLength.length !== dataLength.length - 1) {
        // 删除生成节点中存在的id
        domLength.forEach((item) => {
          dataLength.filter((item2, index) => {
            if (item.id == item2.id) {
              dataLength.splice(index, 1);
            }
          });
        });
        // 删除event_type数据类型
        dataLength.forEach((item, index) => {
          if (!item.id) {
            dataLength.splice(index, 1);
          }
        });
        // 组装节点数据
        dataLength.forEach((item) => {
          arr.push({
            id: item.id,
            properties: {
              color: "#69b9f7",
              name: item.event,
              nodeData: item,
            },
          });
        });
        renderData.value.nodes = [...domLength, ...arr];
      }
    };

    //处理数据
    const dataHandler = (data) => {
      return data.reduce(
        (acc, cur) => {
          let e1 = {
            id: cur.e1Id,
            properties: {
              name: cur.e1,
              color: "#69b9f7",
              nodeData: cur.e1Data,
            },
          };
          let e2 = {
            id: cur.e2Id,
            properties: {
              name: cur.e2,
              color: "#69b9f7",
              nodeData: cur.e2Data,
            },
          };
          acc.nodes.push(e1);
          acc.nodes.push(e2);

          acc.edges.push({
            source: e1.id,
            target: e2.id,
            properties: {
              color: null,
              name: null,
              type: cur.r,
            },
          });
          return acc;
        },
        { nodes: [], edges: [] }
      );
    };

    // 点击节点表格展示
    const findTableRow = (nodeDom) => {
      if (!nodeDom || !nodeDom.node) {
        flag.value = false;
        return;
      }
      let data = nodeDom.node.properties.nodeData;
      tableData.value = [data];
      console.log(tableData.value);
      flag.value = true;
    };

    return {
      titleMsg: TITILE,
      textList: TEXTLIST,
      handleAnalysis,
      loading,
      flag,
      cloneResultData,
      renderData,
      timer,
      tableData,
    };
  },
};
</script>
<style>
.edge > .inner {
  stroke-width: 2px;
}
.edge:hover > .inner {
  stroke-width: 2px;
  stroke: red;
}
.relat-graph-graphs .node:hover {
  fill: transparent;
}
#relat-graph-graph .ring {
  fill: rgba(40, 149, 235, 0.35);
}
#relat-graph-graph .innerRing {
  fill: rgba(40, 149, 235, 0.35);
}
/* #relat-graph-graph .core { */
/* fill: rgb(105, 185, 247); */
/* stroke: rgb(10, 147, 255, 0.6); */
/* } */
#relat-graph-graph .edge path {
  fill: none;
}
</style>
<style scoped lang="scss">
@import url("~@/style/index.scss");
.relat-graph-graphs {
  height: 400px;
  width: 100%;
}
.analysis-btn {
  margin: 30px 0 0px;
  text-align: center;
  .el-button {
    width: 120px;
    font-size: 14px;
  }
}
.analys-result {
  width: 100%;
  position: relative;
  .top-title {
    font-size: 18px;
    line-height: 31px;
    color: #333;
    text-align: left;
    margin: 24px 0 12px 0;
  }
  .pop-up-box {
    position: absolute;
    right: 35%;
    top: 74px;
    max-width: 200px;
    color: #666;
    padding: 18px;
    border: 1px solid #ccc;
  }
}
.result-box {
  width: 100%;
  overflow: hidden;
  font-size: 16px;
  line-height: 24px;
  position: relative;
}
.from-box {
  position: absolute;
  right: 0;
  top: 0;
  .table-style {
    text-align: center;
    border-collapse: collapse;
    .key {
      font-weight: bold;
      text-align: left;
      min-width: 66px;
    }
    td {
      padding: 0 6px;
      line-height: 30px;
    }
  }
}
</style>