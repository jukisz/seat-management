<template>
  <v-card outlined class="pa-10 mb-5">
    <v-row>
      <v-col cols="12" md="6">
        <h2>Seat {{ counter }}</h2>
      </v-col>
    </v-row>
    <v-row v-if="!editable">
      <v-col cols="12" md="12">
        <p>
          {{ form.firstName }} {{ form.lastName }}, {{ form.streetAddress }}
        </p>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="editable = true"> Edit </v-btn>
        <v-btn color="primary" text @click="remove()"> Delete </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="12" lg="12" class="mx-auto">
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                :items="gender"
                label="Gender"
                v-model="form.gender"
                dense
                :disabled="true"
                :error-messages="genderErrors"
                @change="$v.form.gender.$touch()"
                @blur="$v.form.gender.$touch()"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
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
            <v-col cols="12" md="3">
              <v-select
                :items="relationShip"
                label="Relationship To Owner"
                v-model="additionalData.relationshipToOwner"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-if="additionalData.relationshipToOwner === 'Other'"
                label="Please explain"
                v-model="additionalData.otherRelationshipToOwner"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Name -->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.firstName"
                label="First Name"
                dense
                :error-messages="firstNameErrors"
                @input="$v.form.firstName.$touch()"
                @blur="$v.form.firstName.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.lastName"
                label="Last Name"
                dense
                :disabled="true"
                :error-messages="lastNameErrors"
                @input="$v.form.lastName.$touch()"
                @blur="$v.form.lastName.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!isEditRequest">
            <v-col cols="12" md="12">
              <v-checkbox
                v-model="isDifferentFromGroupAddress"
                label="Check if this person’s address differs from the group’s contact information."
              ></v-checkbox>
            </v-col>
          </v-row>
          <!-- Street Address -->
          <v-row v-if="isDifferentFromGroupAddress">
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

          <!-- City, State -->
          <v-row v-if="isDifferentFromGroupAddress">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.city"
                label="City"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
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
            <v-col cols="12" md="3">
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
          <!-- Phone number -->
          <v-row>
            <v-col cols="12" md="4">
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
            <v-col cols="12" md="4">
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
            <v-col cols="12" md="4">
              <v-select
                v-model="form.preferredPhone"
                :items="preferredPhone"
                label="Preferred Phone"
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.emailAddress"
                label="Email address"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
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
            <v-col cols="12" md="6">
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
            <v-col v-if="studentStatus" cols="12" md="6">
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
            <v-col cols="12" md="6">
              <v-text-field
                v-model="age"
                label="Age"
                dense
                :error-messages="ageErrors"
                @input="$v.age.$touch()"
                @blur="$v.age.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
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
            <v-col cols="12" md="6">
              <v-checkbox
                v-model="form.isRequestOwner"
                label="Request Owner"
                dense
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="9">
              <v-textarea
                v-model="form.personNote"
                label="Note"
                dense
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="requestings"
                :items="requesting"
                item-text="text"
                item-value="value"
                label="Requesting"
                multiple
                dense
                chips
                clearable
              >
                <template v-slot:prepend-item>
                  <v-list-item ripple dense @click="toggle">
                    <v-list-item-action>
                      <v-icon>
                        {{ icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title> All </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="9">
              <v-checkbox
                v-if="additionalData.rh1"
                v-model="additionalData.unoccupiedRh1Night"
                label="Check if seat will be unoccupied on Rosh Hashanah I night."
              ></v-checkbox>
              <v-checkbox
                v-if="additionalData.rh2"
                v-model="additionalData.unoccupiedRh2Night"
                label="Check if seat will be unoccupied on Rosh Hashanah I night."
              ></v-checkbox>
              <v-checkbox
                v-if="additionalData.yk"
                v-model="additionalData.unoccupiedYkNight"
                label="Check if seat will be unoccupied on Rosh Hashanah I night."
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit()"> Save </v-btn>
            <v-btn color="primary" text @click="cancelEdit()"> Cancel </v-btn>
          </v-row>
        </v-form>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline"> Please confirm </v-card-title>
            <v-card-text>
              We found a person in our database whose information matches some
              of the details you provided. Is this him / her? <br />
              {{ personData }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="confirmDialog('yes')">
                Yes
              </v-btn>
              <v-btn color="primary" text @click="confirmDialog('no')">
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import formValidationMixin from "@/mixins/formValidationMixin";
import { mask } from "vue-the-mask";
import { mapGetters } from "vuex";

export default {
  name: "SeatCard",
  props: {
    counter: {
      type: Number,
    },
    genderProp: {
      type: String,
    },
  },
  directives: { mask },
  mixins: [validationMixin, formValidationMixin],
  data: () => ({
    valid: false,
    form: {},
    requestings: [],
    editable: true,
    age: null,
    affiliations: [],
    isDifferentFromGroupAddress: false,
    additionalData: {
      individualRequestId: 0,
      groupRequestId: 0,
      gender: null,
      relationshipToOwner: null,
      otherRelationshipToOwner: "",
      rh1: false,
      unoccupiedRh1Night: false,
      rh2: false,
      unoccupiedRh2Night: false,
      yk: false,
      unoccupiedYkNight: false,
    },
    dialog: false,
    personData: null,
    maskZipCode: "#####",
    maskPhone: "(###) ####-####",
  }),
  computed: {
    ...mapGetters({
      gender: "personModule/gender",
      title: "personModule/title",
      person: "requestModule/person",
      usStates: "personModule/usStates",
      preferredPhone: "personModule/preferredPhone",
      affiliation: "personModule/affiliation",
      studentStatus: "personModule/studentStatus",
      grade: "personModule/grade",
      menRelationShip: "requestModule/menRelationShip",
      womenRelationShip: "requestModule/womenRelationShip",
      requesting: "requestModule/requesting",
      groupRequest: 'requestModule/groupRequest',
      isEditRequest: 'requestModule/isEditRequest',
    }),
    icon() {
      if (this.requestings.length === this.requesting.length)
        return "fa close-box";
      else if (this.requestings.length > 0) return "fa minus-box";
      return "fa checkbox-blank-outline";
    },
    relationShip (){
      if(this.form.gender === 'Male') return this.menRelationShip
      return this.womenRelationShip
    },
  },
  watch: {
    requestings() {
      this.additionalData.rh1 = this.requestings.find(
        (request) => request === "Rosh Hashanah I"
      )
        ? true
        : false;
      this.additionalData.rh2 = this.requestings.find(
        (request) => request === "Rosh Hashanah II"
      )
        ? true
        : false;
      this.additionalData.yk = this.requestings.find(
        (request) => request === "Yom Kippur"
      )
        ? true
        : false;
    },
  },
  created() {
    if(this.isEditRequest){
      if(this.genderProp === 'Male') {
        this.form = {
          ...this.form,
          ...this.groupRequest.menRequests[this.counter - 1].person
        }
        this.additionalData = {
          ...this.additionalData,
          ...this.groupRequest.menRequests[this.counter - 1]
        }
      } else {
        this.form = {
          ...this.form,
          ...this.groupRequest.womenRequests[this.counter - 1].person
        }
        this.additionalData = {
          ...this.additionalData,
          ...this.groupRequest.womenRequests[this.counter - 1]
        }
      }
      delete this.additionalData.person
      this.isDifferentFromGroupAddress = true
      this.editable = false
      console.log(this.additionalData, 'edit form')
    } else {
      const owner = this.groupRequest.owner;
      if (owner.gender === this.genderProp && this.counter === 1) {
        this.form = {
          ...this.form,
          ...owner,
        };
        this.additionalData.relationshipToOwner = "Self";
      } else {
        this.form = {
          ...this.from,
          ...this.person,
        };
        this.form.gender = this.genderProp;
      }
      this.form.lastName = owner.lastName;
      if (this.isDifferentFromGroupAddress) {
        this.form.streetAddress = null;
        this.form.streetAddressLine2 = null;
        this.form.city = null;
        this.form.state = null;
        this.form.zipCode = null;
      } else {
        this.form.streetAddress = owner.streetAddress;
        this.form.streetAddressLine2 = owner.streetAddressLine2;
        this.form.city = owner.city;
        this.form.state = owner.state;
        this.form.zipCode = owner.zipCode;
      }
    }
    if (this.form.yearBorn) this.age = this.currentYear - this.form.yearBorn;
    if (this.form && this.form.isSarElef) this.affiliations.push("Sar Elef");
    if (this.form && this.form.isAlumnus) this.affiliations.push("Alumnus");
    if (this.form && this.form.isKollel) this.affiliations.push("Kollel");
    if (this.form && this.form.isFaculty) this.affiliations.push("Faculty");
    if (this.form && this.form.isCurrentStudent)
      this.affiliations.push("Current student");
    if (this.form && this.form.isYomimNoraimMispallel)
      this.affiliations.push("Yomim Noraim Mispallel");
    if (this.form && this.form.isWeeklyMispallel)
      this.affiliations.push("Weekly Mispallel");
    if (this.form && this.form.isOtherAffiliation)
      this.affiliations.push("Other");
  },
  methods: {
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.form.yearBorn = this.currentYear - this.age;
      const data = {
        gender: this.form.gender,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        streetAddress: this.form.streetAddress,
        excludes: [1, 2],
      };
      const res = await this.$store.dispatch(
        "requestModule/identifyPerson",
        data
      );
      if (res.code === 4) {
        await this.$store.dispatch("personModule/editPerson", { ...this.form });
        this.$store.dispatch("requestModule/addSeat", {
          person: { ...res.data },
          addData: { ...this.additionalData },
          counter: this.counter,
        });
        this.editable = false;
      } else if (res.code === 5) {
        this.personData =
          res.data.firstName +
          " " +
          res.data.lastName +
          ", " +
          res.data.streetAddress;
        this.dialog = true;
      } else if (res.code === 6) {
        const createdPerson = await this.$store.dispatch(
          "personModule/createPerson",
          { ...this.form }
        );
        this.$store.dispatch("requestModule/addSeat", {
          person: { ...createdPerson.data },
          addData: { ...this.additionalData },
          counter: this.counter,
        });
        this.editable = false;
      }
    },
    async confirmDialog(val) {
      this.dialog = false;
      let res;
      if (val === "yes")
        res = await this.$store.dispatch("personModule/editPerson", {
          ...this.form,
        });
      else {
        res = await this.$store.dispatch("personModule/createPerson", {
          ...this.form,
        });
        if (res.success === false)
          res = await this.$store.dispatch("personModule/editPerson", {
            ...this.form,
          });
      }
      this.$store.dispatch("requestModule/addSeat", {
        person: { ...res.data },
        addData: { ...this.additionalData },
        counter: this.counter,
      });
      this.editable = false;
    },
    remove() {},
    cancelEdit() {
      if (this.form.personId) this.editable = false;
    },
    toggle() {
      this.$nextTick(() => {
        if (this.requestings.length === this.requesting.length) {
          this.requestings = [];
        } else {
          this.requestings = this.requesting.slice();
        }
      });
    },
  },
};
</script>
