<template> 

      <v-navigation-drawer
        v-model="drawer"
        expand-on-hover
        permanent
        app
        color="white"
       
        mini-variant
        mini-variant-width="100"
      >
      <v-list>
          <v-list-item class="px-10" >
            <v-list-item-avatar size="70px">
              <v-img :src="require(`@/assets/profile/${user.user_photo}`)" ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link @click="$router.push('/profile')" >
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
          <v-list-item link   @click="$router.push('/mainpage')" >
            <v-list-item-avatar  >
              <v-img src="@/assets/icon/undraw_handcrafts_menu.svg"  ></v-img>
            </v-list-item-avatar>
            <v-list-item-title>learning</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/select_lang')" style="mar">
            <v-list-item-avatar>
              <v-img src="@/assets/icon/undraw_handcrafts_location.svg" ></v-img>
            </v-list-item-avatar>
            <v-list-item-title>Change language</v-list-item-title>
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