<template>
  <v-container fluid v-if="project !== undefined">
    <Quick-start />
    <v-row>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-for="item in project.itemsId"
          :key="item._id"
          solo
        ></v-select>
      </v-col>
      <v-card class="mx-auto pt-2" color="primary">
        <v-card-title>
          {{ project.projectName }}
        </v-card-title>

        <v-card-subtitle text>
          2021-01-02 En massa kablar och annat bös
        </v-card-subtitle>
        <v-img
          height="200"
          src="../assets/chris-briggs-ILBrHd6PFJA-unsplash.jpg"
        ></v-img>
        <v-card-title>
          {{ project.description }}
        </v-card-title>
        <v-card-title v-if="project.roomId">
          {{ project.roomId.roomName }}
        </v-card-title>
        <v-card-title v-if="project.category">
          {{ project.category }}
        </v-card-title>
      </v-card>
      <transition-group name="slide" v-for="item in project.itemsId" :key="item._id">
              <v-btn :key="item._id" @click="goToItemHandler(item._id)">{{
                item.itemName
              }}</v-btn>
              <v-btn :key="item._id + 1"  @click="deleteItemHandler(item._id)">
                papperskorg
              </v-btn>
      </transition-group>
    </v-row>
    <v-row>
      <v-col color="secondary">
        <v-card> </v-card>
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
      console.log(message);
    },
    goToItemHandler(selectedItemId) {
      this.$store.dispatch("ITEMS/setItem", selectedItemId);
      localStorage.setItem("currentItemId", JSON.stringify(selectedItemId));
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

<style>
.home {
  height: 100%;
}
</style>
