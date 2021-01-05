<template>   
  <div class="home">
    <Header/>
    <Dashboard/>
    
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue';
// @ is an alias to /src
import Header from "../components/Header"


export default {
  name: 'Home',
  components: {
    Header,
    Dashboard,
  }
};
</script>

<style>
.home {
  height: 100vh
}
</style>
