<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="30" sm="8" md="8">
            <v-card class="elevation-17">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="
                            text-center
                            display-2
                            theme--text
                            text--accent-3
                          "
                        >
                          Log in
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="primary" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="primary" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4 black--text">
                          Welcome Back!
                        </h4>
                        <v-form ref="form" v-model="valid">
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="theme accent-3"
                            v-model="login.email"
                            :rules="emailRules"
                            required
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="primary accent-3"
                            v-model="login.password"
                            required
                          />
                        </v-form>
                        <router-link to=""
                          ><h3 class="text-center mt-4 primary--text">
                            Forgot your password ?
                          </h3></router-link
                        >
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          rounded
                          color="primary accent-3"
                          dark
                          @click="loginMethod()"
                          >Log In</v-btn
                        >
                      </div>
                      <br /><br />
                    </v-col>
                    <v-col cols="12" md="4" class="theme accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          you want to join us ?
                        </h1>
                        <h5 class="text-center">
                          Enter your personal details and start journay with us
                        </h5>
                        <br />
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="theme accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome!</h1>
                        <h5 class="text-center">
                          To Keep connected with us please login with your
                          personnel info
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Log in</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="
                            text-center
                            display-2
                            theme--text
                            text--accent-3
                          "
                        >
                          Create Account
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="primary" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="primary" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                        </div>
                        <v-form ref="form" v-model="valid">
                          <v-row>
                            <v-text-field
                              v-model="signup.first_name"
                              :rules="nameRules"
                              label="First Name"
                              name="Name"
                              prepend-icon="person"
                              type="text"
                              color="theme accent-3"
                              required
                            />
                            <v-text-field
                              v-model="signup.last_name"
                              :rules="nameRules"
                              label="Last Name"
                              name="Name"
                              prepend-icon="person"
                              type="text"
                              color="theme accent-3"
                              required
                            />
                          </v-row>
                          <v-row>
                            <v-text-field
                              v-model="signup.email"
                              :rules="emailRules"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="primary accent-3"
                              required
                            />
                          </v-row>
                          <v-row row="12" sm="6" md="4">
                            <v-select
                              v-model="signup.gender"
                              :items="gender"
                              prepend-icon="male"
                              item-value="value"
                              item-text="type"
                              color="edit"
                              label="Your gender"
                              required
                              :rules="genderRules"
                            ></v-select>

                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                              required
                              :rules="dateRules"
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
                                  required
                                  :rules="dateRules"
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
                          </v-row>
                          <v-row>
                            <v-text-field
                              v-model="signup.password"
                              :rules="passwordRules"
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="theme accent-3"
                              required
                            />
                            <v-text-field
                              v-model="signup.password_confirmation"
                              :rules="passwordConfirmRules"
                              label="Confirm Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="theme accent-3"
                              required
                            />
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <v-container class="text-center mt-n5">
                        <v-btn
                          rounded
                          color="primary accent-3"
                          dark
                          @click="signinMethod()"
                          >SIGN UP</v-btn
                        > </v-container
                      ><br />
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar
        v-model="wrongcr"
        :timeout="4001"
        :value="true"
        absolute
        color="red accent-2"
        shaped
        bottom
      >
        {{ wrgmsg }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      step: 1,
      wrgmsg: '',
      valid: true,
      wrongcr: false,
      login: {
        email: '',
        password: ''
      },
      signup: {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        birth_date: '',
        password: '',
        password_confirmation: ''
      },

      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v =>
          (v.length >= 2 && v.length <= 10) ||
          'Name must be less than 10 and more than 2 characters'
      ],
      email: '',

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password is required'],
      passwordConfirmRules: [
        value => !!value || 'type confirm password',
        value =>
          value === this.signup.password ||
          'The password confirmation does not match.'
      ],
      dateRules: [v => !!v || 'Birth date is required'],
      genderRules: [v => !!v || 'Gender is required'],

      gender: [
        { type: 'male', value: 'm' },
        { type: 'female', value: 'f' }
      ],

      activePicker: null,
      date: null,
      menu: false
    }
  },
  methods: {
    loginMethod() {
      this.$refs.form.validate()
      axios
        .post(
          '/api/login',
          this.login,
          {}
        )
        .then(res => {
          console.log(res)
          if (res.data.message == 'success') {
            if (res.data.user.role_id == 3) {
              this.$router.push('/mainpage')
              localStorage.setItem('token',res.data.token)



            } else if (res.data.user.role_id == 2) {
              localStorage.setItem('token',res.data.token)
              this.$router.push('/teacher')
              
            } else {
              this.$router.push('/Root')
            }
          } else {
            this.wrgmsg = 'Check the E-mail or password'
            this.wrongcr = true
          }
        })
    },
    signinMethod() {
      this.$refs.form.validate()
      axios
        .post(
          '/api/register',
          {
            first_name: this.signup.first_name,
            last_name: this.signup.last_name,
            birth_date: this.date,
            gender: this.signup.gender,
            email: this.signup.email,
            password: this.signup.password,
            password_confirmation: this.signup.password_confirmation
          }
        )
        .then(res => {
          console.log(res)
          if (res.data.message == 'success') {
            localStorage.setItem('token',res.data.token)
            window.location.href = "/select_lang"
          } 
        }).catch(error => {
          this.wrgmsg =  error.response.data.message
            this.wrongcr = true
    
  })
    },

    savedate(date) {
      this.signup.birth_date = this.$refs.menu.save(date)
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },

  props: {
    source: String
  }
}
</script>