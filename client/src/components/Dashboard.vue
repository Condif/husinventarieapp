<template>
  
    <v-card max-width="900" class="mx-auto pt-2 mt-2" color="primary">
      <v-card-title v-if="project !== undefined">
        <h1>Välkommen!</h1>
      </v-card-title>
      <v-card-title v-if="project !== undefined">
        <div>
          <h3>Senaste projekt:</h3>
          <h4>
            {{ project.projectName }}
          </h4>
        </div>
      </v-card-title>
      <v-img
        height="400"
        src="../assets/startHus1.jpg"
      ></v-img>
      <v-expansion-panels class="pb-2" color="primary" v-if="projects !== undefined" popout>
            <h2>
              Mina aktiva projekt
            </h2>
        <v-expansion-panel  color="primary"
            v-for="project in projects"
            :key="project._id"
            fucosable>
          <v-expansion-panel-header color="primary">
            <h3>
              {{ project.projectName }}
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            color="primary"
          >
            <div class="d-flex justify-space-between mt-2">
              <div class="d-flex flex-column">

              <p>Projektbeskrivning: <br>{{ project.description }}</p>
              <p v-if="project.roomId">Rum: <br> {{ project.roomId.roomName}} </p>
              <p>Kategori: <br> {{ project.category}}</p>
              </div>

              <v-btn class="align-self-center" fab color="accent2" @click="goToProjectHandler(project)">
                <v-icon color="white">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
 
</template>

<script>
export default {
  namespaced: true,
  name: "Dashboard",
  data: () => ({
    settings: [],
  }),

  methods: {
    goToProjectHandler(selectedProject) {
      this.$store.dispatch("PROJECT/setProject", selectedProject);
      localStorage.setItem("currentProject", JSON.stringify(selectedProject));
      this.$router.push("Project");
    },
  },

  computed: {
    projects() {
      return this.$store.getters["PROJECT/getProjects"];
    },
    project() {
      if (this.$store.getters["PROJECT/getProject"] !== undefined) {
        if (this.$store.getters["PROJECT/getProject"].length !== 0) {
          return this.$store.getters["PROJECT/getProjectFromProjects"](
            this.$store.getters["PROJECT/getProject"]._id
          );
        }
      }
      return [];
    },
  },
};
</script>

<style scoped>
.title {
  color: "#white";
}
</style>
