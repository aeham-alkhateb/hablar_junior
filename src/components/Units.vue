<template>

  <v-container>
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
      operation <strong>Completed</strong> Successfully.
    </v-snackbar>
    <v-snackbar
      
      color="red"
      outlined
      absolute
      centered
      shaped
      bottom
      :value="notdone"
    >
       <strong>Error</strong> detected 
    </v-snackbar>
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
              @click="$router.push(`/teacher_course/${item.id}`)"
            >
              Let's Start
            </v-btn>

            <v-spacer></v-spacer>

            <v-spacer></v-spacer>
            <v-btn
              v-show="h"
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              :color="item.unit_status == 'Done' ? 'green' : 'red'"
              @click="shareitem(item.id)"
              dark
              fab
            >
              <v-icon>mdi-eye-check-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-show="h"
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              color="edit"
              dark
              @click="deleteItem(item.id)"
              fab
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-col>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title
            >Are you sure you want to delete this Unit?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="edit" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="edit" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="ShareUnit" max-width="500px">
        <v-card>
          <v-card-title
            >Are you sure you want to Share this Course?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="edit" text @click="ShareUnit = false">Cancel</v-btn>
            <v-btn color="edit" text @click="shareconfirm()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </v-row>
  </v-container>
</template>
<script>

import axios from 'axios'

export default {
  created() {
    this.GetAllData()
  },
mounted(){
    const thisInstance = this
    this.$root.$on('getUnits', function(){
      thisInstance.GetAllData()
    })
  },
  props: { h: Boolean },
  data() {
    return {
      skeleton:false,
      dialog: false,
      dialogDelete: false,
      ShareUnit: false,
      editedIndex: -1,
      units: [],
      ready: [],
      user:[],
      done:false,
      undone:false
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    GetAllData(){
 { axios.get(`/api/info`,{
                    headers: {
                        "ngrok-skip-browser-warning": true
                }
                }).then((response)=>{
                console.log(response)
                  this.user=response.data.user
                }).catch((error)=>console.log(error))
            }
   
    {
      axios
        .get(`/api/1/unitsAll`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.units = response.data
          this.skeleton= true
        })
        .catch(error => console.log(error))
    }
    },
    deleteItem(item) {
      this.editedIndex = item
      this.dialogDelete = true
    },
    shareitem(item) {
      this.editedIndex = item
      this.ShareUnit = true
    },
    shareconfirm(){
      axios.patch(`/api/toggle/${this.editedIndex}`)
        .then(response => {
          console.log(response)
          this.done=true
        }) 
        .catch(error => {console.log(error)
        this.undone=true
        })
        this.ShareUnit = false
        this.GetAllData()
        },
    deleteItemConfirm() {
      axios
        .delete(
          `/api/unitDelete/${this.editedIndex}`
        )
        .then(response => {
          console.log(response)
        this.done=true
        }) 
        .catch(error => {console.log(error)
        this.undone=true
        })
      this.closeDelete()
      this.GetAllData()
    },

    closeDelete() {
      this.dialogDelete = false
      this.dialogpost = false
      this.ShareUnit= false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  }
}
</script>

<style scoped>
.v-card-subtitle {
  margin-bottom: 10px;
}
</style>