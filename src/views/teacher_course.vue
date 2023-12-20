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

      <courses :h="hidden" />
     
      <v-container>
        
        <v-row>
          <v-bottom-sheet v-model="dialog" max-width="500px">
            <template v-slot:activator="{ attrs }">
              <v-col>
                <v-btn
                  fab
                  dark
                  large
                  color="edit"
                  @click="hidden = !hidden"
                  elevation="17"
                  depressed
                  v-bind="attrs"
                >
                  <v-icon
                    :class="[hidden ? 'mdi-delete-empty' : 'mdi-delete', 'mdi']"
                    large
                    color="white"
                  ></v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-bottom-sheet>
         <v-bottom-sheet v-model="Hwords" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-col>
                  <v-btn
                    color="edit"
                    rounded
                    dark
                    large
                    bottom
                    left
                    class="mb-2"
                    v-bind="attrs"
                    v-on ="on"
                  >
                    Hard Words
                  </v-btn>
                </v-col>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h4 edit--text">Add Hard Words </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-combobox
                      v-model="words_list"
                      
                      chips
                      clearable
                      label="Enter The Video Hard Words"
                      multiple
                      solo
                    >
                      <template v-slot:selection="{ attrs, item , select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="remove(item)"
                        >
                          <strong>{{ item }}</strong>&nbsp;
                          
                        </v-chip>
                      </template>
                      </v-combobox>
                    </v-row>
                    <v-row>
                       <v-select
                       v-model="video_id"
                        :items="videos"
                       
                        item-value="id"
                        item-text="video_title"
                        label="Select video"
                      ></v-select>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="edit"  @click="Hwords = false" text> Cancel </v-btn>
                  <v-btn color="edit" text @click="Save_Words = true">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-bottom-sheet>








            <v-bottom-sheet v-model="deleteqs" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-col>
                  <v-btn
                    color="edit"
                    rounded
                    dark
                    large
                    bottom
                    left
                    class="mb-2"
                    v-bind="attrs"
                    v-on ="on"
                  >
                    delete question
                  </v-btn>
                </v-col>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h4 edit--text">Delete Quiz Question </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                   
                    <v-row>
                       <v-select
                       v-model="Question_id"
                        :items="allquest.questions"
                       
                        item-value="id"
                        item-text="question"
                        label="Select question to delete"
                      ></v-select>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="edit" @click="deleteqs = false" text> Cancel </v-btn>
                  <v-btn color="edit" text @click="deleteDialog = true">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-bottom-sheet>
        </v-row>

        <v-row>
          <v-col>
            <v-bottom-sheet v-model="Quiz" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="edit"
                  rounded
                  dark
                  large
                  bottom
                  left
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Quiz
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="500">
                <v-card-title
                  class="text-h6 font-weight-regular justify-space-between"
                >
                  <span class="text-h4 edit--text">Add Quiz</span>
                  <span class="theme--text">{{ currentTitle }}</span>
                </v-card-title>

                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-card class="mx-auto" max-width="500">
                      <v-list>
                        <v-list-item-group
                          v-model="addQuiz.type"
                          mandatory
                          color="theme"
                        >
                          <v-list-item
                            v-for="(item, i) in questiontype"
                            :key="i"
                          >
                            <v-list-item-icon>
                              <v-icon color="edit" v-text="item.icon"></v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title
                                v-text="item.text"
                              ></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-card>
                  </v-window-item>

                  <v-window-item :value="2">
                    <v-card-text>
                      <v-text-field
                        v-model="addQuiz.question"
                        color="edit"
                        label="the Question .."
                      ></v-text-field>
                      <v-file-input
                        accept="image/*"
                        label="image input"
                        color="edit"
                        v-if="addQuiz.type == 0"
                        value="i"
                        v-model="addQuiz.question_link"
                      ></v-file-input>
                      <v-file-input
                        accept="audio/*"
                        label="audio input"
                        color="edit"
                        v-if="addQuiz.type == 2"
                        v-model="addQuiz.question_link"
                      ></v-file-input>
                      <v-file-input
                        accept="video/*"
                        label="video input"
                        color="edit"
                        v-if="addQuiz.type == 1"
                        v-model="addQuiz.question_link"
                      ></v-file-input>
                      <span class="text-caption grey--text text--darken-1">
                        no need for Url if its text
                      </span>
                    </v-card-text>
                  </v-window-item>

                  <v-window-item :value="3">
                    <v-card-text>
                      <v-text-field
                        color="edit"
                        label="Correct answer .."
                        v-model="addQuiz.correct_answer"
                      ></v-text-field>
                      <v-text-field
                        color="edit"
                        label="Choice 1 .. "
                        v-model="addQuiz.choice1"
                      ></v-text-field>
                      <v-text-field
                        color="edit"
                        label="Choice 2 .. "
                        v-model="addQuiz.choice2"
                      ></v-text-field>
                    </v-card-text>
                  </v-window-item>
                </v-window>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn :disabled="step === 1" text @click="step--">
                    Back
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-show="!(step === 3)"
                    :disabled="step === 3"
                    color="edit"
                    depressed
                    @click="step++"
                  >
                    Next
                  </v-btn>
                  <v-btn
                    v-show="step === 3"
                    :disabled="!(step === 3)"
                    color="edit"
                    depressed
                    @click="SaveQuize = true"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-bottom-sheet>
          </v-col>

          <v-col>
            <v-bottom-sheet v-model="Vdeo" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="edit"
                  rounded
                  dark
                  large
                  bottom
                  left
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Video
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="500">
                <v-card-title
                  class="text-h6 font-weight-regular justify-space-between"
                >
                  <span class="text-h4 edit--text">Add Video</span>
                </v-card-title>

                <v-window v-model="step_v">
                  <v-window-item :value="1">
                    <v-card-text>
                      <v-text-field
                        v-model="addvideo.video_title"
                        color="edit"
                        label="Video Title .."
                      ></v-text-field>
                      <v-file-input
                        v-model="addvideo.video_link"
                        accept="video/*"
                        label="Video input"
                        color="edit"
                      ></v-file-input>
                    </v-card-text>
                  </v-window-item>

                  <v-window-item :value="2">
                    <v-card-text>
                      <v-text-field
                        color="edit"
                        label="Description .."
                        v-model="addvideo.video_description"
                      ></v-text-field>
                      <v-file-input
                        v-model="addvideo.video_subtitle"
                        label="Subtitle input"
                        color="edit"
                      ></v-file-input>
                    </v-card-text>
                  </v-window-item>
                </v-window>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn :disabled="step_v === 1" text @click="step_v--">
                    Back
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-show="!(step_v === 2)"
                    :disabled="step_v === 2"
                    color="edit"
                    depressed
                    @click="step_v++"
                  >
                    Next
                  </v-btn>
                  <v-btn
                    v-show="step_v === 2"
                    :disabled="!(step_v === 2)"
                    color="edit"
                    depressed
                    @click="SaveVideo = true"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-bottom-sheet>
          </v-col>

          <v-col>
            <v-bottom-sheet v-model="lesson" max-width="1000px">
              <template v-slot:activator="{ on, attrs }">
                <v-col>
                  <v-btn
                    color="edit"
                    rounded
                    dark
                    large
                    bottom
                    left
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Lesson
                  </v-btn>
                </v-col>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h4 edit--text">Lesson </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="addlesson.lesson_title"
                        label="lesson title"
                        color="edit"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="addlesson.lesson_content"
                        label="lesson content"
                        color="edit"
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="edit" @click="lesson=false" text> Cancel </v-btn>
                  <v-btn color="edit" text @click="SaveLesson = true">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-bottom-sheet>
          </v-col>
        </v-row>
        <v-dialog v-model="SaveQuize" max-width="500px">
          <v-card>
            <v-card-title>Are you sure you want to Save?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="SaveQuize=false">Cancel</v-btn>
              <v-btn color="edit" text @click="saveQuize()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="SaveVideo" max-width="500px">
          <v-card>
            <v-card-title>Are you sure you want to Save?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="SaveVideo=false">Cancel</v-btn>
              <v-btn color="edit" text @click="saveVideo()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="SaveLesson" max-width="500px">
          <v-card>
            <v-card-title>Are you sure you want to Save?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="SaveLesson=false">Cancel</v-btn>
              <v-btn color="edit" text @click="saveLesson()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="Save_Words" max-width="500px">
          <v-card>
            <v-card-title>Are you sure you want to Save?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="Save_Words=false">Cancel</v-btn>
              <v-btn color="edit" text @click="saveWords()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
         <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title>Are you sure you want to delete this question?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="deleteDialog=false">Cancel</v-btn>
              <v-btn color="edit" text @click="deleteQs()">yes</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
     
    </v-main>
     
  </v-app>
