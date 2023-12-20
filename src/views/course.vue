<template>
    <v-app>
        <SideBar />
        <v-app-bar app>
            <appbar />
        </v-app-bar>
        <v-main>
          <courses />
          <v-container>
                 
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