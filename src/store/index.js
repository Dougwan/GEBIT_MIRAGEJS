import Vue from "vue";
import Vuex from "vuex";
import Server from "@/server/server.js";

Vue.use(Vuex);

Server();

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
