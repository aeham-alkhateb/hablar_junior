<template>
<v-app>
   <SideBar />
   
    <v-app-bar app>
<appbar />
    </v-app-bar>
    

<v-main>
    
    <v-container>
     <h1 class="text-center edit--text">
            Users articles need to evaluate
          </h1>
  <v-data-table
    :headers="headers"
    :loading="loadTable"
    :items="new_article"
    loading-text="Loading... Please wait"
    @click:row="rowClick"
  
    class="elevation-20"
  ></v-data-table>

    </v-container>
  </v-main>

</v-app>
</template>


<style scoped>

</style>



<script>
import SideBar from '../components/teacherSideBar'
import appbar from '../components/app_bar'
import axios from 'axios'
import Article_review from './article_review.vue'

export default {
data(){return{
    loadTable: true,
    art_icle:"",
    new_article:[],
       headers: [
          {
            text: 'User',
            align: 'start',
            sortable: false,
            value: 'user_id',
          },
          { text: 'Unit', value: 'unit_id' },
          
          
        ],
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
          this.loadTable= false;
        })
        .catch(error => console.log(error))
    }
      
    },
    methods: {
       rowClick(item, row) {
        this.$router.push(`/article_review/${item.unit_id}/${item.user_id}`)
        
    },
    },
  
  
   components: {
      SideBar,
     appbar,
      Article_review,
      SideBar}

  
  }



   
</script>