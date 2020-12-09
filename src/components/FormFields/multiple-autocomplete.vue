<template>
  <v-autocomplete
    :items="field.options"
    :value="value"
    color="blue-grey lighten-2"
    :label="field.label"
    :item-text="field.itemText"
                  :item-value="field.itemValue"
    multiple
    dense
    chips
    deletable-chips
    return-object
    hide-selected
    solo
    v-on:change="onChange"
  > 
  </v-autocomplete>
</template>

<script>
export default {
  props: ["field", "value"],

    methods: {
      onChange(event) {
        this.$emit("fieldChange", event);
      }
    }
};
</script>
