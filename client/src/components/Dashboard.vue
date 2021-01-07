<template>
  <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="98%">
    <v-card class="mx-auto mt-16" max-width="344">
      <v-img src="../assets/vinden.jpeg" height="200px"></v-img>

      <v-card-title>
        {{projects[0].projectName}}
      </v-card-title>

      <v-card-subtitle>
        2021-01-02 En massa kablar och annat bös
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text>
          Mitt hem
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he
            could deliver. You won't have time for sleeping, soldier, not with
            all the bed making you'll be doing. Then we'll go with that data
            file! Hey, you add a one and two zeros to that or we walk! You're
            going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
      <v-card-actions>
        <v-btn color="orange lighten-2" text>
          Mina Projekt
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show1 = !show1">
          <v-icon>{{ show1 ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show1">
          <v-divider></v-divider>

          <v-card-text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ea
            odio, facilis facere voluptas deserunt fugiat. Eius sit quidem cum
            nemo quos, reprehenderit eligendi corporis quae dolore porro
            mollitia molestias?
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card class="mx-auto mt-1" max-width="344">
      <v-card-title>
        Aktivitet
      </v-card-title>
      <v-list subheader two-line flat>
        <v-subheader>Att göra </v-subheader>

        <v-list-item-group v-model="settings" multiple>
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Ring Elektrikern</v-list-item-title>
                <v-list-item-subtitle
                  >Pratar med Pelle om ny kabeldragning</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Betala snickaren</v-list-item-title>
                <v-list-item-subtitle
                  >Betala fakturan för entredörren</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Köp avloppsrör</v-list-item-title>
                <v-list-item-subtitle
                  >Köp 110mm avlopsböj 45 grader på
                  Byggmax</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-btn class="ma-2" color="primary" dark>
        Nytt Projekt
        <v-icon dark right>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark>
        Mitt hem
        <v-icon dark right>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
      <v-btn 
      @click="setProjects" 
      class="ma-2" 
      color="primary" 
      dark>
        Add projects
      </v-btn>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  namespaced: true,
  name: "Dashboard",
  data: () => ({
    show: false,
    show1: false,
    settings: [],
  }),
  methods: {
    setProjects: function() {
      return this.$store.dispatch('PROJECT/setProjects')
    }
  },
  computed: {
    projects() {
      return this.$store.getters["PROJECT/getProjects"];
    }
  },
};
</script>

<style></style>
