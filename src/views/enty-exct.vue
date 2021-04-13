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
import { entyExct } from "../../public/data";

const TITILE = "实体抽取";
const TEXTLIST = entyExct;
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