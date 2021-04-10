import { createRouter, createWebHashHistory } from "vue-router";
import EntyExct from "../views/enty-exct.vue";
import EntyAttrExct from "../views/enty-attr-exct.vue";
import EntyRelaExct from "../views/enty-rela-exct.vue";
import EvenClass from "../views/even-class.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "EntyExct" }
  },
  {
    path: "/entyExct",
    name: "EntyExct",
    component: EntyExct
  },
  {
    path: "/entyAttrExct",
    name: "EntyAttrExct",
    component: EntyAttrExct
  },
  {
    path: "/entyRelaExct",
    name: "EntyRelaExct",
    component: EntyRelaExct
  },
  {
    path: "/evenClass",
    name: "EvenClass",
    component: EvenClass
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
