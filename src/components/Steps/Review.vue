<template>
    <v-row>
        <v-col
            cols="12"
            md="12"
            lg="12"
            class="mx-auto"
        >
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <h4 class="text-primary">Contact Information</h4>
                    <p><span>Name: </span> {{groupRequest.owner.firstName}} {{groupRequest.owner.lastName}}</p>
                    <p><span>Address: </span> {{groupRequest.owner.streetAddress}} {{groupRequest.owner.streetAddressLine2}}</p>
                    <p><span>Home Phone: </span> {{groupRequest.owner.homePhone}}</p>
                    <p><span>Mobile Phone: </span> {{groupRequest.owner.mobilePhone}}</p>
                    <p><span>Email Address: </span> {{groupRequest.owner.emailAddress}}</p>
                </v-col>
            </v-row>
            <v-row
                v-for="(item, index) in items"
                :key="index">
                    <v-col
                        
                        cols="12"
                        md="2"
                    >
                        <p> {{item.seat}} </p>
                    </v-col>
                    <v-col
                        
                        cols="12"
                        md="2"
                    >
                        <p> {{item.men}} </p>
                    </v-col>
                    <v-col
                        
                        cols="12"
                        md="2"
                    >
                        <p> {{item.women}} </p>
                    </v-col>
            </v-row>

            <v-btn
                color="primary"
                @click="submit()"
                >
                Submit
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="before()"
                >
                before
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="close()"
                >
                Cancel
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Review',
    computed: {
        ...mapGetters({
            groupRequest: 'requestModule/groupRequest',
            isEditRequest: 'requestModule/isEditRequest',
        }),
        items() {
            console.log(this.groupRequest.menRequests)
            let arr = [
                {
                    seat: '',
                    men: "Men's Seat",
                    women: "Women's Seat"
                },
                {
                    seat: 'Rosh Hashanah I',
                    men: 0,
                    women: 0,
                },
                {
                    seat: 'Rosh Hashanah II',
                    men: 0,
                    women: 0
                },
                {
                    seat: 'Yom Kippur',
                    men: 0,
                    women: 0,
                }
            ]
            if(this.groupRequest.menRequests.length > 0){
                
                this.groupRequest.menRequests.map(function(item) {
                    console.log('item')
                    if(item.rh1) arr[1].men += 1
                    if(item.rh2) arr[2].men += 1
                    if(item.yk) arr[3].men += 1
                })
            }
            if(this.groupRequest.womenRequests.length > 0){
                this.groupRequest.womenRequests.map(function(item) {
                    if(item.rh1) arr[1].women ++
                    if(item.rh2) arr[2].women ++
                    if(item.yk) arr[3].women ++
                })
            }
            return arr
        }
    },

    methods: {
        async submit() {
            if(this.isEditRequest) await this.$store.dispatch('requestModule/editGroupRequest')
            else await this.$store.dispatch('requestModule/createGroupRequest')
            this.$router.push({
                name: 'RequestListPage'
            })
        },
        async before() {
        // this.$store.dispatch('personModule/identifyPerson', { ...this.form })
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