<template>
  <v-app>
    <v-main class="pt-0">
      <home />
      <about />
      <download />
      
     
      <router-view/>
    </v-main>
    
    <navigation :color="color" :flat="flat" />
   
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="secondary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <foote />
  </v-app>
</template>

<style scoped>
.v-main {
  background-image: url("~@/assets/img/bgMain.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>

<script>

import navigation from "../components/Navigation";
import foote from "../components/Footer";
import home from "../components/HomeSection";
import about from "../components/AboutSection";
import download from "../components/DownloadSection";
import pricing from "../components/PricingSection";
import contact from "../components/ContactSection";

export default {
  name: "overview",

  components: {
    navigation,
    foote,
    home,
    about,
    download,
    pricing,
    contact,
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
  }),

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "theme";
      this.flat = false;
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else {
        this.color = "theme";
        this.flat = false;
      }
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
