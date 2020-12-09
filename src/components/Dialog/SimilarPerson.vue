<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Please confirm
          </v-card-title>
          <v-card-text>
              We found a person in our database whose information matches some of the details you provided. Is this him / her? <br>
              firstName: {{personData.firstName}}
              lastName: {{personData.lastName}}
              street address: {{personData.streetAddress}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Yes
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'SimilarPerson',
    props: {
        personData: {
            type: Object
        },
        showDialog: {
            type: Boolean
        }
    },
    data: () => ({
        dialog: false,
    })
}
</script>