import * as api from "../Services/api.js";
import SampleObject from "../../objs/SampleObject";
export const state = {
  object: new SampleObject(),
  firstName: "",
  lastName: "",
};
export const mutations = {
  setFirstName(state, payload) {
    state.firstName = payload;
  },
};
export const getters = {
  getNameForId: (state) => (id) => {
    return state.firstName;
  },
};
export const actions = {
  async getUsers({ commit, state }) {
    console.log("Getting users action");
    return api.get().then((response) => {
      commit("setFirstName", response.data);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
