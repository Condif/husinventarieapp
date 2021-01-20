<template>
  <v-sheet
    id="scrolling-techniques-7"
    class="overflow-y-auto"
    max-height="100%"
  >
    <v-card class="mx-auto pt-2" color="primary">
      <v-card-title v-if="project !== undefined">
        {{ project.projectName }}
      </v-card-title>

      <v-card-subtitle text>
        2021-01-02 En massa kablar och annat bös
      </v-card-subtitle>
      <v-img
        height="200"
        src="../assets/chris-briggs-ILBrHd6PFJA-unsplash.jpg"
      ></v-img>
      <v-expansion-panels v-if="project !== undefined">
        <v-expansion-panel>
          <v-expansion-panel-header color="primary">
            Mitt hem
          </v-expansion-panel-header>
          <v-expansion-panel-content
            color="primary"
            v-for="house in houses"
            :key="house._id"
            fucosable
          >
            <v-container>
              <v-btn color="base" width="90%" @click="goToHouseHandler(house)"
                >{{ house.houseName }}
              </v-btn>
              <!-- <v-btn :key="item._id + 1" @click="deleteProjectHandler(item._id)">
              <v-icon >mdi-delete-forever</v-icon>
            </v-btn> -->
            </v-container>
            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              aspernatur neque sequi exercitationem consectetur excepturi unde,
              voluptatibus ratione mollitia nobis reprehenderit, maiores quasi
              nulla dicta magni tempora at veritatis ducimus.
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="project !== undefined">
          <v-expansion-panel-header color="primary">
            Mina projekt
          </v-expansion-panel-header>
          <v-expansion-panel-content
            color="primary"
            v-for="item in project.itemsId"
            :key="item._id"
            fucosable
          >
            <v-container>
              <v-btn
                color="base"
                width="70%"
                @click="goToProjectHandler(project)"
                >{{ project.projectName }}
              </v-btn>
              <!-- <v-btn :key="item._id + 1" @click="deleteProjectHandler(item._id)">
              <v-icon >mdi-delete-forever</v-icon>
            </v-btn> -->
            </v-container>
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
    goToHouseHandler(selectedHouse) {
      this.$store.dispatch("HOUSE/setHouse", selectedHouse);
      localStorage.setItem("currentHouse", JSON.stringify(selectedHouse));
      this.$router.push({ name: "House" });
    },
  },

  computed: {
    projects() {
      return this.$store.getters["PROJECT/getProjects"];
    },
    houses() {
      return this.$store.getters["HOUSE/getHouses"];
    },
    project() {
      return this.$store.getters["PROJECT/getProjectFromProjects"](
        this.$store.getters["PROJECT/getProject"]._id
      );
    },
  },
};
</script>

<style></style>
