<template>
    <v-app>
        <SideBar />
        <v-app-bar app>
            <appbar />
        </v-app-bar>
        <v-main>
         
          <v-container>
                <v-card>
    <h1>The Quiz</h1>

    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <div>{{ getCurrentQuestion.media }}</div>
        <span class="question">{{ getCurrentQuestion.question }}</span>
        <span class="score">Score {{ score }}/{{ questions.length }}</span>
      </div>

      <div class="options">
        <label
          v-for="(option, index) in getCurrentQuestion.options"
          v-bind:key="option"
          :for="'option' + index"
          :class="`option ${
            getCurrentQuestion.selected == index
              ? index == getCurrentQuestion.answer
                ? 'correct'
                : 'wrong'
              : ''
          } ${
            getCurrentQuestion.selected != null &&
            index != getCurrentQuestion.selected
              ? 'disabled'
              : ''
          }`"
        >
          <input
            type="radio"
            :id="'option' + index"
            :name="getCurrentQuestion.index"
            :value="index"
            v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected"
            @change="SetAnswer"
          />
          <span>{{ option }}</span>
        </label>
      </div>

      <v-btn @click="NextQuestion" :disabled="!getCurrentQuestion.selected">
        {{
          getCurrentQuestion.index == questions.length - 1
            ? 'Finish'
            : getCurrentQuestion.selected == null
            ? 'Select an option'
            : 'Next question'
        }}
      </v-btn>
    </section>

    <section v-else>
      <h2>You have finished the quiz!</h2>
      <p>Your score is {{ score }}/{{ questions.length }}</p>
    </section>
                </v-card>
          </v-container>
        </v-main>
        
    </v-app>
    
</template>


<script>
import SideBar from '../components/SideBar'
import appbar from '../components/app_bar'
import courses from '../components/Unit_courses'
export default {
  
  
     components: {
        SideBar,
        appbar,
        courses
     
    },
}
</script>

<script setup>
import { ref, computed } from 'vue'


const questions = ref([
  {
    question:
      '<img src="@/assets/use/undraw_video_call_re_4p26.svg" alt="Girl in a jacket" width="500" height="600"> <br>  What is ....?',
    answer: 0,
    options: ['A ....', 'B ....', 'C ....'],
    selected: null
  },
  {
    question:
      '  <audio controls> <source src="هنا تضع مسار الصوت" type="audio/mpeg"> </audio> <br>What is...?',
    answer: 2,
    options: ['A ....', 'B.....', 'C....'],
    selected: null
  },
  {
    question: 'What is .....?',
    answer: 1,
    options: ['A ....', 'B.....', 'C....'],
    selected: null
  }
])

const quizCompleted = ref(false)
const currentQuestion = ref(0)
const score = computed(() => {
  let value = 0
  questions.value.map(q => {
    if (q.selected != null && q.answer == q.selected) {
      console.log('correct')
      value++
    }
  })
  return value
})

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const SetAnswer = e => {
  questions.value[currentQuestion.value].selected = e.target.value
  e.target.value = null
}

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
    return
  }

  quizCompleted.value = true
}
</script>

<style>
