<template>
  <v-container class="py-16" fluid v-if="project !== undefined" min-width="300">
    <Quick-start />
    <v-row>
      <v-col sm="6" md="6" order-md="1" color="secondary">
        <v-card
          class="mx-auto mt-2 px-1 "
          color="primary"
          max-width="900"
          min-width="280"
        >
          <div class="d-flex justify-space-between">
            <v-card-title class="card-header">
              Mitt valda projekt: <br> {{ project.projectName }}
            </v-card-title>
            <div class="edit-buttons d-flex pt-4" color="accent2">
              <Delete-project-dialog v-bind:project="project" />
              <EditProject v-bind:project="project"/>
            </div>
          </div>
          <div class="d-flex justify-center px-4">
            <v-img v-if="project.imageId !== undefined"
              height="200"
              :src="image"
            ></v-img>
          </div>

          <v-card-title>Beskrivning</v-card-title>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
          
          <v-expansion-panels>
            <v-expansion-panel v-if="project.roomId">
              <v-expansion-panel-header color="primary">
                Rum
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                 {{ project.category }}
                 </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="project.category">
              <v-expansion-panel-header color="primary">
                Kategori
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                 {{ project.category }}
                 </v-expansion-panel-content>
            </v-expansion-panel>
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
            <v-expansion-panel v-if="project.fileId">
              <v-expansion-panel-header color="primary">
                Dokument
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                 <div class="d-flex justify-space-between align-center">
                  <div>
                    <v-icon>mdi-arrow-up-bold-box-outline</v-icon
                    > Namn på filen
                  </div>
                <v-btn color="accent2" :href="fileURL">hämta fil </v-btn>
                </div>
                 </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card  max-width="900" color="primary" class="mx-auto mt-1"
          >
          <v-card-text>
            <h5>Alla Projekt</h5>

            <v-list-item two-line v-for="(project, i) in projects" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ project.projectName }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ project.description }},
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="openProjectDetails(project)">
                  <v-icon color="secondary">mdi-open-in-new</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card-text>
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
    openProjectDetails(selectedProject) {
      this.$store.dispatch("PROJECT/setProject", selectedProject);
   
      this.$store.dispatch(
        "IMAGE/setImage",
        this.$store.getters["PROJECT/getProject"].imageId
      );
      localStorage.setItem("currentProject", JSON.stringify(selectedProject));
      window.scrollTo(0, 0);
      console.log(this.project);
    },
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
    image() {
      return "api/images/" + this.$store.getters["PROJECT/getProject"].imageId;
    },
    files() {
      return this.$store.getters["FILE/getFiles"];
    },
    fileURL() {
      return (
        "/api/files/" + this.$store.getters["PROJECT/getProject"].fileId);
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
