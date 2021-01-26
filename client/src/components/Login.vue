<template>
  <v-app>
    <v-main  class="main">
      <v-container fluid fill-height >
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4 >
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Logga in</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Lösenord"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
                <router-link to="/signup">Inte registrerad? Registrera dig här.</router-link>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="loginHandler">Logga in</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    async loginHandler() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      await this.$store.dispatch("SESSION/login", credentials).then(() => {
          if(this.$store.getters["SESSION/getLoggedIn"] === true) {
              this.$store.dispatch("PROJECT/setProjects")
              this.$store.dispatch("HOUSE/setHouses")
              this.$router.push({ name: "Home" });
          }
      })
      
    },
  },
};
</script>

<style >
.main {
  background-image: url('../assets/chris-briggs-ILBrHd6PFJA-unsplash.jpg');
  background-size: calc(80vh - 56px);
}
</style>
