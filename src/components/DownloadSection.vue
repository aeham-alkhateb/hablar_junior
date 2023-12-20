<template>
  <section id="download">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col sm="4" class="hidden-xs-only">
              <v-img src="@/assets/img/ill1.svg" class="d-block ml-auto mr-auto" max-width="350px" />
            </v-col>
            <v-col cols="12" sm="8" class="black--text text-left">
              <h1 class="font-weight-light display-2 mb-2">Download for Android</h1>
              <h1 class="font-weight-light">you can join us also on Android phones <br>click here to start downloading

              </h1>
              <v-btn rounded outlined href="" target="_blank" large color="black" class="mt-4">
                <v-icon class="mr-2">
                  mdi-google-play
                </v-icon>
               PlayStore
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#download {
 
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 500px;
}

#download .container,
#download .row {
  height: 100%;
}
</style>