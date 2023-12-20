
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
    <v-row>
      
      <v-card justify="center" class="mx-auto my-17" width="750"
>
        <v-col justify="center" cols="12">
          <v-card class="o" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">Unit Overview</v-card-title>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="$router.push(`/Unit_Overview/${unit_id}`)"
                    bottom
                  >
                    Show Overview
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-4" size="100" tile>
                <v-img src="@/assets/use/undraw_my_universe_803e.svg"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col
          justify="center"
          cols="12"
          v-for="item in 2"
          :key="item.id"
          :hidden="skeleton"
        >
          <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader
        ></v-col>
        <v-col
          v-for="(item, id) in videos"
          :key="id"
          justify="center"
          cols="12"
        >
          <v-card class="mx-auto v" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.video_title"
                ></v-card-title>

                <v-card-subtitle
                  v-text="item.video_description"
                ></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="$router.push('/Video')"
                  >
                    START Video
                  </v-btn>
                </v-card-actions>
              </div>

              <v-btn
                v-show="h"
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                color="red"
                dark
                fab
                @click="deleteVideoItem(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, id) in lessons"
          :key="id"
          justify="center"
          cols="12"
        >
          <v-card class="l" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.lesson_title"
                ></v-card-title>

                <v-card-subtitle
                  v-text="item.lesson_description"
                ></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="$router.push(`/Lesson/${unit_id}/${item.id}`)"
                  >
                    START LESSON
                  </v-btn>
                </v-card-actions>
              </div>

              <v-btn
                v-show="h"
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                color="red"
                dark
                fab
                @click="deleteLessonItem(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <v-col justify="center" cols="12">
          <v-card class="q" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">Unit Quiz</v-card-title>

                <v-card-subtitle></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="$router.push('/Quiz')"
                  >
                    START QUIZ
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-4" size="100" tile>
                <v-img src="@/assets/use/undraw_teacher_re_sico.svg"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>


         <v-col justify="center" cols="12">
          <v-card class="a" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">Unit Paragraph</v-card-title>

                <v-card-subtitle></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="$router.push(`/article/${unit_id}`)"
                  >
                    Write an article
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-4" size="100" tile>
                <v-img src="@/assets/use/undraw_studying_re_deca.svg"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-card>
 <v-col  cols="4">
 
        <v-img src="@/assets/use/undraw_starry_window_re_0v82.svg"></v-img>
       </v-col>
      <v-dialog v-model="dialogVideoDelete" max-width="500px">
        <v-card>
          <v-card-title
            >Are you sure you want to delete this Course?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="edit" text @click="dialogVideoDelete=false">Cancel</v-btn>
            <v-btn color="edit" text @click="deleteVideoConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogLessonDelete" max-width="500px">
        <v-card>
          <v-card-title
            >Are you sure you want to delete this Course?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="edit" text @click="dialogLessonDelete=false">Cancel</v-btn>
            <v-btn color="edit" text @click="deleteLessonConfirm">OK</v-btn>
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
  
  props: { h: Boolean },
  data() {
    return {
      unit_id: this.$route.params.unit_id,
      skeleton: false,
      dialog: false,
      dialogVideoDelete: false,
      dialogLessonDelete: false,
      editedIndex: -1,
      videos: [],
      lesson: [],
      unit_overview: [],
      lessons: [],
      questions: [],
      done:false,
      undone:false
    }
  },
  created() {
    this.GetAllData()
  },

  mounted(){
    const thisInstance = this
    this.$root.$on('getCourses', function(){
      thisInstance.GetAllData()
    })
  },
  methods: {
     GetAllData(){

         {
      axios
        .get(`/api/units/${this.unit_id}`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        })
        .then(response => {
          this.videos = response.data.videos
          this.lesson = response.data.lesson
          this.unit_overview = response.data.unit_overview
          this.lessons = response.data.lessons
          this.questions = response.data.questions
          this.skeleton = true
        })
        .catch(error => console.log(error))
    }

     },
    deleteLessonItem(item) {
      this.editedIndex = item
      this.dialogLessonDelete = true
    },

    deleteLessonConfirm() {
      axios
        .delete(
          `/api/lessonDelete/${this.editedIndex}`
          
        )
        .then(response => {
          console.log(response)
         this.done=true
        })
        .catch(error => {
          console.log(error)
          this.undone=true})
       this.dialogLessonDelete=false
       this.GetAllData()
    },
    deleteVideoItem(item) {
      this.editedIndex = item
      this.dialogVideoDelete = true
      this.GetAllData()
    },

    deleteVideoConfirm() {
      axios
        .delete(
          `/api/videoDelete/${this.editedIndex}`
        )
        .then(response => {
          console.log(response)
          this.done=true
        })
        .catch(error => {
          console.log(error)
          this.undone=true
        
        })

      this.dialogVideoDelete=false
      this.GetAllData()
    },

    closeDelete() {
      this.dialogLessonDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  }
}
</script>
<style scoped>
.l {
  background-color: #5ebbb0;
}
.v { 
  background-color:#5e99bb ;
}

.o {
  background-color: #5ea8bb;
}
.q {
  background-color: #b0cb6b;
}
.a{background-color: #adc96b;}
</style>