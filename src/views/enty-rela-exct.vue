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
        <div id="person-info-graph" class="person-info-wrap"></div>
        <div class="from-box">
          <el-table
            :data="tableInfo"
            align="center"
            @cell-click="tabClick"
            @header-click="tabHeadClick"
            :header-cell-style="{ background: '#f5f7fa' }"
            height="380"
          >
            <el-table-column prop="subject" label="实体1"> </el-table-column>
            <el-table-column prop="predicate" label="关系指示词">
            </el-table-column>
            <el-table-column prop="object" label="实体2"> </el-table-column>
          </el-table>
        </div>
        <div ref="popUpRef" class="pop-up-box">
          <div>名称: {{ boxContent.subject }}</div>
          <div>{{ boxContent.predicate }}: {{ boxContent.object }}</div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// 解决框架报错
window.parcelRequire = undefined;
const TITILE = "实体关系抽取";
const TEXTLIST = ["图226美国AN/TSQ─109雷达侦察系统", "ha2", "ha3", "ha4"];
const sati = require("@sati/examples-build");

import { uuid } from "@/utils";
import CommonWrap from "./common";
import { onMounted, ref } from "vue";
import { Axios } from "@/axios";

export default {
  components: {
    CommonWrap,
  },
  setup() {
    let loading = ref(false);
    let tableInfo = ref([]);
    let resultData = ref([]);
    let sativis = ref(null);
    let renderData = ref(null);
    let getDataTimer = ref(null);
    let tabClickTimer = ref(null);
    let popUpRef = ref(null);
    let boxContent = ref({
      boxContent: {
        //当前点击的实体
        e1: "",
        e2: "",
        r: "",
      },
    });

    // 开始分析
    const handleAnalysis = (val) => {
      loading.value = true;
      Axios("/nlp/re", [{ key: "query", value: val }]).then((datas) => {
        loading.value = false;
        let { code, object } = datas.data;
        if (code === "200") {
          resultData.value = object.output.res;
          getData();
        }
      });
    };

    const getData = () => {
      tableInfo.value = resultData.value;
      renderData.value = dataHandler(resultData.value);
      sativis.value.clear();
      sativis.value.put(renderData.value);
      getDataTimer.value = setInterval(() => {
        sativis.value.view.layout.warmup();
      }, 50);

      setTimeout(() => {
        clearInterval(getDataTimer.value);
        sativis.value.view.layout.cooldown();
      });
    };
    //处理数据konw
    const dataHandler = (data) => {
      return data.reduce(
        (acc, cur) => {
          let e1, e2;
          let n1 = acc.nodes.find((n) => n.properties.name === cur.subject);
          let n2 = acc.nodes.find((n) => n.properties.name === cur.object);

          e1 = n1 || {
            id: uuid(),
            properties: {
              name: cur.subject,
              color: "#69b9f7",
            },
          };
          e2 = n2 || {
            id: uuid(),
            properties: {
              name: cur.object,
              color: "#69b9f7",
            },
          };
          n1 || acc.nodes.push(e1);
          n2 || acc.nodes.push(e2);
          acc.edges.push({
            source: e1.id,
            target: e2.id,
            properties: {
              color: null,
              name: null,
              type: cur.predicate,
            },
          });
          acc.nodes = filterDataNodes(acc.nodes);
          return acc;
        },
        { nodes: [], edges: [] }
      );
    };
    //过滤节点
    const filterDataNodes = (data) => {
      let obj = {};
      return data.reduce(function (item, next) {
        obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
        return item;
      }, []);
    };

    // 点击表格某行
    const tabClick = (row) => {
      let arr = [];
      arr.push(row);
      renderData.value = dataHandler(arr);
      sativis.value.clear();
      sativis.value.put(renderData.value);
      tabClickTimer.value = setInterval(() => {
        sativis.value.view.layout.warmup();
      }, 50);

      setTimeout(() => {
        clearInterval(tabClickTimer.value);
        sativis.value.view.layout.cooldown();
      });
    };

    // 点击表头
    const tabHeadClick = () => {
      getData();
    };

    // 获取dom生命周期
    onMounted(() => {
      popUpRef.value.style.display = "none";
      sativis.value = sati.network("#person-info-graph");
      sativis.value.config.set("node.radius", 5);
      sativis.value.config.set("node.label.enable", true);
      sativis.value.config.set("edge.label.enable", true);
      // 初始化调用
      handleAnalysis(TEXTLIST[0]);
    });

    return {
      titleMsg: TITILE,
      textList: TEXTLIST,
      handleAnalysis,
      popUpRef,
      boxContent,
      loading,
      tableInfo,
      tabClick,
      tabHeadClick,
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
.person-info-wrap .node:hover {
  fill: transparent;
}
#person-info-graph .ring {
  fill: rgba(40, 149, 235, 0.35);
}

#person-info-graph .innerRing {
  fill: rgba(40, 149, 235, 0.35);
}

#person-info-graph .edge path {
  fill: none;
}
</style>
<style scoped lang="scss">
@import url("~@/style/index.scss");
.result-box {
  width: 100%;
  background: #181e25;
  padding: 30px;
  overflow: hidden;
  font-size: 16px;
  line-height: 24px;
}
.from-box {
  width: 30%;
  float: left;
}
.analys-result {
  width: 100%;
  position: relative;
  .topTitle {
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
.person-info-wrap {
  height: 400px;
  width: 70%;
  float: left;
}
</style>