<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  created () {
     this.$store.dispatch("PROJECT/setProjectFromStorage")
     this.$store.dispatch("ITEMS/setItemFromStorage")
  },
  mounted() {
    this.$store.dispatch("PROJECT/setProjects");
    this.$store.dispatch("ROOM/setRooms");
    this.$store.dispatch("ITEMS/setItems");
  },
};
</script>
