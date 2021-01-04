<template>
    <v-app>
        <Header/>
          <v-main>
            <Home/>
          </v-main>
        
    </v-app>
      
</template>

<script>
import Home from './views/Home';
import Header from "./components/Header";

export default {
  name: 'App',

  components: {
    Home,
    Header
  },

  data: () => ({
    //
  }),
};
</script>
