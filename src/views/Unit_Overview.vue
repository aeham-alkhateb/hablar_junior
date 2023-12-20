<template>
  <v-app>
    <SideBar />
    <v-app-bar app>
      <appbar />
    </v-app-bar>
    <!-- <SideBarRight /> -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <h1 class="text-center edit--text">
           Unit Overview
          </h1>
        </v-row>
        <v-divider></v-divider>
        </v-container>
        <v-container style="background-color:white">
            <v-row class="mt-n6"  justify="center">
          <h3 class="text-center primary--text">What you will learn:</h3>
        </v-row>
        <v-row class="mt-n6"  justify="center">
          <v-progress-circular
              indeterminate
              :size="50"
              :width="7"
              color="primary"
              v-if="skeleton==true"
            ></v-progress-circular>
          <p class=" d-inline-block  text-center" justify="center">{{unit_overview}}</p>
        </v-row>
        <v-row class="mt-n6"  justify="center">
          <h4 class="text-center edit--text">Good Luck...</h4>
        </v-row>
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
import SideBar from '../components/SideBar'
import appbar from '../components/app_bar'

import axios from 'axios'
export default {
  

  name: 'profile',
 data() {
    return {
    id: this.$route.params.unit_id,
    unit_overview: "",
    skeleton: true,
  
  }},
   created() {
    {
      axios
        .get(`/api/units/${this.id}`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.unit_overview = response.data.unit_overview
          this.skeleton = false
        })
        .catch(error => console.log(error))
    }
  },
  components: {
    SideBar,
    appbar,
    
  }
}
</script>
<style scoped>
h1 {
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 250%;
}
p{font-size: 150%;
color:black}
h4{ margin-top: 45px;
font-size: 150%;}
h3{margin-top: 15px;
margin-bottom: 25px;font-size: 150%;}
</style>
