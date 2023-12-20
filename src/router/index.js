import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import profile from '../views/profile.vue'
import overView from '../views/overview.vue'
import teacher from '../views/teacher.vue'
import Root from '../views/Root.vue'
import mainpage from '../views/mainpage.vue'
import course from '../views/course.vue'
import teacher_course from '../views/teacher_course.vue'
import Quiz from '../views/Quiz.vue'
import Lesson from '../views/Lesson.vue'
import Unit_Overview from '../views/Unit_Overview.vue'
import teacher_Unit_Overview from '../views/teacher_overview.vue'
import teacher_Lesson from '../views/teacher_lesson.vue'
import teacher_profile from '../views/teacher_profile.vue'
import select_lang from '../views/select_lang.vue'
import video from '../views/video.vue'
import teacher_review from '../views/teacher_review.vue'
import article from '../views/article.vue'
import article_review from '../views/article_review.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/video',
  name: 'video',
  component: video
  },
  { path: '/article/:unit_id',
  name: 'article',
  component: article
  },
  
  ,
  { path: '/article_review/:unit_id/:user_id',
  name: 'article_review',
  component: article_review
  },
  {
    path: '/',
    name: 'overView',
    component: overView
  },
  { path: '/login',
  name: 'login',
  component: login
  },
  { path: '/profile',
  name: 'profile',
  component: profile,
  
  },
  { path: '/mainpage',
  name: 'mainpage',
  component: mainpage
  },
  { path: '/teacher',
  name: 'teacher',
  component: teacher
  },
  { path: '/Root',
  name: 'Root',
  component: Root
  },
  { path: '/course/:unit_id',
  name: 'course',
  component: course
  },
  { path: '/teacher_course/:unit_id',
  name: 'teacher_course',
  component: teacher_course
  },
  { path: '/Quiz',
  name: 'Quiz',
  component: Quiz
  },
  { path: '/Lesson/:unit_id/:lesson_id',
  name: 'Lesson',
  component: Lesson
  }, { path: '/Unit_Overview/:unit_id',
  name: 'Unit_Overview',
  component: Unit_Overview
  }, { path: '/teacher_Unit_Overview/:unit_id',
  name: 'teacher_Unit_Overview',
  component: teacher_Unit_Overview
  }, { path: '/teacher_Lesson/:unit_id/:lesson_id',
  name: 'teacher_Lesson',
  component: teacher_Lesson
  }, { path: '/teacher_profile',
  name: 'teacher_profile',
  component: teacher_profile
  }
  ,  { path: '/select_lang',
  name: 'select_lang',
  component: select_lang
  }
  ,  { path: '/teacher_review',
  name: 'teacher_review',
  component: teacher_review
  }
  


  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
