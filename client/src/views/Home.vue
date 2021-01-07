<template>
  <div class="home">
   
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
// @ is an alias to /src


export default {
  name: "Home",
  components: {

    Dashboard,
  },
};
</script>

<style>
.home {
  height: 100vh;
}
</style>
