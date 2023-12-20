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
            {{ title  }}
          </h1>
        </v-row>
        <v-divider></v-divider>
        </v-container>
        <v-container>
        <v-row class="mt-n6" style="" justify="center">
           <v-progress-circular
              indeterminate
              :size="50"
              :width="7"
              color="primary"
              v-if="skeleton==true"
            ></v-progress-circular>
          <h2 class=" d-inline-block  text-center" justify="center" >{{content}}</h2>
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
    lesson_id: this.$route.params.lesson_id,
    unit_id: this.$route.params.unit_id,
    lesson: [],
    skeleton: true,
    
      title:'',
      content:''
    
  }},
   created() {
    {
      axios
        .get(`/api/${this.unit_id}/lessons`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.lesson = response.data
          this.skeleton = false
            for (var i = 0; i < this.lesson.length; i++){
      
        if (this.lesson[i].id == this.lesson_id &&this.lesson[i].unit_id == this.unit_id){
         this.content= this.lesson[i].lesson_content
          this.title= this.lesson[i].lesson_title
        }
      }
        })
        .catch(error => console.log(error))
      
    }
    
  },
  methods:{
     get(){
      
    }

  },
  components: {
    SideBar,
    appbar
  }
}
</script>
<style scoped>
h1 {
  font-size: 250%;
  margin-top: 15px;
}
h2{font-size: 150%;
padding-top: 20px;
background-color: white;
}
</style>
