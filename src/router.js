import Vue from "vue";
import Router from "vue-router";
import TravelMake from "./views/TravelMake.vue";
import TravelList from "./views/TravelList.vue";
import TravelMap from "./views/TravelMap.vue";
import TravelChart from "./views/TravelChart.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/travel/list",
      name: "travel-list",
      component: TravelList,
      alias: "/"
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
      path: "/travels/chart",
      name: "travels-chart",
      component: TravelChart
    }
  ]
});
