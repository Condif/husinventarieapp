<template>
  <v-app-bar app color="info" absolute dark hide-on-scroll prominent>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title><h2>MYhome</h2></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
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
