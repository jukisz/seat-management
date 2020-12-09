rest<template>
  <div>
    <v-app-bar dark app clipped-left color="#542344">
      <app-bar-nav-icon show="true" />

      <v-img class="mx-2"
             src="assets/lion.png"
             max-height="40"
             max-width="40"
             contain></v-img>

      <v-toolbar-title style="font-size:14px;">MYRCB SEATING PORTAL</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
import AppBarNavIcon from "./app-bar-nav-icon.vue";
export default {
  components: {
    "app-bar-nav-icon": AppBarNavIcon,
  },
  computed: {},
};
</script>
