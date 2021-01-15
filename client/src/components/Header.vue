<template>
  <nav>
    <v-app-bar
      app
      absolute
      dark
      hide-on-scroll
      style="background: linear-gradient(to right top, #e8dfe0, #ead3d1, #e9c7be, #e4bea8, #dab692)"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-list-item>
        <v-list-item-title class="title">
          <router-link to="/" exact>
            MYhome
          </router-link>
        </v-list-item-title>
      </v-list-item>

      <v-spacer></v-spacer>
      <v-btn icon color="secondary"> <v-icon>mdi-magnify</v-icon> 
      </v-btn>

      <v-btn color="white" v-if="!loggedIn" text to="/login">
        <span>Login</span>
        <v-icon right></v-icon>
      </v-btn>

      <v-btn v-if="loggedIn" @click="logout" to="/login" color="grey" text>
        <span>Sign Out</span>
        <v-icon right></v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <v-navigation-drawer
      v-model="drawer"
      app
      style="background: linear-gradient(to right top, #e8dfe0, #ead3d1, #e9c7be, #e4bea8, #dab692)"
    >
    <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
      <v-list-item>
        <v-list-item-title class="title">
          <router-link to="/createitem" exact>
            Create Item
          </router-link>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="title">
          <router-link to="/createproject" exact>
            Create Project
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-navigation-drawer> -->

    <v-navigation-drawer
      class="deep-purple accent-4"
      dark
      v-model="drawer"
       app
      style="background: linear-gradient(to right top, #e8dfe0, #ead3d1, #e9c7be, #e4bea8, #dab692)"
   
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="item.link" exact> 
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="accent1">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    drawer: false,
     items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/home'},
          { title: 'Mitt Hus', icon: 'mdi-home-city', link: '/createitem'},
          { title: 'Projekt', icon: 'mdi-calendar-check-outline', link: '/createitem'},
          { title: 'Mitt konto', icon: 'mdi-account-box', link:'/createproject' },
          { title: 'Admin', icon: 'mdi-gavel', link: '/createitem'},
        ],
  }),
  methods: {
    async logout() {
        await this.$store.dispatch("SESSION/logout").then(() => {
          if(this.$store.getters["SESSION/getLoggedOut"] === true) {
              this.signedOut = true
              this.$router.push({ name: "Login" });
          }
        })
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters["SESSION/getLoggedIn"]
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  display: inline-block;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>
