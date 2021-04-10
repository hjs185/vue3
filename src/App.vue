<template>
  <div id="nav">
    <router-link :to="'/' + item" custom v-for="item in routerList" :key="item">
      <p
        role="link"
        @click="handleRouter(item)"
        :class="{ 'active-color': item === strName }"
      >
        {{ LABELVALUE[item] }}
      </p>
    </router-link>
  </div>
  <router-view />
</template>

<script>
import * as vueRouter from "vue-router";
import { ref } from "vue";
const LABELVALUE = {
  entyExct: "实体抽取",
  entyAttrExct: "实体属性抽取",
  entyRelaExct: "实体关系抽取",
  evenClass: "事件分类",
};
export default {
  setup() {
    const routerList = ref([
      "entyExct",
      "entyAttrExct",
      "entyRelaExct",
      "evenClass",
    ]);
    let strName = ref(window.location.hash.split("/")[1] || "entyExct");

    let router = vueRouter.useRouter();
    const handleRouter = (val) => {
      strName.value = val;
      val = val.replace(val[0], val[0].toUpperCase());
      router.push({
        name: val,
      });
    };
    return {
      handleRouter,
      routerList,
      strName,
      LABELVALUE,
    };
  },
};
</script>

<style lang="scss" >
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  background-color: #f0f2f5;
}
</style>
<style lang="scss" scoped>
#nav {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  p {
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
}
.active-color {
  color: green;
}
</style>
