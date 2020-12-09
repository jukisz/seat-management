import { required, email } from 'vuelidate/lib/validators'
export default {
    computed: {
        currentYear () {
            const d = new Date()
            return d.getFullYear()
          },
          genderErrors () {
            const errors = []
            if (!this.$v.form.gender.$dirty) return errors
            !this.$v.form.gender.required && errors.push('Gender is required')
            return errors
          },
          titleErrors () {
            const errors = []
            if (!this.$v.form.title.$dirty) return errors
            !this.$v.form.title.required && errors.push('Title is required')
            return errors
          },
          firstNameErrors () {
            const errors = []
            if (!this.$v.form.firstName.$dirty) return errors
            !this.$v.form.firstName.required && errors.push('First Name is required')
            return errors
          },
          lastNameErrors () {
            const errors = []
            if (!this.$v.form.lastName.$dirty) return errors
            !this.$v.form.lastName.required && errors.push('Last Name is required')
            return errors
          },
          streetAddressErrors () {
            const errors = []
            if (!this.$v.form.streetAddress.$dirty) return errors
            !this.$v.form.streetAddress.required && errors.push('Street address line 1 is required')
            return errors
          },
          cityErrors () {
            const errors = []
            if (!this.$v.form.city.$dirty) return errors
            !this.$v.form.city.required && errors.push('City is required')
            return errors
          },
          stateErrors () {
            const errors = []
            if (!this.$v.form.state.$dirty) return errors
            !this.$v.form.state.required && errors.push('State is required')
            return errors
          },
          zipCodeErrors () {
            const errors = []
            if (!this.$v.form.zipCode.$dirty) return errors
            !this.$v.form.zipCode.required && errors.push('Zip code is required')
            return errors
          },
          homePhoneErrors () {
            const errors = []
            if (!this.$v.form.homePhone.$dirty) return errors
            !this.$v.form.homePhone.required && errors.push('Home phone is required')
            return errors
          },
          mobilePhoneErrors () {
            const errors = []
            if (!this.$v.form.mobilePhone.$dirty) return errors
            !this.$v.form.mobilePhone.required && errors.push('Mobile phone is required')
            return errors
          },
          emailAddressErrors () {
            const errors = []
            if (!this.$v.form.emailAddress.$dirty) return errors
            !this.$v.form.emailAddress.required && errors.push('EmailAddress is required')
            !this.$v.form.emailAddress.email && errors.push('Must be valid e-mail')
            return errors
          },
          affiliationErrors () {
            const errors = []
            if (!this.$v.affiliation.$dirty) return errors
            !this.$v.affiliation.required && errors.push('Affiliation is required')
            return errors
          },
          studentStatusErrors () {
            const errors = []
            if (!this.$v.form.studentStatus.$dirty) return errors
            !this.$v.form.studentStatus.required && errors.push('StudentStatus is required')
            return errors
          },
          ageErrors () {
            const errors = []
            if (!this.$v.age.$dirty) return errors
            !this.$v.age.required && errors.push('Age is required')
            return errors
          },
          classOfErrors () {
            const errors = []
            if (!this.$v.form.classOf.$dirty) return errors
            !this.$v.form.classOf.required && errors.push('ClassOf is required')
            return errors
          },
          isCurrentStudent () {
            if(this.affiliations === [])return false
            return this.affiliations.find( affication => affication === 'Current student')
          },
          isGrade () {
            if(this.form.studentStatus === 'Yeshiva Ketanah' || this.form.studentStatus === 'Mesivta')return true
            return false
          },
          isShiur () {
            if(this.form.studentStatus === 'Beis Medrash')return true
            return false
          },
    },
    watch: {
        affiliations () {
          this.form.isSarElef = this.affiliations.find( affication => affication === 'Sar Elef') ? true : false
          this.form.isAlumnus = this.affiliations.find( affication => affication === 'Alumnus') ? true : false
          this.form.isKollel = this.affiliations.find( affication => affication === 'Kollel') ? true : false
          this.form.isCurrentStudent = this.affiliations.find( affication => affication === 'Current student') ? true : false
          this.form.isFaculty = this.affiliations.find( affication => affication === 'Faculty') ? true : false
          this.form.isYomimNoraimMispallel = this.affiliations.find( affication => affication === 'Yomim Noraim Mispallel') ? true : false
          this.form.isWeeklyMispallel = this.affiliations.find( affication => affication === 'Weekly Mispallel') ? true : false
          this.form.isOtherAffiliation = this.affiliations.find( affication => affication === 'Other') ? true : false
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
};
