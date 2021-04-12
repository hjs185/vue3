<template>
  <div>
    <CommonWrap
      :titleMsg="titleMsg"
      :textList="textList"
      :analysisLoading="loading"
      @handleAnalysis="handleAnalysis"
    ></CommonWrap>
    <div class="content" v-loading="loading">
      <div class="data-view left-box">
        <header>
          <div class="title">分析结果</div>
          <div class="tools"></div>
        </header>
        <main>
          <div class="result-box">
            <div class="left">
              <div class="content">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-html="resultText"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div class="data-view right-box">
        <header>
          <div class="title">分析结果</div>
          <div class="tools"></div>
        </header>
        <main>
          <div class="right">
            <div class="analy-bottom">
              <div
                v-for="(item, index) in colorList"
                :key="index"
                class="word-item"
                :style="{ backgroundColor: item.color }"
              >
                <span class="text">{{ item.typeName }}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import CommonWrap from "./common";
import { ref } from "vue";
import { Axios } from "@/axios";

const TITILE = "实体抽取";
const TEXTLIST = [
  "中国军事专家李杰27日对《环球时报》记者表示，目前来看，从飞行路线、机型选择、架次规模来看，美军机仍处于常态化巡逻，但不排除美军在亚太地区核动力航母因疫情“趴窝”后，强化美军机侦察、巡逻来弥补大中型战舰不足的考量。",
  "河北冠志农业科技有限公司生产部经理许晓燕介绍称，系统后台通过实时数据分析，可实现棚内自动增降温、自动加抽湿、自动卷帘等功能，农户也可通过手机APP（应用程序）进行手动远程操作，让棚内环境更适合作物生长。",
  "中建交通山东分公司菏泽市万福河桥梁工程项目部定时给复工一线工人送防护用品和矿泉水等，确保复工人员安全有保障和能喝到清凉的生活饮用水，不论是白天还是晚上从不间断",
  "美国太空军武器发展与获取中心代表斯蒂芬·布罗根称，这些地面干扰系统将主要用于在冲突初期暂时阻断航天器的通信信号，而不是摧毁卫星。",
  "俄罗斯卫星通讯社3月13日报道，据知情人士透露，俄罗斯尚未从印度尼西亚处收到有关放弃购买苏-35战斗机合同的通知",
  `Arleigh Burke-class guided-missile destroyer USS McCampbell (DDG-85) transited the Taiwan Strait on Wednesday,a week before Taiwan’s anti-China reunification president is inaugurated for a second term.Since taking office,President Joseph Biden has sought to implement a stated intent to rejoin the JCPOA,including welcoming talks with Iran toward that end.Administration officials have acknowledged that a U.S.return to the agreement would entail an easing of the stipulated U.S. economic sanctions.`,
  "尽管五角大楼发言人拒绝对这份报告发表评论，但《防务新闻》暗示，该报告内容与美国防长埃斯珀近来的讲话相呼应：五角大楼希望不再强调航母是其海军力量投射的核心，而把更多重点放在无人技术上。",
  "“罗斯福”号航母访问越南的计划在访问前几周就得到了美国军方高层的批准，其中包括印太司令部司令菲尔·戴维森上将。",
  "ABM-X-3 反弹道导弹分层防御系统，是原苏联在莫斯科附近部署的一种新型反弹道导弹防御系统。",
  "得知情况后，中国信保靠前服务，主动与江苏甬金加强沟通，利用短期出口信用保险帮助企业转变贸易方式，成功获得订单。",
];
export default {
  components: {
    CommonWrap,
  },
  setup() {
    let loading = ref(false);
    let colorList = ref([]);
    let resultData = ref([]);
    let resultText = ref("");
    // 开始分析
    const handleAnalysis = (val) => {
      loading.value = true;
      Axios("/nlp/ner", [{ key: "query", value: val }]).then((datas) => {
        loading.value = false;
        let { code, object } = datas.data;
        if (code === "200") {
          resultData.value = object.output.res;
          resultDataFilter();
        }
      });
    };
    // 初始化调用
    handleAnalysis(TEXTLIST[0]);
    const resultDataFilter = () => {
      let str = "";
      colorList.value = [];
      resultData.value.forEach((item) => {
        str += filterData(item);
      });
      resultText.value = str;
    };

    const filterData = (item) => {
      var str = item.query || item.text;
      var entityArr = item.entities;
      let object = {};
      entityArr = entityArr.reduce((item, next) => {
        if (!object[next.entity]) {
          item.push(next);
          object[next.entity] = true;
        }
        return item;
      }, []);

      entityArr.forEach((temp) => {
        var obj = {};
        var flag = false;
        if (colorList.value.length < 1) {
          obj.color = randomColor();
        } else {
          colorList.value.forEach((item) => {
            if (item.type == temp.type) {
              flag = true;
              obj.color = item.color;
            }
          });
          if (!flag) {
            obj.color = randomColor();
          }
        }

        str = str.replace(
          new RegExp(temp.entity, "gm"),
          "<span style='color:#fff; display:inline-block;padding:3px 8px;margin:3px 3px; background:" +
            obj.color +
            "'>" +
            temp.entity +
            "</span>"
        );
        switch (temp.type) {
          case "PER":
            obj.typeName = "人名";
            obj.type = "PER";
            break;
          case "LOC":
            obj.typeName = "地名";
            obj.type = "LOC";
            break;
          case "ORG":
            obj.typeName = "组织架构名";
            obj.type = "ORG";
            break;
          case "TIME":
            obj.typeName = "时间";
            obj.type = "TIME";
            break;
          case "TIM":
            obj.typeName = "时间";
            obj.type = "TIM";
            break;
          case "POS":
            obj.typeName = "职位名称";
            obj.type = "POS";
            break;
          case "PRO":
            obj.typeName = "其它";
            obj.type = "PRO";
            break;
          case "STOCK":
            obj.typeName = "股票";
            obj.type = "STOCK";
            break;
          case "FUND":
            obj.typeName = "基金";
            obj.type = "FUND";
            break;
          case "WEAPONRY":
            obj.typeName = "武器装备";
            obj.type = "WEAPONRY";
            break;
          // 新增类
          case "人物":
            obj.typeName = "人物";
            obj.type = "人物";
            break;
          case "国家":
            obj.typeName = "国家";
            obj.type = "国家";
            break;
          case "地点":
            obj.typeName = "地点";
            obj.type = "地点";
            break;
          case "武器装备":
            obj.typeName = "武器装备";
            obj.type = "武器装备";
            break;
          case "WUQI":
            obj.typeName = "武器装备";
            obj.type = "WUQI";
            break;
          case "组织机构":
            obj.typeName = "组织机构";
            obj.type = "组织机构";
            break;
          case "职位":
            obj.typeName = "职位";
            obj.type = "职位";
            break;
          case "WORKER":
            obj.typeName = "职位";
            obj.type = "WORKER";
            break;
          case "NATION":
            obj.typeName = "国家";
            obj.type = "NATION";
            break;
          default:
            break;
        }
        if (!flag) colorList.value.push(obj);
      });
      return str;
    };

    //随机生成十六进制颜色
    const randomColor = () => {
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
      );
    };
    return {
      titleMsg: TITILE,
      textList: TEXTLIST,
      handleAnalysis,
      loading,
      resultText,
      colorList,
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
.left-box {
  width: 55%;
}
.right-box {
  width: 40%;
}
.analys-result .top-title {
  font-size: 18px;
  line-height: 31px;
  color: #333;
  text-align: left;
  margin: 24px 0 12px 0;
}
.result-box {
  width: 100%;
  background: #ffffff;
  overflow: hidden;
  font-size: 18px;
  line-height: 24px;
  .left {
    font-size: 16px;
    .title {
      text-align: left;
      color: #333;
    }
    .content {
      width: 100%;
      font-size: 14px;
      color: #666;
      .word-item {
        float: left;
        border: 1px solid #d9d9d9;
        padding: 6px 16px;
        margin: 0 10px 12px 0;
        text-align: center;
        color: #333;
        font-size: 14px;
        cursor: pointer;
        span {
          display: block;
        }
        .character {
          font-size: 16px;
          color: #d9d9d9;
        }
      }
      .activeItem {
        border: 1px solid #66b3ff;
      }
    }
  }
}
.right {
  font-size: 16px;
  .title {
    text-align: left;
    color: #333;
    margin-bottom: 24px;
  }
  .rightContent {
    width: 100%;
    padding: 30px 20px 10px 36px;
    background: #f0f7ff;
    margin-bottom: 30px;
    p {
      color: #999999;
      margin-bottom: 20px;
      span {
        color: #333;
      }
    }
  }

  .analy-bottom {
    overflow: hidden;
    .word-item {
      float: left;
      padding: 3px 8px;
      margin: 5px 3px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      span {
        display: block;
      }
    }
  }
}
</style>