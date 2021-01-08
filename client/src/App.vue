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
  mounted() {
    this.$store.dispatch("PROJECT/setProjects");
    this.$store.dispatch("ROOM/setRooms");
  },
  data() {
    return {
      //
    };
  },
};
</script>
