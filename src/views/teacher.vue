<template>
  <v-app>
    <teacher-side-bar />
    <v-app-bar app>
      <appbar />
   <v-snackbar
      :timeout="4000"
      color="success"
      outlined
      absolute
      centered
      shaped
      left
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
      left
      :value="notdone"
    >
       <strong>Error</strong> detected 
    </v-snackbar>
    </v-app-bar>
    <v-main>
       <v-progress-linear
      color="lime"
      indeterminate
      reverse
      bottom
        height="10"

      :active="loading"
    ></v-progress-linear>
      <v-container>
        <Units :h="hidden" />
        
          <v-bottom-sheet v-model="dialog" max-width="500px">
            
            <template v-slot:activator="{ on, attrs }">
              <v-speed-dial v-model="fab">
          <template v-slot:activator><v-col>
            <v-btn v-model="fab" color="edit" dark fab large>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-pencil </v-icon>
            </v-btn>
            </v-col>
          </template>
              <v-col>
                <v-btn
                  color="theme"
                  fab
                  dark
                  
                  bottom
                  right
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  fab
                  dark
                  color="red"
                  @click="hidden = !hidden"
                  elevation="17"
                  
                  depressed
                  v-model="add"
                >
                  <v-icon
                    :class="[hidden ? 'mdi-delete-empty' : 'mdi-delete', 'mdi']"
                    
                    color="white"
                  ></v-icon>
                </v-btn>
              </v-col>
              
              </v-speed-dial>
            </template>
             
            <v-card>
              <v-card-title>
                <span class="text-h4 edit--text">New Unit</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="8" md="5">
                      <v-text-field
                        v-model="editedItem.unit_name"
                        label="Unit Title"
                        color="edit"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="16" sm="8" md="7">
                     <v-select
                        color="edit"
                        :items="levels"
                        
                       
                        v-model="editedItem.unit_level"
                        placeholder="Choose level"
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.unit_overview"
                      label="Unit Description"
                      color="edit"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-select
                        color="edit"
                        :items="language"
                        item-value="id"
                        item-text="language_name"
                        v-model="editedItem.language_id"
                        placeholder="Choose language"
                        dense
                        solo
                      ></v-select>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="edit" text @click="close"> Cancel </v-btn>
                <v-btn color="edit" text @click="saveconfirm()"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-bottom-sheet>
       

        <v-dialog v-model="saveDialog" max-width="500px">
          <v-card>
            <v-card-title 
              >Are you sure you want to Save this Unit?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="saveDialog=false">Cancel</v-btn>
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

import appbar from '../components/app_bar'
import Units from '../components/Units'
import axios from 'axios'
import TeacherSideBar from '../components/teacherSideBar.vue'
export default {
     
  
  data: () => ({
    loading:false,
      notdone:false,
      done:false,
    dialog: false,
    saveDialog: false,
    hidden: false,
    language:[],
    levels:['Beginner','Intermediate','Advanced'],
    Units: [],
    editedIndex: -1,
    editedItem: {
      unit_name: '',
      unit_overview: '',
      unit_level: '',
      language_id:null,
      unit_status:'Undone'
    },
    defaultItem: {
      title: '',
      description: '',
      img: ''
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize()

    { axios.get(`/api/languages/`,{
        headers: {
            "ngrok-skip-browser-warning": true
    }
    }).then((response)=>{

      this.language=response.data
    }).catch((error)=>console.log(error))
}
  },

  methods: {
    initialize() {
      this.Units = []
    },

    saveconfirm() {
     
      this.saveDialog = true
    },

   
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    

    save() {
      this.loading=true
          axios.post('/api/unitAdd', this.editedItem, {
          }).then((res) => {
            console.log(res)
            this.loading=false
            this.done=true
          })
          .catch((error)=>{
            console.log(error)
            this.undone=false
            
          })
          this.saveDialog=false
          this.$root.$emit('getUnits')
    }
  },
  name: 'overview',
  components: {
   
    appbar,
    Units,
    TeacherSideBar
  }
}
</script>
<style scoped>
.v-speed-dial {
  position: absolute;
}

.v-btn--floating {
  position: relative;
}
</style>