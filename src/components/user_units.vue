<template>
  <v-container>
    <v-row justify="center" class="space">
   <v-col
   justify="center"
        cols="12"
        md="3"
    v-for="item in 8"
        :key="item.id"
        :hidden="skeleton">
       <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      type="card,actions"
      
       
    ></v-skeleton-loader></v-col></v-row>
    <v-row justify="center" class="space">
      <v-spacer></v-spacer>
      <v-col
        justify="center"
        cols="12"
        md="3"
        v-for="item in units"
        :key="item.id"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img
             :src="require('@/assets/use/' + item.id +'.svg')"
            height="200px"
            cover
          ></v-img>

          <v-card-title v-text="item.unit_name"> </v-card-title>


          <v-card-subtitle v-text="item.unit_level"> </v-card-subtitle>

          <v-card-actions>
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              color="theme"
              variant="text"
              @click="$router.push(`/course/${item.id}`)"
            >
              Let's Start
            </v-btn>

            <v-spacer></v-spacer>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
        <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>
<script>

import axios from 'axios'
export default {
  
  created() {
     { axios.get(`/api/info`,{
                    headers: {
                        "ngrok-skip-browser-warning": true
                }
                }).then((response)=>{
                console.log(response)
                  this.units=response.data.user.units
                  this.skeleton=true
                }).catch((error)=>console.log(error))
            }
   
  
  },

  props: { h: Boolean },
  data() {
    return {
      skeleton:false,
      units: []
    }
  },

  methods: {}
}
</script>

<style scoped>
.v-card-subtitle {
  margin-bottom: 10px;
}
</style>