<template>
  <v-app-bar
    absolute
    color="theme"
    dark
    scroll-target="#scrolling-techniques-2"
  >
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4"
      ><v-spacer></v-spacer>
      <v-app-bar-nav-icon style="padding-top:10px"><v-img src="@/assets/icon/Hablar_adaptive_fore.png" max-width="150px" /></v-app-bar-nav-icon>
    </v-toolbar
    >
    <v-spacer></v-spacer>
    
    <v-btn color="primary" rounded dark @click="logout = true"> Log Out </v-btn>
    <v-dialog v-model="logout" max-width="500px">
      <v-card>
         
        <v-card-title class="font-weight-bold te justify-center" style="">Are you Sure?</v-card-title>
        
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-btn color="primary"  class="font-weight-bold te" text @click="Logout()">Yes</v-btn>
           <v-avatar class="ma-4" size="150" tile>
                <v-img src="@/assets/use/undraw_login_re_4vu2.svg"></v-img>
              </v-avatar>
          
          <v-btn color="primary" class="font-weight-bold te" text @click="logout = false">No</v-btn>
          <v-spacer></v-spacer>
          
        </v-card-actions>
      
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>
<script>
 import axios from "axios";
export default {
  
   data(){return{
      logout: false,}
   },
  methods: {
    
    Logout() {
     
      axios.post(`/api/logout`, {}).catch(error => console.log(error))
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>

</style>