<template>
  <v-sheet
    id="scrolling-techniques-7"
    class="overflow-y-auto"
    max-height="100%"
  >
    <v-card class="mx-auto pt-2" max-width="344" color="primary">
      <v-card-title v-if="project !== undefined">
        {{project.projectName}}
      </v-card-title>

      <v-card-subtitle  text>
        2021-01-02 En massa kablar och annat bös
      </v-card-subtitle>
      <v-img height="200" src="../assets/chris-briggs-ILBrHd6PFJA-unsplash.jpg"></v-img>

      <v-card-actions  >
        <v-btn  text>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            aspernatur neque sequi exercitationem consectetur excepturi unde,
            voluptatibus ratione mollitia nobis reprehenderit, maiores quasi
            nulla dicta magni tempora at veritatis ducimus.
          </v-card-text>
        </div>
      </v-expand-transition>
      <v-card-actions>
        <v-btn text>
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
          <div v-if="project !== undefined">
            <v-card-text v-for="project in projects" :key="project._id">
              <h1>{{project.projectName}}</h1>
            </v-card-text>
          </div>
        </div>
      </v-expand-transition>
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

  computed: {
    projects() {
      return this.$store.getters["PROJECT/getProjects"];
      
    },
    project() {
      return this.$store.getters["PROJECT/getProject"]("5feb4415b86c74079a471b36");
    }
    
  },
};
</script>

<style></style>
