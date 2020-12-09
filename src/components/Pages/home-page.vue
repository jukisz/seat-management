<template>
  <div>
    <section>
      <v-parallax src="assets/beisMedrash.jpg" height="600">
        <v-layout column
                  align-center
                  justify-center
                  class="white--text">
          <img src="assets/logo.png" alt="MYRCB" height="300">
          <h1 style="color:#542344; font-weight:bold;" class="mb-2 display-1 text-center">Mesivta Yeshiva Rabbeinu Chaim Berlin</h1>
          <div style="color:#542344; font-weight:bold;" class="subheading mb-4 text-center">Yomim Noraim Seating Manager Dashboard</div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout column
                wrap
                class="my-12"
                align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="headline">Automate and manage seating systems for your Kehillah.</h2>
            <p class="subheading" style="color:#525252; font-style:italic">
              This custom system is packed with features to help Yeshiva administrators streamline and automate the complex yearly task<br /> of processing and accomadating thousands of seating requests for the Yomim Noraim Tefillos.
            </p>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon style="color:#542344" x-large class="dark-puple">mdi-view-grid-plus-outline </v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Floor Plan Creator</div>
                  </v-card-title>
                  <v-card-text>
                    A graphic and interactive interface lets you create detailed floor plans. Mark off sections, tables, and seats, as well as the Bimah, Mechitzah, and Aron Kodesh.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large style="color:#542344">mdi-monitor-screenshot</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Requests Portal</div>
                  </v-card-title>
                  <v-card-text>
                    Your mispallelim can submit their seating requests directly on an easy, intuitive portal. Capture and organize all information for seat requests and preferences.
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large style="color:#542344">mdi-seat</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Seat Assignments</div>
                  </v-card-title>
                  <v-card-text>
                    View and manage all seating requests, track open and complete requests, process donations, assign seats efficiently, download floor plans and reports, and more!
                  </v-card-text>
                </v-card>
              </v-flex>

            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax src="assets/beis_medrash.jpg" height="380">
        <v-layout column align-center justify-center>
          <div class="mt-10 headline mb-4 text-center" style="color:#542344; font-weight:bold;">Choose a task below to get started.</div>

          <v-row>
            <v-col cols="4">
              <v-btn class="mt-12"
                     color="#542344"
                     dark
                     large
                     v-on:click="goToReports">
                Download Reports
              </v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn class="mt-12 ml-2"
                     color="#542344"
                     dark
                     large
                     v-on:click="goToRequests">
                Manage Requests
              </v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn class="mt-12"
                     color="#542344"
                     dark
                     large
                     v-on:click="goToFloorPlans">
                Design Floor Plans
              </v-btn>
            </v-col>
          </v-row>
        </v-layout>
      </v-parallax>
    </section>

    <section>
    </section>

    <v-footer color="#542344">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-4" style="font-size:10px">
            Developed by MKSystems 2020
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>



<script>
    export default {
      data: function () {
        return {
          title: "MYRCB Seating Portal"
        }
      },
    mounted: function () {
      },
      methods:{
        goToReports: function() {
          this.$router.push({ name: 'reports' });
        },
        goToRequests: function () {
                    this.$router.push({ name: 'all-requests' });


        },
        goToFloorPlans: function () {
                    this.$router.push({ name: 'floor-plan-list' });

        }


      }
    }
</script>

<style>
  .dark-puple {
    color: #542344;
  }
</style>
