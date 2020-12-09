<template>
  <div>
    <v-list-group no-action dense>
      <template v-slot:activator>
        <v-list-item>
          <v-list-item-icon>
            <icon small color="#FFFFFF" :icon="menuItem.icon"></icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <div v-for="(subItem, index) in menuItem.children" :key="index">
        <sub-menu-item v-if="subItem.onNavBar"
                       :subMenuItem="subItem"></sub-menu-item>
      </div>
    </v-list-group>
  </div>
</template>

<script>
import SubMenuItem from "./sub-menu-item";
export default {
  props: {
    menuItem: Object
  },
  components: {
    subMenuItem: SubMenuItem
  }
};
</script>

<style>


</style>
