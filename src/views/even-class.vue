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
                <el-table-column label="事件">
                  <template #default="scope">
                    <span :title="scope.row.event">{{
                      scope.row.event.length > 20
                        ? `${scope.row.event.substr(0, 20)}...`
                        : scope.row.event
                    }}</span>
                  </template>
                </el-table-column>
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
  `习近平接见空军第十三次党代会代表。
新华社北京6月18日电（记者李宣良、张玉清）中共中央总书记、国家主席、中央军委主席习近平18日在京接见空军第十三次党代表大会全体代表，代表党中央和中央军委，对空军第十三次党代会的召开表示热烈的祝贺，向各位代表和空军全体官兵致以诚挚的问候。
上午11时20分许，习近平来到京西宾馆会见大厅，全场响起热烈掌声。习近平同代表们亲切握手，并合影留念。
经党中央、中央军委批准，空军第十三次党代会17日在京召开。会议的主要任务是：以习近平新时代中国特色社会主义思想为指导，深入贯彻党的十九大和十九届二中、三中全会精神，深入贯彻习近平强军思想，深入贯彻新时代军事战略方针，总结过去5年空军党的建设和部队建设情况，部署今后5年的主要工作任务，动员广大官兵加快建设一支强大的现代化人民空军，坚决完成党和人民赋予的新时代使命任务，以优异成绩迎接新中国成立70周年。
许其亮、张又侠、魏凤和、李作成、苗华、张升民参加接见。`,
  `俄表示正制造水陆两栖“道尔-M2”防空导弹系统。
新华社莫斯科6月15日电（记者吴刚）俄罗斯防空兵司令亚历山大·列奥诺夫15日说，俄正制造新型水陆两栖“道尔-M2”防空导弹系统。
列奥诺夫在接受俄《国家防务》杂志采访时说，新型“道尔-M2”防空导弹系统的底盘由履带式改为轮式，主要特点是具备水陆两栖能力。
列奥诺夫指出，“道尔-M2”防空导弹系统至今仍然是俄陆军防空兵用于打击敌方高精准武器的主要战术武器装备。自2015年在叙利亚开展战斗值班以来，该系统共击落敌方45架无人机。目前，俄国防部与“道尔-M2”防空导弹系统生产商签署的采购合同能够保证该系统持续供应俄防空兵至2027年。
俄罗斯“道尔”系列防空导弹系统是一款由阿尔玛兹-安泰军工集团研制的全天候中低空防空导弹系统，可对中低空固定翼飞机、直升机、无人机、巡航导弹甚至短程弹道导弹等进行拦截。`,
  `古特雷斯任命新的联合国中东和平进程特别协调员。
新华社联合国12月21日电（记者尚绪谦）联合国秘书长古特雷斯的发言人21日宣布，古特雷斯当天任命挪威外交官托尔·文内斯兰为新任联合国中东和平进程特别协调员，接替即将离任的姆拉德诺夫。
文内斯兰是挪威资深外交官，现任挪威的中东和平进程特别代表。文内斯兰1983年进入挪威外交部工作，长期负责中东事务，2007年至2011年担任挪威驻巴勒斯坦民族权力机构代表，2012年至2015年担任挪威驻埃及和利比亚大使。
姆拉德诺夫2015年起担任联合国中东和平进程特别协调员，将于明年1月卸任，改任联合国秘书长利比亚问题特别代表`,
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