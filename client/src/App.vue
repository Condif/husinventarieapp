<template color="accent1">
  <v-app >
    <Header />
    <v-main class="py-0">
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
    this.$store.dispatch("ITEMS/setItemFromStorage");
    this.$store.dispatch("FILE/setFiles")
    this.$store.dispatch("PROJECT/setProjects");
    this.$store.dispatch("HOUSE/setHouses");
    this.$store.dispatch("ROOM/setRooms");
    this.$store.dispatch("ITEMS/setItems");
  },
};
</script>
