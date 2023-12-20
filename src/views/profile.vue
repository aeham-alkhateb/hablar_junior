<template>
  <v-app>
    <SideBar />
    <v-app-bar app>
      <appbar />
    </v-app-bar>
    <!-- <SideBarRight /> -->
    <v-main>
      <v-container
        ><v-card
          class="mx-auto main"
          :img="require(`@/assets/img/bgHero.jpg`)"
        >
       
          <v-row>
            <v-list-item class="px-5">
              <v-avatar size="120">
                <v-img :src="require(`@/assets/profile/${user.user_photo}`)"></v-img>
                 
              </v-avatar>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item class="text-h3" style="color: aliceblue">
                  {{ user.full_name }}
                 
                </v-list-item>
                <p class="sub" style="color: white">{{ user.email }}</p>
                <p class="sub" style="color: white">{{ user.birth_date }}</p>
                <p class="sub">
                  <v-icon v-if="user.gender == 'm'" style="color: white"
                    >mdi-face-man</v-icon
                  ><v-icon style="color: white" v-else>mdi-face-woman</v-icon>
                </p>
              </v-list-item-content>
              <v-col>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-col>
                      <v-btn color="edit" large icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-col>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h4 edit--text">Edit Your information </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-text-field
                            :rules="fnameRules"
                            label="First name"
                            color="edit"
                          ></v-text-field>

                          <v-text-field
                            :rules="lnameRules"
                            label="Last name"
                            color="edit"
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                            :rules="emailRules"
                            label="email"
                            color="edit"
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-select
                            v-model="select"
                            :items="gender"
                            color="edit"
                            label="Your gender"
                            required
                          ></v-select>
                        </v-row>
                        <v-row>
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
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="edit" text> Cancel </v-btn>
                      <v-btn color="edit" text> Save </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-list-item>
          </v-row>
        </v-card> </v-container
      ><v-container>
        <v-row class="mt-n6" style="">
         
         
          <v-col>
            <v-card max-width="500" class="mx-auto">
              <v-toolbar color="pistachioColor" dark>
                <v-toolbar-title>Language</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list-item-group >
                <v-list-item
                  v-for="item in language"
                  :key="item.id"
                  
                >
                  <v-list-item-icon>
                    <v-icon v-if="item.id in userlang" color="pistachioColor">
                      mdi-flag
                    </v-icon>
                    <v-icon v-else disabled> mdi-flag </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.language_name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-card>
          </v-col>
        <v-col>
            <v-card width="500" class="mx-auto">
              <v-toolbar color="edit" dark>
                <v-toolbar-title>Achivment</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list>
                <v-list-item v-for="item in achivment" :key="item.id">
                  <v-list-item-icon>
                    <v-icon  color="edit"> mdi-crown </v-icon>
                    
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col></v-row>
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
  props:['user'],
  created(){{ axios.get(`/api/achievements`,{
                    headers: {
                        "ngrok-skip-browser-warning": true
                }
                }).then((response)=>{

                   this.achivment=response.data
                }).catch((error)=>console.log(error))
            }
            
            axios.get(`/api/languages`,{
                    headers: {
                        "ngrok-skip-browser-warning": true
                }
                }).then((response)=>{

                   this.language=response.data
                }).catch((error)=>console.log(error))

                 axios.get(`/api/user/languages/get`,{
                    headers: {
                        "ngrok-skip-browser-warning": true
                }
                }).then((response)=>{

                   this.userlang=response.data
                }).catch((error)=>console.log(error))
            }
            
            

 ,
  data: () => ({
    userlang:null,
    userach:[],
    achivment: [    ],
    language: [    ],
    fnameRules: [
      v => !!v || 'First Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    lnameRules: [
      v => !!v || 'Last Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    value: 45,
    gender: ['female', 'male'],

    activePicker: null,
    date: null,
    menu: false
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    }
  },

  computed: {
    selectlang(item) {
      for (i in this.language) {
        if (i == item) {
          this.language[i].active = true
        } else {
          this.language[i].active = false
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
<style>
.space {
  margin-left: -100px;
  margin-right: -100px;
}
.main.v-card {
  margin-bottom: 40px;
  background-image: '@/assets/img/bgHero.jpg';
}
h3 {
  margin-top: 30px;
}
.p {
  color: rgb(253, 240, 255);
  margin-left: 30px;
  margin-bottom: 40px;
}
</style>

