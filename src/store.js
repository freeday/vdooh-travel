import Vue from "vue";
import Vuex from "vuex";
import TravelService from "@/services/TravelService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    travels: []
  },
  mutations: {
    ADD_TRAVEL(state, travel) {
      state.travels.push(travel);
    },
    SET_TRAVELS(state, travels) {
      state.travels = travels;
    }
  },
  actions: {
    makeTravel({ commit }, travel) {
      return TravelService.postTravel(travel).then(() => {
        commit("ADD_TRAVEL", travel);
      });
    },
    fetchTravels({ commit }) {
      return TravelService.getTravels().then(res => {
        let data = res.data;
        if (!data.length) return;
        let travels = data.map((o, i) => {
          o.divider = true;
          if (i === res.data.length - 1) {
            o.divider = false;
          }
          return o;
        });
        commit("SET_TRAVELS", travels);
      });
    }
  }
});
