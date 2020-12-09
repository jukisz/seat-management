<template>
  <v-row justify="center">
    <v-dialog
      v-model="isModal"
      persistent
      max-width="900px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Update Payment</span>
        </v-card-title>
        <v-card-text>
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
                    multiple
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="$emit('cancel-payment')"
            text
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="updatePayment()"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
      props: {
          dialog: {
              type: Boolean
          },
          requestId: {
            type: Number
          }
      },
      data: () => ({
          valid: false,
          menu: false,
          form: {
            suggestedPayment: null,
            pledgedPayment: null,  
            paymentMethod: null,
            isPaid: false,
            donationAmount: null,
            paymentDate: null,
            referenceNumber: null,
            paymentNote: null,
          },
      }),
      computed: {
          ...mapGetters({
              allRequests: 'requestModule/allRequests',
              sampleGroupRequests: 'requestModule/sampleGroupRequests',
              paymentMethods: 'requestModule/paymentMethods',
          }),
          isModal () {
              return this.dialog
          }
      },
      watch: {
        dialog(){
          if(this.dialog === true){
            const findIndex = this.sampleGroupRequests.findIndex(item => item.groupRequestId === this.requestId)
            const request = this.sampleGroupRequests[findIndex]
            console.log(request)
            request.suggestedPayment = this.form.suggestedPayment
            request.pledgedPayment = this.form.pledgedPayment  
            request.paymentMethod = this.form.paymentMethod
            request.isPaid = this.form.isPaid
            request.donationAmount = this.form.donationAmount
            request.paymentDate = this.form.paymentDate
            request.referenceNumber = this.form.referenceNumber
            request.paymentNote = this.form.paymentNote
          }else{
            this.form.suggestedPayment = null
            this.form.pledgedPayment = null
            this.form.paymentMethod = null
            this.form.isPaid = false
            this.form.donationAmount = null
            this.form.paymentDate = null
            this.form.referenceNumber = null
            this.form.paymentNote = null
          }
        },
      },
      methods: {
          updatePayment () {
              this.$emit('cancel-payment')
              this.$store.dispatch('updatePayment', {
                form: { ...this.form },
                requestId: this.requestId
              })
          }
      }
  }
</script>