import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueYouTubeEmbed from 'vue-youtube-embed'
import router from './router'
import './axios'

import "/node_modules/flag-icons/css/flag-icons.min.css";



Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false

// firebase.initializeApp({
//  Configurações do seu app
// })

// export const db = firebase.firestore()

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
