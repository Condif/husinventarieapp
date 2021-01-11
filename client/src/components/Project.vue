<template>
  <v-container fluid v-if="project !== undefined">
    <Quick-start />
    <v-row>
      <v-card class="mx-auto pt-2" color="primary">
        <v-card-title >
          {{ project.projectName }}
        </v-card-title>

        <v-card-subtitle text>
          2021-01-02 En massa kablar och annat bös
        </v-card-subtitle>
        <v-img
          height="200"
          src="../assets/chris-briggs-ILBrHd6PFJA-unsplash.jpg"
        ></v-img>
        <v-card-title >
          {{ project.description }}
        </v-card-title>
        <v-card-title >
          {{ project.roomId.roomName }}
        </v-card-title>
        <v-card-title >
          {{project.category}}
        </v-card-title>
      </v-card>
    </v-row>
    <v-row>
      <v-col color="secondary">
        <v-card-title >
          {{ project.itemsId[0].itemName}}
        </v-card-title>
        <!-- <v-card-title >
          Image
        </v-card-title> -->
        <v-card-title >
            {{ project.itemsId[0].description}}
        </v-card-title>
        <v-card-title >
            {{ project.itemsId[0].orderDate}}
        </v-card-title>
        <v-card-title >
            {{ project.itemsId[0].warranty}}
        </v-card-title>
        <v-card-title >
            {{ project.notesId[0].headerText}}
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6" md="5">
        <Create-item />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateItem from "../components/CreateItem.vue";
import QuickStart from "../components/QuickStart.vue";

export default {
  namespaced: true,
  name: "Project",
  data: () => ({}),
  components: {
    QuickStart,
    CreateItem,
  },
  methods: {
      log(message) {
          console.log(message)
      }
  },
  computed: {
    projects() {
      return this.$store.getters["PROJECT/getProjects"];
    },
    project() {
      return this.$store.getters["PROJECT/getProject"](
        "5ffc4acf88b8de25c4ee87a7"
      );
    },
  },
};
</script>

<style>
.home {
  height: 100%;
}
</style>
