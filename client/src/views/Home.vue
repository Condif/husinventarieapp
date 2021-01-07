<template>
<v-container fluid>

<v-row > 
   <v-col cols="auto">
     
    <Dashboard />
   </v-col>
   <v-col cols="auto">

    <Quick-start/>
   </v-col>
   <v-col cols="6">
     testar fast kolumn
     
   </v-col>
 </v-row> 
</v-container>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
import QuickStart from '../components/QuickStart.vue';
// @ is an alias to /src


export default {
  name: "Home",
  components: {

    Dashboard,
    QuickStart,
  },
};
</script>

<style>
.home {
  height: 100%;
}
</style>
