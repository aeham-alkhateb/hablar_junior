<template>
  <v-app>
    <SideBar />
    <v-app-bar app>
      <appbar />
    </v-app-bar>
    <!-- <SideBarRight /> -->
    <v-main><v-row>
      <v-col>
       
          <v-card max-height="200px" class="mx-auto">

            <video
              id="video"
              ref="video"
              controls
              preload="auto"
              @click="updatePaused"
              style="height:670px"
            >
              <source src="@/assets/video/bryan.mp4" type="video/mp4" />
            </video>
            <v-bottom-navigation
    
              color="primary"
              horizontal
            >
            <textarea
              hide-details="auto"
              clearable
              @input="translate_"
              @dblclick="translate_"
              ref="vta"
              cols="50"
              
            />

            <input
              type="file"
              ref="doc"
              v-on:change="readFile"
              value="Add Subtitles"
            />
          </v-bottom-navigation>
          </v-card>
        
      
      </v-col>
      <v-col>
        <v-card v-show="trans" class="translation" max-height="750px">
          <v-container>
         <v-row><v-col><h1 class="edit--text">{{full_url.word}}:</h1></v-col><v-col><v-btn @click="playsound()" icon> <v-icon>mdi-volume-high</v-icon></v-btn></v-col></v-row>
          <v-divider  ></v-divider>
          <h2 class="theme--text"><i>{{meanings.partOfSpeech}}</i></h2>
          <br>
          <h2 >Definitions:</h2>
          <span> <i v-for="item in meanings.definitions" :key="item.id"><br>-{{item.definition}}<br>example: {{item.example}} <br></i> </span>
          </v-container>
        </v-card>
      </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from '../components/SideBar'
import appbar from '../components/app_bar'

import axios from 'axios'
export default {
  name: 'VideoPlayer',

  computed: {
    videoElement_() {
      return this.$refs.video
    }
  },


  data() {
    return {
      file: "@/assets/video/bryan.srt",
     
      content: null,
      progress: [],
      progressInSeconds: [],
      progressInSeconds_array: [],
      captions: [],
      videoElement: null,
      paused: true,
      count: 0,
      ready: false,
      url: '',
      full_url: [],
      selection: '',
      full_definition: false,
      meanings:[],
      sound:[],
      trans:false
    }
  },

  methods: {
    playsound(){
      var audio = new Audio(this.sound)
      audio.play()
    },
    readFile() {
      this.file = this.$refs.doc.files[0]
      const reader = new FileReader()
      if (this.file.name.includes('.srt')) {
        reader.onload = res => {
          this.content = res.target.result
          this.captions = this.content.split('\r\n\r\n').map(function (item) {
            var parts = item.split('\r\n')
            return {
              number: parts[0],
              time: parts[1],
              text: parts[2]
            }
          })

          this.progress = this.captions.map(function (item) {
            var t = item.time.split('-->')
            return {
              slice: t[0]
            }
          })

          this.progressInSeconds = this.progress.map(function (item) {
            var a = item.slice.split(':')
            var seconds =
              parseFloat(a[0]) * 60 * 60 +
              parseFloat(a[1]) * 60 +
              parseFloat(a[2].replace(',', '.'))
            return {
              seconds: seconds
            }
          })

          for (var i = 0; i < this.progressInSeconds.length; i++)
            this.progressInSeconds_array[i] = parseFloat(
              this.progressInSeconds[i].seconds
            )
        }
        reader.onerror = err => console.log(err)
        reader.readAsText(this.file)
      } else {
        this.content = 'check the console for file output'
        reader.onload = res => {
          console.log(res.target.result)
        }
        reader.onerror = err => console.log(err)
        reader.readAsText(this.file)
      }
    },

    updatePaused(event) {
      this.videoElement = event.target
      if (this.paused) this.play()
      else this.pause()
    },

    play() {
      this.videoElement.pause()
      this.paused = !this.paused
      var time = this.progressInSeconds_array[this.count],
        self = this,
        intId

      function invoke() {
        intId = setTimeout(function () {
          // self.$refs.tracks.textContent = self.captions[self.count].text
          self.$refs.vta.textContent = self.captions[self.count].text
          self.count += 1
          time =
            self.progressInSeconds_array[self.count] -
            self.progressInSeconds_array[self.count - 1]
          time *= 1000
          intId = window.clearTimeout(intId)
          if (!self.paused) {
            invoke()
          }
        }, time)
      }

      invoke()
    },

    pause() {
      this.videoElement.play()
      this.paused = !this.paused
      this.count -= 1
    },

    translate_() {

      this.start = this.$refs.vta.selectionStart
      this.end = this.$refs.vta.selectionEnd
      this.selection = this.$refs.vta.innerHTML.substring(this.start, this.end)
      
     
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.selection}`)
        .then(response => {
          
          console.log(response)
          this.full_url=response.data[0]
          this.meanings=response.data[0].meanings[0]
          this.sound=response.data[0].phonetics[0].audio
          this.trans=true
        })
        .catch(error => console.log(error))
        
    }
  },
  components: {
    SideBar,
    appbar
  }
}
</script>

<style>
textarea{
  font-size: 30px;
    resize: none;

}

</style>
