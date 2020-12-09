<template>
  <v-app id="app">
    <toolbar></toolbar>
    <nav-drawer></nav-drawer>

    <v-main>
      <div>
        <v-snackbar
          v-model="snackData.value"
          right
          top
          :color="snackData.color"
        >
          {{ snackData.text }}
        </v-snackbar>
        <loader></loader>
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import Toolbar from "./components/AppBar/toolbar";
import NavDrawer from "./components/NavigationBar/nav-drawer";
import Snackbar from "./components/Shared/snackbar";
import Loader from "./components/Shared/loader";
export default {
  name: "app",
  components: {
    toolbar: Toolbar,
    navDrawer: NavDrawer,
    snackbar: Snackbar,
    loader: Loader,
  },
  computed: {
    ...mapGetters({
      snackData: "personModule/snackData",
    }),
  },
};
</script>
