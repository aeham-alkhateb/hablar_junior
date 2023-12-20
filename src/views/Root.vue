<template>
<v-app>
    <v-app-bar app>
<appbar />
    </v-app-bar>
    

<v-main>
    
    <v-container>
      <v-data-table
    :headers="headers"
    :items="teachers"
    :loading="loadTable"
    loading-text="Loading... Please wait"
    class="elevation-14"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="edit--text">Teachers Table</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="edit"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Teacher
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5 edit--text">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newTeacher.first_name"
                      label="first name"
                      color="edit"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newTeacher.last_name"
                      label="last name"
                      color="edit"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   
                          <v-select
                            v-model="newTeacher.gender"
                            :items="gender"
                            item-value="value"
                            item-text="type"
                            color="edit"
                            label="Your gender"
                            required
                          ></v-select>
                  </v-col>
                     <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Birthday date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                color="edit"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              color="edit"
                              v-model="date"
                              :active-picker.sync="activePicker"
                              :max="
                                new Date(
                                  Date.now() -
                                    new Date().getTimezoneOffset() * 60000
                                )
                                  .toISOString()
                                  .substr(0, 10)
                              "
                              min="1950-01-01"
                              @change="savedate"
                            ></v-date-picker>
                          </v-menu>
                     </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newTeacher.email"
                      label="E-mail"
                      color="edit"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="newTeacher.password"
                      label="Password"
                      color="edit"

                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                 
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="edit"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="edit"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title >Are you sure you want to delete this Teacher?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="edit" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
         <v-dialog v-model="newTeacherDialog" max-width="500px">
          <v-card>
            <v-card-title >Are you sure you want to ADD this Teacher?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="close">Cancel</v-btn>
              <v-btn color="edit" text @click="save">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    
  </v-data-table>
    </v-container>
  </v-main>

</v-app>
</template>


<style scoped>

</style>



<script>
import SideBar from '../components/SideBar'
import appbar from '../components/app_bar'
import axios from 'axios'
export default {
data: () => ({
      dialog: false,
      dialogDelete: false,
      newTeacherDialog: false,
      loadTable: true,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'first_name' ,
        },
        { text: 'Last name', value: 'last_name' },
        { text: 'E-mail', value: 'email' },
  
        { text: 'Gender', value: 'gender' },
        { text: 'Birth Date', value: 'birth_date' },
        { text: 'role id', value: 'role_id' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      newTeacher:{
        first_name: '',
        last_name: '',
        birth_date: '',
        gender:'',
        email:'',
        password:'',
      
        },
        
        teachers:[],
      editedIndex: null,
      editedItem: {
        name: '',
        email: '',
        password: '',
        language: 'English',
       
      },
      
       gender: [
        {type:'male',
        value:'m'},
        {type:'female',
        value:'f'}
       ],

    activePicker: null,
    date: null,
    menu: false
    }),
    
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
     
    
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  
 

    created () {
       this.GetAllData()
    
      
    },

    methods: {
       GetAllData(){
        {
      axios
        .get(`/api/users`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.teachers = response.data
          this.loadTable= false;
        })
        .catch(error => console.log(error))
    }
       },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.teachers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
       axios
        .delete(
          `/api/userDelete/${this.editedIndex}`
        )
        .then(response => {
          console.log(response)
        })

        this.closeDelete()
        this.GetAllData()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
       axios.post('/api/registerTeacher', {
        first_name:this.newTeacher.first_name,
        last_name: this.newTeacher.last_name,
        birth_date: this.date,
        gender :this.newTeacher.gender,
        email:this.newTeacher.email,
        password:this.newTeacher.password,
        password_confirmation:this.newTeacher.password,
        
        
        } ,  {
          }).then((res) => {
            console.log(res)
          })
        this.close()
        this.GetAllData()
      },
      savedate(date) {
      this.newTeacher.birth_date=this.$refs.menu.save(date)
      
    }
    },
  
  
   components: {
      SideBar,
     appbar}

  
  }



   
</script>