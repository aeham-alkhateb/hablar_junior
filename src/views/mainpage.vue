<template>
    <v-app>
        <SideBar />
        <v-app-bar app>
            <appbar />
        </v-app-bar>
        <v-main>
          <v-container>
                <user/>
          </v-container>
        </v-main>
    </v-app>
</template>


<script>
import SideBar from '../components/SideBar'
import appbar from '../components/app_bar'
import user from '../components/user_units'
export default {
    name: "overview",
     components: {
        SideBar,
        appbar,
        user     
    },
}
</script>