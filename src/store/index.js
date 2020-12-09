import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import uxModule from "./Modules/uxModule";
import personModule from "./Modules/personModule";
import formFieldsModule from "./Modules/formFieldsModule";
import sampleModule from "./Modules/sampleModule";
import requestModule from "./Modules/requestModule";

const state = {};

const mutations = {};

const actions = {};


export default new Vuex.Store({
  modules: {
    uxModule: uxModule,
    formFieldsModule: formFieldsModule,
    sampleModule: sampleModule,
    personModule: personModule,
    requestModule: requestModule,
  },

  state,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
