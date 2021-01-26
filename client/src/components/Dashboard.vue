<template>
  <v-sheet
    id="scrolling-techniques-7"
    class="mx-auto pt-2"
    max-height="100%"
    max-width="900"
    color="accent2"
  >
    <v-card max-width="900" class="mx-auto pt-2" color="accent2">
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
        src="../assets/todd-kent-178j8tJrNlc-unsplash.jpg"
      ></v-img>
      <v-expansion-panels>
        <v-expansion-panel v-if="projects !== undefined">
          <v-expansion-panel-header color="primary">
            <h2>
              Mina projekt
            </h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            color="primary"
            v-for="project in projects"
            :key="project._id"
            fucosable
          >
            <h3>
              {{ project.projectName }}
            </h3>
            <div class="d-flex justify-space-between">
              <p>{{ project.description }}</p>

              <v-btn fab color="accent2" @click="goToProjectHandler(project)">
                <v-icon color="white">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-sheet>
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
