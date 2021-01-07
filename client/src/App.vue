<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
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
