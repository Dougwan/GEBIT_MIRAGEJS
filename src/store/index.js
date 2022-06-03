import Vue from "vue";
import Vuex from "vuex";
import createServer from "@/server/server.js";

Vue.use(Vuex);

if (process.env.NODE_ENV === "development") {
  createServer();
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
