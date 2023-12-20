<template>
  <section id="about">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="7">
              <h1 class="font-weight-light display-2">About us</h1>
              <h1 class="font-weight-light display-1 mb-3">
                learn and fun!
              </h1>
              <v-row>
               
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/assets/img/video.svg"
                    max-width="60px"
                    class="mr-4"
                  />
                  <p class="text-justify">
                    learn by watching Scenes from Movies, Shows or Trending clips.<br>
                    you will have alot of fun by playing games also.  <br>
                    and With all this fun you will learn alot of new words.

                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/assets/img/progress.svg"
                    max-width="60px"
                    class="mr-4"
                  />
                  <p class="text-justify">
                   you can keep tracking your progress.<br>
                   there is a grammers section for more and more learning.
                  </p>
                </v-col>
                 <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/assets/img/phone.svg"
                    max-width="60px"
                    class="mr-4"
                  />
                  <p class="text-justify">
                   you can learn on your phone ,<br>
                   Android application 
                   or Web application.
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5" class="d-none d-md-flex">
              <v-img
                src="@/assets/img/ill2.svg"
                class="d-block ml-auto mr-auto"
                max-width="400px"
              />
            </v-col><br><br>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#about {
  background-color: #f4f7f5;
}
p{
  color: black;
}
</style>
