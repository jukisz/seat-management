<template>
  <v-row>
    <v-col cols="12"
      md="9"
      lg="6"
      class="mx-auto">
      <v-form v-model="valid">
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
              :items="titles"
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
          @click="submit()"
        >
          Submit
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
import formValidationMixin from '@/mixins/formValidationMixin'

import { mask } from 'vue-the-mask'
import { mapGetters } from 'vuex'
export default {
  name: 'NewPersonPage',
  props: {
    person: {
      type: Object
    }
  },
  directives: { mask },
  mixins: [
    validationMixin, 
    formValidationMixin
  ],
  data: () => ({
    valid: false,
    form: {
      personId: 0,
      gender: '',
      title: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      streetAddressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      homePhone: '',
      mobilePhone: '',
      preferredPhone: '',
      emailAddress: '',
      studentStatus: 'None',
      grade: '',
      shiur: '',
      personNote: '',
      yearBorn: '',
      classOf: '',
      isRequestOwner: false,
      isSarElef: true,
      isAlumnus: true,
      isKollel: false,
      isCurrentStudent: false,
      isFaculty: false,
      isYomimNoraimMispallel: false,
      isWeeklyMispallel: false,
      isOtherAffiliation: false
    },
    age: null,
    affiliations: [],
    maskZipCode: '#####',
    maskPhone: '(###) ####-####'
  }),
  computed: {
    ...mapGetters({
      gender: 'personModule/gender',
      title: 'personModule/title',
      usStates: 'personModule/usStates',
      preferredPhone: 'personModule/preferredPhone',
      affiliation: 'personModule/affiliation',
      studentStatus: 'personModule/studentStatus',
      grade: 'personModule/grade',
      // person: 'personModule/person',
    }),
    titles (){
      console.log(this.form.gender)
      if(this.form.gender === 'Male')return this.title.Male
      return this.title.Female
    }
  },
  created () {
    this.form = {
      ...this.form,
      ...this.person
    }
    if(this.form.yearBorn)this.age = this.currentYear - this.form.yearBorn
    if(this.person && this.person.isSarElef)this.affiliations.push('Sar Elef')
    if(this.person && this.person.isAlumnus)this.affiliations.push('Alumnus')
    if(this.person && this.person.isKollel)this.affiliations.push('Kollel')
    if(this.person && this.person.isFaculty)this.affiliations.push('Faculty')
    if(this.person && this.person.isCurrentStudent)this.affiliations.push('Current student')
    if(this.person && this.person.isYomimNoraimMispallel)this.affiliations.push('Yomim Noraim Mispallel')
    if(this.person && this.person.isWeeklyMispallel)this.affiliations.push('Weekly Mispallel')
    if(this.person && this.person.isOtherAffiliation)this.affiliations.push('Other')
  },
  methods: {
    async submit(){
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      this.form.yearBorn = this.currentYear - this.age
      if(this.$route.name === 'EditPersonPage'){
        await this.$store.dispatch('personModule/editPerson', { ...this.form })        
      }else{
        await this.$store.dispatch('personModule/createPerson', { ...this.form })  
      }
      this.$router.push({
        name: 'PersonListPage'
      })
    },
    close () {
      this.$router.push({
        name: 'PersonListPage'
      })
    }
  }
}
</script>
