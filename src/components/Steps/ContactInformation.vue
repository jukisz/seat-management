<template>
  <v-row>
    <v-col cols="12"
      md="12"
      lg="12"
      class="mx-auto">
      <v-row v-if="!isEditRequest">
        <v-col cols="12"
        md="10"
        class="mx-auto">
          <v-autocomplete
            :items="contacts"
            v-model="searchedPerson"
            label="Search for people"
            clearable
            dense
            filled
            rounded
            @input="selectPerson"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col
            cols="12"
            md="3"
          >
            <v-select
              :items="gender"
              label="Gender"
              v-model="form.gender"
              dense
              :error-messages="genderErrors"
              @change="$v.form.gender.$touch()"
              @blur="$v.form.gender.$touch()"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-select
              :items="title[form.gender]"
              label="Title"
              v-model="form.title"
              dense
              :error-messages="titleErrors"
              @change="$v.form.title.$touch()"
              @blur="$v.form.title.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.firstName"
              label="First Name"
              dense
              :error-messages="firstNameErrors"
              @input="$v.form.firstName.$touch()"
              @blur="$v.form.firstName.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.lastName"
              label="Last Name"
              dense
              :error-messages="lastNameErrors"
              @input="$v.form.lastName.$touch()"
              @blur="$v.form.lastName.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.streetAddress"
              label="Street address line 1"
              dense
              :error-messages="streetAddressErrors"
              @input="$v.form.streetAddress.$touch()"
              @blur="$v.form.streetAddress.$touch()"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.streetAddressLine2"
              label="Street address line 2"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.city"
              label="City"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-select
              :items="usStates"
              label="State"
              v-model="form.state"
              dense
              :error-messages="stateErrors"
              @change="$v.form.state.$touch()"
              @blur="$v.form.state.$touch()"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="form.zipCode"
              label="Zip code"
              dense
              :error-messages="zipCodeErrors"
              @input="$v.form.zipCode.$touch()"
              @blur="$v.form.zipCode.$touch()"
              v-mask="maskZipCode"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="form.homePhone"
              label="Home phone"
              dense
              :error-messages="homePhoneErrors"
              @input="$v.form.homePhone.$touch()"
              @blur="$v.form.homePhone.$touch()"
              v-mask="maskPhone"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="form.mobilePhone"
              label="Mobile phone"
              dense
              :error-messages="mobilePhoneErrors"
              @input="$v.form.mobilePhone.$touch()"
              @blur="$v.form.mobilePhone.$touch()"
              v-mask="maskPhone"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="form.preferredPhone"
              :items="preferredPhone"
              label="Preferred Phone"
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.emailAddress"
              label="Email address"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="affiliations"
              :items="affiliation"
              label="Affiliations"
              dense
              multiple
              :error-messages="affiliationErrors"
              @input="$v.affiliation.$touch()"
              @blur="$v.affiliation.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-if="isCurrentStudent"
              v-model="form.studentStatus"
              :items="studentStatus"
              label="StudentStatus"
              dense
              @input="$v.form.studentStatus.$touch()"
              @blur="$v.form.studentStatus.$touch()"
            ></v-select>
          </v-col>
          <v-col
            v-if="studentStatus"
            cols="12"
            md="6"
          >
            <v-select
              v-if="isGrade"
              v-model="form.grade"
              :items="grade"
              label="Grade"
              dense
            ></v-select>
            <v-text-field
              v-else-if="isShiur"
              v-model="form.shiur"
              label="Shiur"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"
            md="6">
              <v-text-field
                v-model="age"
                label="Age"
                dense
                :error-messages="ageErrors"
                @input="$v.age.$touch()"
                @blur="$v.age.$touch()"
              ></v-text-field>
          </v-col>
          <v-col cols="12"
            md="6">
              <v-text-field
                v-model="form.classOf"
                label="ClassOf"
                dense
                :error-messages="classOfErrors"
                @input="$v.form.classOf.$touch()"
                @blur="$v.form.classOf.$touch()"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"
            md="6">
              <v-checkbox
                v-model="form.isRequestOwner"
                label="Request Owner"
                dense
              ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"
            md="9">
              <v-textarea
                v-model="form.personNote"
                label="Note"
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
          @click="close()"
        >
          Cancel
        </v-btn>
      </v-form>
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
              {{personData}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="confirmDialog('yes')"
            >
              Yes
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="confirmDialog('no')"
            >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
  
</template>
<script>
import { validationMixin } from 'vuelidate'
import formValidationMixin from '@/mixins/formValidationMixin'
import { required, email } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import { mapGetters } from 'vuex'

export default {
  name: 'ContactInformation',
  directives: { mask },
  mixins: [
    validationMixin, formValidationMixin
    ],
  data: () => ({
    valid: false,
    form: {},
    dialog: false,
    personData: null,
    age: null,
    affiliations: [],
    contacts: null,
    searchedPerson: null,
    maskZipCode: '#####',
    maskPhone: '(###) ####-####'
  }),
  computed: {
    ...mapGetters({
      gender: 'personModule/gender',
      title: 'personModule/title',
      person: "requestModule/person",
      usStates: 'personModule/usStates',
      preferredPhone: 'personModule/preferredPhone',
      affiliation: 'personModule/affiliation',
      studentStatus: 'personModule/studentStatus',
      grade: 'personModule/grade',
      people: 'personModule/people',
      groupRequest: 'requestModule/groupRequest',
      isEditRequest: 'requestModule/isEditRequest',
    }),
  },
  async created () {
    if(this.$route.name === 'NewRequestPage'){
      await this.$store.dispatch('personModule/getAllPeople')
      if(this.people.length > 0){
        this.contacts = this.people.map(function(item) {
          return item.firstName + ' ' + item.lastName + ', ' + item.streetAddress + (item.streetAddressLine2 ? (', ' + item.streetAddressLine2) : '')
        })
      }
      this.form = {
        ...this.form,
        ...this.person
      }
    } else {
        this.form = {
          ...this.form,
          ...this.groupRequest.owner
        }
    }
    if(this.form.yearBorn)this.age = this.currentYear - this.form.yearBorn
    if(this.person && this.person.isSarElef) this.affiliations.push('Sar Elef')
    if(this.person && this.person.isAlumnus) this.affiliations.push('Alumnus')
    if(this.person && this.person.isKollel) this.affiliations.push('Kollel')
    if(this.person && this.person.isCurrentStudent) this.affiliations.push('Current student')
    if(this.person && this.person.isYomimNoraimMispallel) this.affiliations.push('Yomim Noraim Mispallel')
    if(this.person && this.person.isWeeklyMispallel) this.affiliations.push('Weekly Mispallel')
    if(this.person && this.person.isOtherAffiliation) this.affiliations.push('Other')
  },
  methods: {
    async next(){
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      this.form.yearBorn = this.currentYear - this.age
      const data = {
        gender: this.form.gender,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        streetAddress: this.form.streetAddress,
        excludes: [1,2]
      }
      const res = await this.$store.dispatch('requestModule/identifyPerson', data)
      if(res.code === 4){
        
        await this.$store.dispatch('personModule/editPerson', { ...this.form })
        this.$store.dispatch('requestModule/setGroupOwner', { ...res.data })
        this.$emit('next')
      }else if(res.code === 5){
        this.personData = res.data.firstName + ' ' + res.data.lastName + ', ' + res.data.streetAddress
        this.dialog = true
      }else if(res.code === 6){
        const createdPerson = await this.$store.dispatch('personModule/createPerson', { ...this.form })
        this.$store.dispatch('requestModule/setGroupOwner', createdPerson.data)
        this.$emit('next')
      }
    },
    async confirmDialog(val){
      this.dialog = false
      let res
      if(val === "yes") res = await this.$store.dispatch('personModule/editPerson', { ...this.form })
      else{
        res = await this.$store.dispatch('personModule/createPerson', { ...this.form })
        if(res.success === false) res = await this.$store.dispatch('personModule/editPerson', { ...this.form })
      }
      this.$store.dispatch('requestModule/setGroupOwner', res.data)
      this.$emit('next')
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
        if($this.form && $this.form.isFaculty)$this.affiliations.push('Faculty')
        if($this.form && $this.form.isCurrentStudent)$this.affiliations.push('Current student')
        if($this.form && $this.form.isYomimNoraimMispallel)$this.affiliations.push('Yomim Noraim Mispallel')
        if($this.form && $this.form.isWeeklyMispallel)$this.affiliations.push('Weekly Mispallel')
        if($this.form && $this.form.isOtherAffiliation)$this.affiliations.push('Other')
      }
    },
  }
}
</script>
