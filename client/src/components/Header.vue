<template>
  <nav>
    <v-app-bar
      app
      fixed
      dark
      elevate-on-scroll
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
      <v-btn color="white" v-if="!loggedIn && inLogin" text to="/signup">
        <span>Registrera </span>
        <v-icon right></v-icon>
      </v-btn>

      <v-btn v-if="loggedIn" @click="logout " to="/login" color="grey" text>
        <span>Logga ut </span>
        <v-icon right></v-icon>
      </v-btn>
      <v-btn v-if="!loggedIn && inSignup" to="/login" color="white" text>
        <span>Logga in</span>
        <v-icon right></v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      class="deep-purple accent-4"
      dark
      v-model="drawer"
      app
      style="background: linear-gradient(to right top, #e8dfe0, #ead3d1, #e9c7be, #e4bea8, #dab692)"
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
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
          <v-btn
            v-if="loggedIn"
            @click="logout"
            to="/login"
            block
            color="accent1"
          >
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
      { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
      { title: "Mitt Hus", icon: "mdi-home-city", link: "/house" },
      {
        title: "Projekt",
        icon: "mdi-calendar-check-outline",
        link: "/project",
      },
      { title: "Inventarier", icon: "mdi-ballot", link: "/item" },
    ],
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("SESSION/logout")
      // await this.$store.state.commit("SESSION/setLoggedIn", false);
      localStorage.setItem("loggedIn", JSON.stringify(false));
      // this.$router.push({ name: "Login" });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.getters["SESSION/getLoggedIn"];
    },
    inLogin() {
      return this.$store.getters["SESSION/getInLogin"];
    },
    inSignup() {
      return this.$store.getters["SESSION/getInSignup"];
    }
  },
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
