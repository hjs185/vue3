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
            <el-table-column prop="subject" label="实体"> </el-table-column>
            <el-table-column prop="predicate" label="属性"> </el-table-column>
            <el-table-column prop="object" label="属性值"> </el-table-column>
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
const TITILE = "实体属性抽取";
const TEXTLIST = [
  "福特级航母花费了130亿美元打造，它的全长也达到了337米，排水量更是恐怖，高达11.2万吨。而且福特级航母，搭载了许多新兴科技，与传统的航母有着天壤之别，它主要搭载了电磁轨道炮，高能激光，高能射线等等高科技技术，这些就已经足够了，给其他国家造成海上威慑力。",
  "如今的福特级航母，舰长337米、飞行甲宽77米，吃水12米、满载排水量高达112000吨，最高航速30节，最多可携带82架舰载机为航母提供制空权和制海权，动力方面；采用了两套A1B核反应堆为其提供动力。从这样一组数据上不难出，福特级航母简直就是一个可移动的海上小镇。",
  "作为美军的第三代核动力航母，福特级并没有令美军失望，首先就是在舰体上面有了明显增加，本身航母就以体型庞大而受到关注，再次加大后会更加的具有优势。据悉，全新的福特级总长度为332米，而宽度也达到了77.5米，吃水深度则保障在11.3米。仅是体型增大并不值得过度关注，但是这款新型航母的许多先进性能，是许多国家短时间内无法超越的，同时也是各国极为羡慕的。",
  "福特级航母的满载排水量可以达到10万吨左右，而航速更是可以保障在33节，虽然速度较快，但是航母的无限续航里程并不会受到影响。为了保障这款航母的作战能力，直接将其舰载机升级为五代舰载机，可以具备隐身能力，据悉这款航母上面可以实现携带80余架各类型舰载机的效果，可想而知其打击能力会何等出色。而美军为了保障舰载机的成功起降，直接采用了最为先进的电磁弹射技术。",
  "博尔顿多次公开表示无条件支持特朗普的外交和国安理念。对华态度方面，博尔顿无疑是强硬的，坚决支持特朗普对华开展贸易战和加征关税，将其描述为逼中国就范的“休克疗法”。",
  "The length of the Gerald R. Ford-class aircraft carriers is about 1,106 feet , it is about 39 feet  wide and 250 feet high . It has 25 floors, displaces 100,000 tons and has a speed of 30 knots .",
  "如今的福特级航母，舰长337米、飞行甲宽77米，吃水12米、满载排水量高达112000吨，最高航速30节，最多可携带82架舰载机为航母提供制空权和制海权，动力方面；采用了两套A1B核反应堆为其提供动力。从这样一组数据上不难出，福特级航母简直就是一个可移动的海上小镇。",
];
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
      Axios("/nlp/key", [{ key: "query", value: val }]).then((datas) => {
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