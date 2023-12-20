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
          img="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-row>
            <v-list-item class="px-5">
              <v-avatar size="120">
                <v-img src="https://randomuser.me/api/portraits/men/85.jpg">
                  <v-dialog v-model="edit" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on"
                        ><v-icon color="theme" right>mdi-camera</v-icon></v-btn
                      >
                    </template>
                    <v-card class="mx-auto">
                      <v-row>
                        <v-btn
                          v-for="n in 8"
                          :key="n"
                          large
                          icon
                          width="200px"
                          height="200px"
                          style="margin-left: 30px"
                        >
                          <v-img
                            :src="`C:/Users/User/Desktop/junior/vuetify-landing-page-master/src/assets/profile/illustration-8.jpg`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-btn>
                      </v-row>
                    </v-card>
                  </v-dialog>
                </v-img>
              </v-avatar>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item class="text-h3" style="color: aliceblue">
                  {{ user.firstname }}
                  {{ user.lastname }}
                </v-list-item>
                <p class="sub" style="color: white">{{ user.email }}</p>
                <p class="sub" style="color: white">{{ user.bdate }}</p>
                <p class="sub">
                  <v-icon v-if="user.gendre == 'male'" style="color: white"
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
                      <span class="text-h4 edit--text"
                        >Edit Your information
                      </span>
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
      >
    </v-main>
  </v-app>
</template>

<script>
import SideBar from '../components/SideBar'
import appbar from '../components/app_bar'

export default {
  name: 'profile',
  data: () => ({
    user: {
      firstname: 'Aeham',
      lastname: 'Alkhateb',
      email: 'aehamalkhateb@gmail.com',
      bdate: '10/10/2010',
      gendre: 'male'
    },
    achivment: [
      { title: 'acasd', active: true },
      { title: 'acasdwww', active: false },
      { title: 'acasda', active: false }
    ],
    language: [
      { title: 'arabic', active: false },
      { title: 'english', active: true },
      { title: 'spain', active: false }
    ],
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
p {
  color: aliceblue;
  margin-left: 30px;
  margin-bottom: 40px;
}
</style>

