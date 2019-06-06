import Vue from "vue";
import Router from "vue-router";
import TravelMake from "./views/TravelMake.vue";
import TravelList from "./views/TravelList.vue";
import TravelMap from "./views/TravelMap.vue";
import TravelDiagram from "./views/TravelDiagram.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "travels",
      component: TravelList,
      alias: "/travels"
    },
    {
      path: "/travel/make",
      name: "travel-make",
      component: TravelMake
    },
    {
      path: "/travels/map",
      name: "travels-map",
      component: TravelMap
    },
    {
      path: "/travels/diagram",
      name: "travels-diagram",
      component: TravelDiagram
    }
  ]
});
