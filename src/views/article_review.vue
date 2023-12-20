<template>
  <v-app>

    <SideBar />
    <v-app-bar app>
      <appbar />
    </v-app-bar>
    <!-- <SideBarRight /> -->
    <v-main >
      <v-container id="page">
        <v-row justify="center">
          <h1 class="text-center edit--text">
           Unit Article
          </h1>
          
        </v-row>
      
        <v-row justify="center">
          <h3 class="text-center pistachioColor--text">
           Evaluate This Article
          </h3>
          
        </v-row>
        
        </v-container>
        <v-divider></v-divider>
        <v-container id="page">
          
        <v-progress-circular
              indeterminate
              :size="50"
              :width="7"
              color="primary"
              v-if="skeleton==true"
              centered
            ></v-progress-circular>
        <v-card
          filled
          name="input-7-4"
          label="your article"
          elevation="4"
          auto-grow 
          style="margin-top: 20px;margin-bottom: 20px"
        
        >{{get()}}</v-card>


            <div class="overflow-hidden">
      <div class="text-center mb-8">
        <v-btn
          color="theme"
          outlined
          @click="active = !active"
        >your rate
        
        </v-btn>
      </div>

      <v-bottom-navigation
        v-model="value"
        :input-value="active"
        color="green"
      >
       <v-btn :value="100"
       >
        <span>Awesome</span>

        <v-icon>mdi-emoticon-cool</v-icon>
      </v-btn>


      <v-btn :value="85">
        <span>Very good</span>

        <v-icon >mdi-emoticon-excited</v-icon>
      </v-btn >
          <v-btn :value="75">
        <span>good</span>

        <v-icon>mdi-emoticon-happy</v-icon>
      </v-btn>
  <v-btn :value="65">
        <span>not bad</span>

        <v-icon>mdi-emoticon-neutral</v-icon>
      </v-btn>
      

      <v-btn :value="40">
        <span>do better</span>

        <v-icon>mdi-emoticon-dead</v-icon>
      </v-btn>
 <v-btn @click="save()" text color="edit"><strong >Submit</strong></v-btn>
      </v-bottom-navigation>
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
      Evaluation <strong>Completed</strong> Successfully.
    </v-snackbar>
    </div>
    
      </v-container>
     

    </v-main>
  </v-app>
</template>

<script>
import SideBar from '../components/teacherSideBar'
import appbar from '../components/app_bar'
import axios from 'axios'
export default {
  
  data() {
    return {
      done:false,
      unit_id: this.$route.params.unit_id,
      user_id: this.$route.params.user_id,
      new_article:[],
      skeleton:true,
        rate:null,
        value: '',
        active: false,
        article:""
  }},
    created () {
      
    {
      axios
        .get(`/api/units/paragraph/unevaluated`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.new_article = response.data
          this.skeleton= false;
        })
        .catch(error => console.log(error))
    }
      
    },
    
  methods:{
     save() {
          axios.patch(`/api/units/paragraph/evaluate?user_id=${this.user_id}&unit_id=${this.unit_id}&evaluation=${this.value}`, {
          }).then((res) => {
            console.log(res)
            
          this.done=true
          })
    },
    get(){
      for (var i = 0; i < this.new_article.length; i++){
      
        if (this.new_article[i].user_id == this.user_id &&this.new_article[i].unit_id == this.unit_id){
         return this.new_article[i].paragraph
        }
      }
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
.v-progress-circular {
  margin: 1rem;
}
</style>
