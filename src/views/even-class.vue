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
  `挪威军舰撞船事故或由人为因素造成。
挪威事故调查委员会29日发表的初步调查报告显示，本月早些时候发生的挪威海军护卫舰和在马耳他注册的希腊油轮相撞事故可能是人为因素造成。
这份报告说，初步评估认为此次事故并非由单一行为造成，而是牵涉“一系列相互作用的复杂因素和情形”。就目前的调查情况来看，没有发现技术系统有出现故障的情况。
报告指出，事故发生前，“黑尔格·英斯塔”号护卫舰的船员未能把正在离港的“Sola TS”号油轮上的灯光与岸上的灯光分辨开来，误以为该油轮是一个固定物体。起航后的油轮继续使用甲板灯光意味着护卫舰船员无法看到油轮上的导航灯。
此外，在油轮导航员和船舶交通服务中心要求护卫舰采取行动避免碰撞时，护卫舰船员仍把油轮当成固定物体，并误以为自己正与雷达中出现的其他船只通话。
挪威事故调查委员会强调，这是一份初步调查报告，可能与事实仍存在误差。调查人员还需进一步深入调查。`,
  `俄表示正制造水陆两栖“道尔-M2”防空导弹系统。
新华社莫斯科6月15日电（记者吴刚）俄罗斯防空兵司令亚历山大·列奥诺夫15日说，俄正制造新型水陆两栖“道尔-M2”防空导弹系统。
列奥诺夫在接受俄《国家防务》杂志采访时说，新型“道尔-M2”防空导弹系统的底盘由履带式改为轮式，主要特点是具备水陆两栖能力。
列奥诺夫指出，“道尔-M2”防空导弹系统至今仍然是俄陆军防空兵用于打击敌方高精准武器的主要战术武器装备。自2015年在叙利亚开展战斗值班以来，该系统共击落敌方45架无人机。目前，俄国防部与“道尔-M2”防空导弹系统生产商签署的采购合同能够保证该系统持续供应俄防空兵至2027年。
俄罗斯“道尔”系列防空导弹系统是一款由阿尔玛兹-安泰军工集团研制的全天候中低空防空导弹系统，可对中低空固定翼飞机、直升机、无人机、巡航导弹甚至短程弹道导弹等进行拦截。`,
  `古特雷斯任命新的联合国中东和平进程特别协调员。
新华社联合国12月21日电（记者尚绪谦）联合国秘书长古特雷斯的发言人21日宣布，古特雷斯当天任命挪威外交官托尔·文内斯兰为新任联合国中东和平进程特别协调员，接替即将离任的姆拉德诺夫。
文内斯兰是挪威资深外交官，现任挪威的中东和平进程特别代表。文内斯兰1983年进入挪威外交部工作，长期负责中东事务，2007年至2011年担任挪威驻巴勒斯坦民族权力机构代表，2012年至2015年担任挪威驻埃及和利比亚大使。
姆拉德诺夫2015年起担任联合国中东和平进程特别协调员，将于明年1月卸任，改任联合国秘书长利比亚问题特别代表`,
  `以色列战机轰炸加沙地带哈马斯军事目标。
以色列战机5日晚对巴勒斯坦伊斯兰抵抗运动（哈马斯）位于加沙地带的军事目标进行了轰炸。
以色列国防军发表声明说，一枚火箭弹当晚从加沙地带发射至以色列境内。作为回应，以军战机对加沙地带南部一处哈马斯军事哨所进行了轰炸。
目前尚无任何组织或个人宣称制造了火箭弹袭击事件。据以色列媒体报道，此次火箭弹袭击没有造成以方人员伤亡。
以色列国防军在另一份声明中说，3名巴勒斯坦男子5日晚在约旦河西岸城市杰宁附近向以军哨所投掷燃烧瓶，以军士兵开枪打死一名巴勒斯坦人，并对另外两人展开搜寻。
在美国撮合下，以色列9月15日与阿联酋和巴林在美国白宫签署关系正常化协议。相关协议遭到巴勒斯坦各方的反对。
今年8月初以来，哈马斯武装向以色列方向发射火箭弹和放飞带有纵火装置的气球。作为回应，以军连续多日对哈马斯军事目标进行炮击和空袭。在卡塔尔的斡旋下，双方于8月31日达成谅解协议，以遏制地区紧张局势升级`,
  `厄瓜多尔签约购买中国科兴公司新冠疫苗。
厄瓜多尔卫生部长塞瓦略斯25日宣布，厄瓜多尔政府已与中国科兴公司签署新冠疫苗采购协议。
塞瓦略斯当天在新闻发布会上表示，与中国科兴公司签署新冠疫苗采购协议对厄瓜多尔是重大利好消息，有助于厄瓜多尔尽快开展大规模疫苗接种，提高疫苗接种率。
塞瓦略斯说，科兴公司研发的新冠疫苗已获得厄瓜多尔医药监管部门许可，首批科兴疫苗将于3月运抵厄瓜多尔，其余疫苗将在4月交付。
中国驻厄瓜多尔大使馆经济商务参赞陈峰表示，科兴公司是首个与厄方达成新冠疫苗供应协议的中国疫苗企业，其提供的疫苗将极大缓解厄瓜多尔当前面临的新冠疫苗短缺局面，有效助力厄方抗击新冠疫情。
厄瓜多尔卫生部25日发布的数据显示，该国过去24小时新增新冠确诊病例2390例，累计确诊281169例；新增死亡病例46例，累计死亡10929例。`,
  `北马其顿总统、总理会见魏凤和。
3月30日，北马其顿总统彭达罗夫斯基、总理扎埃夫在斯科普里分别会见到访的中国国务委员兼国防部长魏凤和。
彭达罗夫斯基说，北马与中国彼此信任，双边关系友好。北马坚定支持一个中国政策，对共建“一带一路”充满信心。北马方赞赏中国抗疫取得巨大成就，感谢中国给予的抗疫援助。期待在疫情好转后，两国开展更加频繁深入的交流与合作。
扎埃夫说，北马独立以来，得到中国巨大支持和帮助，北马方对此深表感谢。两国合作潜力巨大，北马希望与中国加强在经贸、投资、基建以及防务安全等各领域合作，推动两国关系健康稳定发展。
魏凤和介绍了中国疫情防控、经济社会发展和中美关系情况，阐明了在台湾、香港、新疆等问题上的原则立场。他说，中方赞赏北马方坚定奉行一个中国政策，希望北马在涉及中国核心利益问题上继续给予支持。中方愿与北马方一道，充分利用“一带一路”和“17+1”平台深化务实合作，实现互利共赢、共同发展。中国军队重视发展同北马军队关系，致力于深化交流合作，推动两军关系走深走实。
当天，魏凤和与北马其顿国防部长舍凯琳斯卡举行会谈，就两国两军关系及国际和地区安全形势深入交换意见。`,
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