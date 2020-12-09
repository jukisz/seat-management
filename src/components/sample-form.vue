<template>
  <v-card style="border:2px solid black" height="750" width="1100">
    <div class="mx-4">
      <form-field :field="subject"></form-field>
    </div>
    <div
      id="style-11"
      class="mt-4 mx-4"
      style="overflow-x: hidden; overflow-y: auto; height:45%;"
    >
      <form-field :field="content"></form-field>
    </div>
  </v-card>
</template>
<script>
  import FormField from "../objs/Shared/FormField";
import { FieldTypes } from "../objs/Shared/FieldTypes";
export default {
  data() {
    return {
      dialog: true
    };
  },

  computed: {
    subject: function() {
      return new FormField({
        tier: 1,
        moduleName: "sampleModule",
        objName: "object",
        propName: "subject",
        label: "Subject",
        componentName: FieldTypes.TEXT_FIELD
      });
    },
    content: function() {
      return new FormField({
        tier: 1,
        moduleName: "sampleModule",
        objName: "object",
        propName: "content",
        componentName: FieldTypes.TEXT_AREA
      });
    }
  }
};
</script>
