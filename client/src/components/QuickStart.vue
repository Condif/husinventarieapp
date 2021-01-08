<template>
  <v-container >
    <v-speed-dial   v-model="fab" bottom="true" absolute="true" right="true">
      <template v-slot:activator>
        <v-btn v-model="fab" fab dark x-large color="accent2">
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
           mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark medium color="accent1">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark medium color="primary">
        <v-icon>mdi-briefcase</v-icon>
      </v-btn>
      <v-btn fab dark medium color="secondary">
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </v-speed-dial>

   
  </v-container>
</template>

<script>
export default {
  name: "QuickStart",

  data: () => ({ 
    fab: false,
    
  }),
};
</script>

<style></style>
