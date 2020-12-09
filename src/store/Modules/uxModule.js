const state = {
  //Validation status - to determine if continue button on forms should be active
  //For ux
  showNavDrawer: true,
  showLoader: false,
  loaderMsg: "",
  showSnackbar: false,
  snackbarMsg: ""
};
const actions = {};
const mutations = {
  setShowLoader(state, val) {
    state.showLoader = val;
    if (val == false) {
      state.loaderMsg = "";
    }
  },

  setShowSnackbar(state, val) {
    if (val == true) {
      setTimeout(function() {
        state.showSnackbar = false;
      }, 6000);
    }
    state.showSnackbar = val;
  },

  setSnackbarMsg(state, val) {
    state.snackbarMsg = val;
  },

  setLoaderMsg(state, val) {
    state.loaderMsg = val;
  },

  toggleShowNavDrawer(state) {
    state.showNavDrawer = !state.showNavDrawer;
  },
  setShowNavDrawer(state, payload) {
    state.showNavDrawer = payload.value;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