</template>
<script>
import TeacherSideBar from '../components/teacherSideBar.vue'
import appbar from '../components/app_bar'
import courses from '../components/Unit_courses'
import axios from 'axios'

export default {

  data() {
    return {
      lesson:false,
      dialog: false,
      loading:false,
      notdone:false,
      done:false,
      Hwords:false,
      deleteqs:false,
      step: 1,
      step_v: 1,
      deleteqs:false,
      dialogDelete: false,
      hidden: false,
      Save_Words:false,
      deleteDialog:false,
      SaveQuize: false,
      SaveVideo: false,
      SaveLesson: false,
      selecteditem: null,
      id: this.$route.params.unit_id,
      videos:[],
      allquest:[],
      Question_id:null,
      

      editedIndex: -1,

      addQuiz: {
        type: '',
        question: '',
        question_link: null,
        correct_answer: '',
        choice1: '',
        choice2: '',
        unit_id: this.id
      },

      addvideo: {
        video_title: '',
        video_link: '',
        video_description: '',
        video_subtitle: '',
        unit_id: this.id
      },

      addlesson: {
        lesson_title: '',
        lesson_content: '',
        unit_id: this.id
      },
      
        words_list: [],
        video_id: ''
      ,
      editedItem: {},

      questiontype: [
        { id: 0, vlaue: 'p', icon: 'mdi-camera', text: 'Photo' },
        { id: 1, vlaue: 'v', icon: 'mdi-video', text: 'Video' },
        { id: 2, vlaue: 'r', icon: 'mdi-record', text: 'Record' },
        { id: 3, vlaue: 't', icon: 'mdi-text', text: 'text' }
      ]
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Question Type'
        case 2:
          return 'Question insertion'
        case 3:
          return 'Answers insertion'
        case 4:
          return 'Select Unit'
      }
    },
    getSelection() {
      if (this.selecteditem == 0) {
        return 'p'
      } else if (this.selecteditem == 1) {
        return 'v'
      } else if (this.selecteditem == 2) {
        return 'r'
      } else {
        return 't'
      }
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

    {
      axios
        .get(`/api/units/${this.id}`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.videos = response.data.videos
          
        })
        .catch(error => {console.log(error)})
    }
    {
      axios
        .get(`/api/${this.id}/questions`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.allquest = response.data
          
        })
        .catch(error => console.log(error))
    }
  },

  methods: {
    deleteQs(){
      axios
        .delete(
          `/api/questionDelete/${this.Question_id}`
        )
        .then(response => {
          console.log(response)
            this.done=true
        })
      this.deleteDialog=false
    this.$root.$emit('getCourses')
    },
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
      },
      saveWords() {
        this.words_list.forEach(element => {
                
              
      axios
        .post(
          '/api/hardWordAdd',
          {
           
            word: element,
            video_id: this.video_id,
            
          },
          {
            headers: {
              'Content-Type': `multipart/form-data`
            }
          }
        )
        .then(res => {
          console.log(res)
            this.done=true
        })
        .catch(error => {console.log(error)
        this.notdone=true
        })
        }),
      this.Save_Words = false
       this.$root.$emit('getCourses')
    },
    saveQuize() {
      this.loading=true,
      axios
        .post(
          '/api/questionAdd',
          {
            type: this.addQuiz.type,
            question: this.addQuiz.question,
            question_link: this.addQuiz.question_link,
            correct_answer: this.addQuiz.correct_answer,
            choice1: this.addQuiz.choice1,
            choice2: this.addQuiz.choice2,
            unit_id: this.id
          },
          {
            headers: {
              'Content-Type': `multipart/form-data`
            }
          }
        )
        .then(res => {
          console.log(res)
          this.loading=false
          this.done=true
        })
        .catch(error => {console.log(error)
        this.notdone=true
        this.loading=false
        })
      this.SaveQuize = false
       this.$root.$emit('getCourses')
    },
    saveVideo() {
      this.loading=true,
      axios
        .post(
          '/api/videoAdd',
          {
            video_title: this.addvideo.video_title,
            video_link: this.addvideo.video_link,
            video_description: this.addvideo.video_description,
            video_subtitle: this.addvideo.video_subtitle,
            unit_id: this.id
          },
          {
            headers: {
              'Content-Type': `multipart/form-data`
            }
          }
        )
        .then(res => {
          console.log(res)
          this.loading=false
          this.done=true
        })
        .catch(error => {console.log(error)
        this.notdone=true
        this.loading=false
        })
      this.SaveVideo = false
       this.$root.$emit('getCourses')
    },
    saveLesson() {
      axios
        .post(
          '/api/lessonAdd',
          {
            lesson_title: this.addlesson.lesson_title,
            lesson_content: this.addlesson.lesson_content,
            unit_id: this.id
          },
          {}
        )
        .then(res => {
          console.log(res)
          this.done=true
        })
      this.SaveLesson = false
       this.$root.$emit('getCourses')
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false

      ;(this.SaveQuize = false),
        (this.SaveVideo = false),
        (this.SaveLesson = false),
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  },

  components: {
    TeacherSideBar,
    appbar,
    courses,
  }
}
</script>