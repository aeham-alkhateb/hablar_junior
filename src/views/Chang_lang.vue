<template><v-main class="select">
  
        <v-row
            class="fill-height d-sm-flex"
            align="center"
          max-width="800"
            
          >
  <v-card
    class="mx-auto"
        width="500"
        max-width="600"
    :elevation="24"
  >
    <v-toolbar
      color="primary"
      dark
    >
     

      <v-toolbar-title>Select Language & Let's Begin </v-toolbar-title>

      <v-spacer></v-spacer>

    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
         
          dark
          v-bind="attrs"
          v-on="on"
          icon
         @click="addlang()"
        >
          
     
  
        <v-icon  class="fas fa-grin-stars"></v-icon>
      </v-btn>

      
       </template>
       <span>confirm</span>
    </v-tooltip>

    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="theme--text"
        
      >
        <template v-for="item in language">
          <v-list-item :value="item.id" :key="item.id">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.language_name" ></v-list-item-title>

               
              </v-list-item-content>

              <v-list-item-action>
                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                  class="far fa-flag"
                >
                  
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                  class="fas fa-flag"
                >
                 
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
  </v-row>
  
          </v-main>
</template>
<script>
import axios from 'axios'
export default {
 created(){
            axios.get(`/api/languages`,{
                    headers: {
                        "ngrok-skip-browser-warning": true
                }
                }).then((response)=>{

                   this.language=response.data
                }).catch((error)=>console.log(error))
            },
    methods:{
      addlang(){
       axios.post(
          `/api/user/languageAdd/${this.selected}`,
          {
            headers: {
              'Content-Type': `multipart/form-data`
            }
          }
        )
        .then(res => {
          console.log(res)
           this.$router.push('/mainpage')
        })
        .catch(error => {
          console.log(error)
        })
        }


    },
    data: () => ({
      selected:null,
      language: [
       
      ],
    }),
  }


</script>

<style>
.select{
   background-image:url('~@/assets/icon/undraw_choose_re_7d5a.svg');
   background-color:#f4fcff ;
}

</style>