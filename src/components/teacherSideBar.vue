<template> 

      <v-navigation-drawer
        v-model="drawer"
        expand-on-hover
        permanent
        app
        color="white"
       
        mini-variant
        mini-variant-width="80"
      >
      <v-list>
          

          <v-list-item  >
            <v-list-item-content>
              <v-list-item-title class="text-h6" style="">
             {{ user.full_name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider class="mx-3 my-5"></v-divider>
         
       <v-list
          nav
          dense
        >
          <v-list-item link   @click="$router.push('/teacher')" >
            <v-list-item-icon  >
              <v-icon color="theme">mdi-book-open-page-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Learning</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/select_lang')">
            <v-list-item-icon>
              <v-icon color="theme">mdi-flag</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Change Language</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/teacher_review')">
            <v-list-item-icon>
              <v-icon color="theme">mdi-alpha-a-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Article Review</v-list-item-title>
          </v-list-item>
          
        </v-list>
       
      </v-navigation-drawer>

    
</template>

<script>import axios from 'axios'
  export default {
    
created(){
   { axios.get(`/api/info`,{
                    headers: {
                        "ngrok-skip-browser-warning": true
                }
                }).then((response)=>{
                console.log(response)
                  this.user=response.data.user
                  
     
                }).catch((error)=>console.log(error))
            }
 


},


    data(){ 
       return{
        user:[],
       
       }
       
     },
     
  }
</script>
<style>
.border  {
   margin-left: 12px;
   margin-right: 12px;
    background: #4AA9F5 ;
    border-radius: 50%;
    text-decoration: none;
    
}
</style>