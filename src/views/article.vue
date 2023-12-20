<template>
  <v-app>
    <SideBar />
    <v-app-bar app>
      <appbar />
    </v-app-bar>
    <!-- <SideBarRight /> -->
    <v-main >
      <v-container id="page">
        <v-snackbar
      :timeout="4000"
      color="success"
      outlined
      absolute
      centered
      shaped
      bottom
      :value="done"
    >
      We have <strong> Successfully</strong> received your article.
    </v-snackbar>
        <v-row justify="center">
          <h1 class="text-center edit--text">
           Unit Article
          </h1>
          
        </v-row>
      
        <v-row justify="center">
          <h3 class="text-center pistachioColor--text">
           Use what did you learn from this Unit to make an Article 
          </h3>
          
        </v-row>
        
        </v-container>
        <v-divider></v-divider>
        <v-container id="page">
        
         

     
       
        <v-textarea
          filled
          name="input-7-4"
          label="your article"
          color="pistachioColor"
          elevation="4"
          auto-grow 
          style="margin-top: 20px;margin-bottom: 20px"
          v-model="article"
        ></v-textarea>


            <div class="overflow-hidden">
      <div class="text-left mb-8">
        <v-btn
          color="edit"
          outlined
          @click="saveDialog=true"
        >send article
        </v-btn>
        
      </div><div class="text-right mb-8">
        <v-btn
          color="theme"
          outlined
          @click="active = !active"
        >your result
        </v-btn>
        
      </div>

      <v-bottom-navigation
        v-model="value"
        :input-value="active"
        color="secondary"
      >
       
          

          <v-icon  v-if=" rate!=null " >mdi-history</v-icon>
          
          <h2 justify="center" v-else >wait until we check it   </h2>

      </v-bottom-navigation>
    </div>
     <v-dialog v-model="saveDialog" max-width="500px">
          <v-card>
            <v-card-title 
              >are you done with your article?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="saveDialog=!saveDialog">No</v-btn>
              <v-btn color="edit" text @click="save">Yes</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    article:'',
    id: this.$route.params.unit_id,
    done:false,
    saveDialog:false,
    rate:null,
    value: 1,
    active: false,
  }},
  
  methods:{
     save() {
          axios.patch(`/api/units/paragraph/submit/${this.id}?content=${this.article}`, {
          }).then((res) => {
            console.log(res)
           this.done=true

          })
          this.saveDialog=false
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
p{font-size: 150%;}
#page{background-color: rgb(255, 253, 253);}
</style>
