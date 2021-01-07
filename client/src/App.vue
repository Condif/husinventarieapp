<template>
  <v-app>
    <v-main>
    <Header />
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
  mounted() {
    this.$store.dispatch("PROJECT/setProjects")
  },
  data() {
    return {
      //
    };
  },
};
</script>
