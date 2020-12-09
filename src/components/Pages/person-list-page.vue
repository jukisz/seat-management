<template>
  <div class="mr-2 mt-5">
    <v-data-table
      :headers="headers"
      :items="people"
      sort-by="name"
      class="elevation-1 mx-auto"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>All People</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
            <v-select
              v-model="fGenders"
              :items="gender"
              multiple
              chips
              label="Filter by Gender"
              @input="filterByGender"
            ></v-select>
          <v-spacer></v-spacer>
            <v-select
              v-model="fAffiliations"
              :items="affiliation"
              multiple
              chips
              label="Filter by Affiliations"
              @input="filterByAffiliation"
            ></v-select>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="btn mb-2"
            @click="showNewPerson"
          >
            New Person
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.fullname="{ item }">
        {{ item.title + ' ' + item.firstName + ' ' + item.lastName }}
      </template>
      <template v-slot:item.address="{ item }">
        {{ item.streetAddress + (
          item.streetAddressLine2 ? (', ' + item.streetAddressLine2) : ''
        ) }}
      </template>
      <template v-slot:item.affiliations="{ item }">
        <v-chip v-if="item.isSarElef">Sar Elef</v-chip>
        <v-chip v-if="item.isAlumnus">Alumnus</v-chip>
        <v-chip v-if="item.isKollel">Kollel</v-chip>
        <v-chip v-if="item.isCurrentStudent">Current Student</v-chip>
        <v-chip v-if="item.isFaculty">Faculty</v-chip>
        <v-chip v-if="item.isYomimNoraimMispallel">Yomim Noraim Mispallel</v-chip>
        <v-chip v-if="item.isWeeklyMispallel">Weekly Mispallel</v-chip>
        <v-chip v-if="item.isOtherAffiliation">Other</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          x-small
          class="mr-2"
          color="primary"
          @click="editItem(item)"
        >
          fa fa-edit
        </v-icon>
        <v-icon
          x-small
          color="primary"
          @click="deleteItem(item)"
        >
          fa fa-trash
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Full Name',
        value: 'fullname'
      },
      {
        text: 'Street Address',
        value: 'address'
      },
      {
        text: 'Home Phone',
        value: 'homePhone'
      },
      {
        text: 'Mobile Phone',
        value: 'mobilePhone'
      },
      {
        text: 'Email Address',
        value: 'email'
      },
      {
        text: 'Affiliations',
        value: 'affiliations'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ],
    fGenders: ['Male', 'Female'],
    fAffiliations: ['Sar Elef', 'Alumnus', 'Faculty', 'Kollel', 'Current student', 'Yomim Noraim Mispallel', 'Weekly Mispallel', 'Other'],
  }),
  computed: {
    ...mapGetters({
      gender: 'personModule/gender',
      people: 'personModule/people',
      affiliation: 'personModule/affiliation',
    })
  },
  created () {
    this.$store.dispatch('personModule/getAllPeople')
  },
  methods: {
    showNewPerson () {
      const params = {
        personId: 0,
        gender: null,
        title: null,
        firstName: null,
        lastName: null,
        streetAddress: null,
        streetAddressLine2: null,
        city: null,
        state: null,
        zipCode: null,
        homePhone: null,
        mobilePhone: null,
        preferredPhone: null,
        emailAddress: null,
        studentStatus: null,
        grade: null,
        shiur: null,
        note: null,
        yearBorn: null,
        classOf: null,
        isRequestOwner: false,
        isSarElef: false,
        isAlumnus: false,
        isKollel: false,
        isCurrentStudent: false,
        isFaculty: false,
        isYomimNoraimMispallel: false,
        isWeeklyMispallel: false,
        isOtherAffiliation: false
      }
      this.$router.push({
        name: 'NewPersonPage',
        params: {
          person: params
        }
      })
    },
    editItem (item) {
      this.$router.push({
        name: 'EditPersonPage',
        params: {
          person: {
            ...item
          }
        }
      })
    },
    async deleteItem (item){
      const { success, message, error } = await this.$store.dispatch('personModule/deletePerson', item.personId)
      if (success) {
        const snackData = {
          value: true,
          color: 'primary',
          text: message
        }
        await this.$store.dispatch('personModule/setSnackData', snackData)
      } else {
        const snackData = {
          value: true,
          color: 'red',
          text: error
        }
        await this.$store.dispatch('personModule/setSnackData', snackData)
      }
    },
    filterByGender () {
      this.$store.dispatch('personModule/filterByGender', this.gender)
    },
    filterByAffiliation () {
      console.log(this.fGenders)
    }
  }
}
</script>
