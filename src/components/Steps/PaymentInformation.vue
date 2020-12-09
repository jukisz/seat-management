<template>
  <v-row>
    <v-col cols="12"
      md="12"
      lg="9"
      class="mx-auto">
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="form.suggestedPayment"
              label="Suggested Payment"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="form.pledgedPayment"
              label="Pledged Payment"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
                v-model="form.paymentMethod"
                :items="paymentMethods"
                label="Payment Method"
                dense
              ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-checkbox
              v-model="form.isPaid"
              label="Paid"
            >
            </v-checkbox>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-if="form.isPaid"
              v-model="form.donationAmount"
              label="Donation Amount"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.paymentDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-combobox
                  v-model="form.paymentDate"
                  dense
                  label="Payment date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-combobox>
              </template>
              <v-date-picker
                v-model="form.paymentDate"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(form.paymentDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
              <v-text-field
                v-model="form.referenceNumber"
                label="Reference Number"
                dense
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="9"
          >
            <v-textarea
              v-model="form.paymentNote"
              label="Payment Note"
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
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import { mapGetters } from 'vuex'
export default {
  name: 'Paymentinformation',
  directives: { mask },
  mixins: [validationMixin],
  data: () => ({
    valid: false,
    form: {
      suggestedPayment: 0,
      pledgedPayment: 0,  
      paymentMethod: "",
      isPaid: false,
      donationAmount: 0,
      paymentDate: "10/24/2020",
      referenceNumber: null,
      paymentNote: null,
    },
    menu: false,
    age: null,
    affiliations: [],
    contacts: null,
    searchedPerson: null,
    maskZipCode: '#####',
    maskPhone: '(###) ####-####'
  }),
  computed: {
    ...mapGetters({
      paymentMethods: 'personModule/paymentMethods',
      groupRequest: 'requestModule/groupRequest',
      isEditRequest: 'requestModule/isEditRequest',
    }),
    currentYear () {
      const d = new Date()
      return d.getFullYear()
    },
  },
  validations: {
    form: {
      gender: { required },
      title: { required },
      firstName: { required },
      lastName: { required },
      streetAddress: { required },
      state: { required },
      zipCode: { required },
      homePhone: { required },
      mobilePhone: { required },
      emailAddress: { email },
      studentStatus: { required },
      classOf: { required },
    },
    affiliation: { required },
    age: { required },
  },
  created () {
    if(this.isEditRequest){
      this.form.suggestedPayment = this.groupRequest.suggestedPayment 
      this.form.pledgedPayment = this.groupRequest.pledgedPayment
      this.form.paymentMethod = this.groupRequest.paymentMethod
      this.form.isPaid = this.groupRequest. isPaid
      this.form.donationAmount = this.groupRequest.donationAmount
      this.form.paymentDate = this.groupRequest.paymentDate
      this.form.referenceNumber = this.groupRequest.referenceNumber
      this.form.paymentNote = this.groupRequest.paymentNote
    
    }
  },
  methods: {
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
    selectPerson () {
      const $this = this
      const findIndex = $this.contacts.findIndex(item => item === $this.searchedPerson)
      if(findIndex === -1){
        $this.$refs.form.reset()
      }else{
        const findPerson = $this.people[findIndex]
        $this.form = { ...findPerson }
        $this.age = $this.currentYear - $this.form.yearBorn
        if($this.form && $this.form.isSarElef)$this.affiliations.push('Sar Elef')
        if($this.form && $this.form.isAlumnus)$this.affiliations.push('Alumnus')
        if($this.form && $this.form.isKollel)$this.affiliations.push('Kollel')
        if($this.form && $this.form.isCurrentStudent)$this.affiliations.push('Current student')
        if($this.form && $this.form.isYomimNoraimMispallel)$this.affiliations.push('Yomim Noraim Mispallel')
        if($this.form && $this.form.isWeeklyMispallel)$this.affiliations.push('Weekly Mispallel')
        if($this.form && $this.form.isOtherAffiliation)$this.affiliations.push('Other')
      }
    },
  }
}
</script>
