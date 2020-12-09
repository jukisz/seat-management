<template>
  <div class="mr-2 mt-5">
    <v-data-table
      :headers="headers"
      :items="allRequests"
      sort-by="name"
      class="elevation-1 mx-auto"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>All Request</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="btn mb-2" @click="showNewRequest">
            New Request
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          x-small
          class="mr-2"
          color="primary"
          title="Edit Group Request"
          @click="editItem(item)"
        >
          fa fa-pencil
        </v-icon>
        <v-icon
          class="mr-2"
          x-small
          color="primary"
          title="Delete Group Request"
          @click="deleteItem(item)"
        >
          fa fa-trash
        </v-icon>
        <v-icon
          x-small
          class="mr-2"
          color="primary"
          title="Update Payment Information"
          @click="showPayment(item)"
        >
          fa fa-money
        </v-icon>
        <v-icon
          x-small
          class="mr-2"
          color="primary"
          title="Update Note"
          @click="showNote(item)"
        >
          fa fa-edit
        </v-icon>
        <v-icon
          x-small
          class="mr-2"
          color="primary"
          title="View Full Information"
          @click="viewFullInfo(item)"
        >
          fa fa-info-circle
        </v-icon>
        <v-icon
          x-small
          class="mr-2"
          color="primary"
          title="Update Tags"
          @click="showTags(item)"
        >
          fa fa-tags
        </v-icon>
        <v-icon x-small color="primary" title="Assign" @click="assign(item)">
          fa fa-gavel
        </v-icon>
      </template>
    </v-data-table>
    <update-payment-modal
      :dialog="paymentDialog"
      :requestId="currentRequestId"
      @cancel-payment="cancelPayment"
    />
    <update-note-modal
      :dialog="noteDialog"
      :requestId="currentRequestId"
      @cancel-note="cancelNote"
    />
    <full-info-modal
      :dialog="fullInfoDialog"
      :requestId="currentRequestId"
      @cancel-full-info="cancelFullInfo"
    />
    <update-tags-modal
      :dialog="tagsDialog"
      :requestId="currentRequestId"
      @cancel-tags="cancelTags"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import updatePaymentModal from "@/components/Dialog/updatePaymentModal";
import updateNoteModal from "@/components/Dialog/updateNoteModal";
import fullInfoModal from "@/components/Dialog/fullInfoModal";
import updateTagsModal from "@/components/Dialog/updateTagsModal";

export default {
  components: {
    updatePaymentModal,
    updateNoteModal,
    fullInfoModal,
    updateTagsModal,
  },
  data: () => ({
    paymentDialog: false,
    noteDialog: false,
    fullInfoDialog: false,
    tagsDialog: false,
    currentRequestId: null,
    headers: [
      {
        text: "OwnerName",
        value: "ownerName",
      },
      {
        text: "TotalMenSeats",
        value: "totalMenSeats",
      },
      {
        text: "TotalWomenSeats",
        value: "totalWomenSeats",
      },
      {
        text: "MenFulfillmentStatus",
        value: "menFulfillmentStatus",
      },
      {
        text: "WomenFulfillmentStatus",
        value: "womenFulfillmentStatus",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      allRequests: "requestModule/allRequests",
    }),
  },
  created() {
    this.$store.dispatch("requestModule/getAllGroupRequest");
  },
  methods: {
    showNewRequest() {
      this.$router.push({
        name: "NewRequestPage",
      });
    },
    async editItem(item) {
      await this.$store.dispatch(
        "requestModule/getGroupRequestForEdit",
        item.groupRequestId
      );
      this.$store.dispatch('requestModule/setIsEditRequest', true)
      this.$router.push({
        name: "EditRequestPage",
      });
    },
    async deleteItem(item) {
      const { success, message, error } = await this.$store.dispatch(
        "personModule/deletePerson",
        item.personId
      );
      if (success) {
        const snackData = {
          value: true,
          color: "primary",
          text: message,
        };
        await this.$store.dispatch("personModule/setSnackData", snackData);
      } else {
        const snackData = {
          value: true,
          color: "red",
          text: error,
        };
        await this.$store.dispatch("personModule/setSnackData", snackData);
      }
    },
    showPayment(item) {
      this.paymentDialog = true;
      this.currentRequestId = item.groupRequestId;
    },
    cancelPayment() {
      this.paymentDialog = false;
    },
    showNote(item) {
      this.noteDialog = true;
      this.currentRequestId = item.groupRequestId;
    },
    cancelNote() {
      this.noteDialog = false;
    },
    viewFullInfo(item) {
      this.fullInfoDialog = true;
      this.currentRequestId = item.groupRequestId;
    },
    cancelFullInfo() {
      this.fullInfoDialog = false;
    },
    showTags(item) {
      this.tagsDialog = true;
      this.currentRequestId = item.groupRequestId;
    },
    cancelTags() {
      this.tagsDialog = false;
    },
    assign(item) {},
    filterByGender() {
      this.$store.dispatch("personModule/filterByGender", this.gender);
    },
    filterByAffiliation() {
      console.log(this.fGenders);
    },
  },
};
</script>
