<template>
  <v-container class="py-16" fluid v-if="project !== undefined" min-width="300">
    <Quick-start />
    <v-row>
      <v-col sm="6" md="6" color="secondary">
        <v-card
          class="mx-auto mt-2 px-1 "
          color="primary"
          max-width="900"
          min-width="280"
        >
          <div class="d-flex justify-space-between">
            <v-card-title class="card-header">
              Mitt projekt: <br> {{ project.projectName }}
            </v-card-title>
            <div class="edit-buttons d-flex" color="accent2">
              <Delete-project-dialog v-bind:project="project" />
              <EditProject/>
            </div>
          </div>
          <div class="d-flex justify-center px-4">
            <v-img
              height="200"
              src="../assets/chris-briggs-ILBrHd6PFJA-unsplash.jpg"
            ></v-img>
          </div>

          <v-card-title>Beskrivning</v-card-title>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
          <v-card-title v-if="project.roomId">
            {{ project.roomId.roomName }}
          </v-card-title>
          <v-card-title v-if="project.category">
            {{ project.category }}
          </v-card-title>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header color="primary">
                Inventarier
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="item in project.itemsId"
                :key="item._id"
                fucosable
                color="primary"
              >
                <v-list-item fluid>
                  <v-btn
                    class="mx-auto my-auto mb-0"
                    width="70%"
                    depressed
                    :key="item._id"
                    @click="goToItemHandler(item)"
                    >{{ item.itemName }}</v-btn
                  >

                  <v-list-item>
                    <v-btn
                      icon
                      class="my-auto mb-0 mr-1 "
                      depressed
                      :key="item._id + 1"
                      @click="deleteItemHandler(item._id)"
                    >
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      class="my-auto mb-0 "
                      depressed
                      :key="item._id + 2"
                      @click="deleteItemHandler(item._id)"
                    >
                      <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuickStart from "../components/QuickStart.vue";
import DeleteProjectDialog from "../elements/DeleteProjectDialog.vue";
import EditProject from "../components/EditProject.vue";
export default {
  namespaced: true,
  name: "Project",
  data: () => ({}),
  components: {
    QuickStart,
    DeleteProjectDialog,
    EditProject,
  },
  methods: {
    log(message) {
      console.log(message);
    },
    goToItemHandler(selectedItem) {
      this.$store.dispatch("ITEMS/setItem", selectedItem);
      localStorage.setItem("currentItem", JSON.stringify(selectedItem));
      this.$router.push("Item");
    },
    async deleteItemHandler(selectedItemId) {
      await this.$store.dispatch("ITEMS/deleteItem", selectedItemId);
      this.$store.dispatch("PROJECT/setProjects");
    },
  },
  computed: {
    projects() {
      return this.$store.getters["PROJECT/getProjects"];
    },
    project() {
      return this.$store.getters["PROJECT/getProjectFromProjects"](
        this.$store.getters["PROJECT/getProject"]._id
      );
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}
.v-card-text {
  font-size: 0.4rem;
}
.v-btn {
  font-size: 1rem;
  font-weight: 600;
}
</style>
