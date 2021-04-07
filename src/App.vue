<template>
  <div id="nav">
    <router-link to="/entyExct" custom>
      <p role="link" @click="handleRouter('EntyExct')">实体抽取</p>
    </router-link>
    <router-link to="/entyAttrExct" custom>
      <p role="link" @click="handleRouter('EntyAttrExct')">实体属性抽取</p>
    </router-link>
    <router-link to="/entyRelaExct" custom>
      <p role="link" @click="handleRouter('EntyRelaExct')">实体关系抽取</p>
    </router-link>
    <router-link to="/evenClass" custom>
      <p role="link" @click="handleRouter('EvenClass')">事件分类</p>
    </router-link>
  </div>
  <router-view />
</template>

<script>
import * as vueRouter from "vue-router";
export default {
  setup() {
    let router = vueRouter.useRouter();
    const handleRouter = (val) => {
      router.push({
        name: val,
      });
    };
    return {
      handleRouter,
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
  p {
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
}
</style>
