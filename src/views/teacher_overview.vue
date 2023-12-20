<template><v-app>
   
  <v-main><v-container>
   
    <v-row>
          <v-bottom-sheet v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-col>
                <v-btn
                  color="edit"
                  fab
                  dark
                  large
                  bottom
                  right
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
              
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h4 edit--text">Overview </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  
                  <v-row>
                    <v-text-field
                     
                      label="enter overview"
                      color="edit"
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="edit" text > Cancel </v-btn>
                <v-btn color="edit" text > Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-bottom-sheet></v-row><UnitOverview/></v-container></v-main></v-app>
</template>
<script>
import UnitOverview from '../views/Unit_Overview'

export default {
    components: {
    UnitOverview
        
  }
}
</script>