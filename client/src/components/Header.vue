<template>
  <v-app-bar app absolute dark hide-on-scroll 
  style="background: linear-gradient(to right top, #e8dfe0, #ead3d1, #e9c7be, #e4bea8, #dab692);">
    <v-app-bar-nav-icon color="secondary"></v-app-bar-nav-icon>

    <router-link to="/"><v-toolbar-title><h2 class="secondary--text" >MYhome</h2></v-toolbar-title></router-link>

    <v-spacer></v-spacer>

    <v-btn icon color="secondary">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon color="secondary">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

   
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
