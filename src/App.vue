<template >
<v-app class="pt-0">
 <router-view :user="user"/>
</v-app>
</template>


<script>
import axios from 'axios'
export default {
  name: "App",
  data () {
    return{
    fab: null,      
    color: "",
    flat: null,
    user:[]
    } },
  components: {
  },
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


}
</script>


<style scoped>
#app {
  background: url('~@/assets/img/bgMain.png') ;
  background-size: cover;
   background-attachment: fixed;
  background-position: center;
  background-color: #fff;
}
</style>

