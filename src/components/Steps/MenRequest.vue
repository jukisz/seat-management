<template>
  <v-row>
    <v-col cols="12"
      md="12"
      lg="12"
      class="mx-auto">
      <v-row>
        <v-col
          cols="12"  
          md="3"
        >
            <v-text-field
              v-model="counter"
              append-outer-icon="fa fa-plus"
              prepend-icon="fa fa-minus"
              filled
              label="Number of Seat"
              type="text"
              @click:append-outer="increase"
              @click:prepend="decrease"
            ></v-text-field>
        </v-col>
      </v-row>
      <v-form v-model="valid" ref="form">
        <SeatCard v-for="index in counter"
            :key="index"
            :counter="index"
            :genderProp="genderProp"
        />
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-checkbox
              v-model="form.menPreferHistoricalSeat"
              label="Prefers to keep same seats as in previous years"
              dense
            >
            </v-checkbox>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-checkbox
              v-model="form.menWillingToSwitch"
              label="Willing to switch seats to accommodate additional requests"
              dense
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-checkbox
              v-model="form.menRequestingFewer"
              label="Requesting fewer seats than in previous years"
              dense
            >
            </v-checkbox>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-if="form.menRequestingFewer"
              v-model="form.menRequestingFewerWhichKeep"
              label="Which seats should be kept?"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="9"
          >
            <v-textarea
              v-model="form.menDetails"
              label="Special Requests or Notes"
              dense
            ></v-textarea>
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          :disabled="!valid"
          @click="next()"
        >
          Next
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="before()"
        >
          Before
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="close()"
        >
          Cancel
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
  
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import SeatCard from '@/components/Steps/SeatCard'
export default {
  name: 'MenRequest',
  components: {
    SeatCard,
  },
  mixins: [validationMixin],
  data: () => ({
    valid: true,
    counter: 0,
    genderProp: "Male",
    form: {
        menPreferHistoricalSeat: false,
        menWillingToSwitch: false,
        menRequestingFewer: false,
        menRequestingFewerWhichKeep: null,
        menDetails: null,
    },
  }),
  computed: {
    ...mapGetters({
      gender: 'personModule/gender',
      groupRequest: 'requestModule/groupRequest',
      isEditRequest: 'requestModule/isEditRequest',

    }),
  },
  created () {
    if(this.isEditRequest){
      this.form.menPreferHistoricalSeat = this.groupRequest.menPreferHistoricalSeat
      this.form.menWillingToSwitch = this.groupRequest.menWillingToSwitch
      this.form.menRequestingFewer = this.groupRequest.menRequestingFewer
      this.form.menRequestingFewerWhichKeep = this.groupRequest.menRequestingFewerWhichKeep
      this.form.menDetails = this.groupRequest.menDetails
      this.counter = this.groupRequest.menRequests.length
    }
  },
  methods: {
    decrease() {
      if(this.counter>1)this.counter --
    },
    increase() {
      this.counter ++
    },
    async next(){
      await this.$store.dispatch('requestModule/setRequestData', {...this.form})
      this.$emit('next')
    },
    async before(){
      this.$emit('before')
    },
    close () {
      this.$router.push({
        name: 'RequestListPage'
      })
    },
  }
}
</script>
