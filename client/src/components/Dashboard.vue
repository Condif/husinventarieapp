<template>
  <v-sheet
    id="scrolling-techniques-7"
    class="overflow-y-auto"
    max-height="100%"
  >
    <v-card class="mx-auto pt-2"  color="primary">
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
          <div v-if="projects !== undefined">
            <v-card-text v-for="project in projects" :key="project._id">
              <v-btn @click="goToProjectHandler(project)">{{project.projectName}}</v-btn>
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
  
  methods: {
    goToProjectHandler(selectedProject) {
      this.$store.dispatch("PROJECT/setProject", selectedProject)
      localStorage.setItem("currentProject", JSON.stringify(selectedProject))
      this.$router.push('Project')
    },
  },

  computed: {
    projects() {
      return this.$store.getters["PROJECT/getProjects"];
      
    },
    project() {
      return this.$store.getters["PROJECT/getProjectFromProjects"](this.$store.getters["PROJECT/getProject"]._id)
    }
    
  },
};
</script>

<style></style>
