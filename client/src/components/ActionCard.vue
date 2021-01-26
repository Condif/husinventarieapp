<template>
  <v-card
    max-width="900"
    class="mx-auto pt-2 d-flex justify-space-around align-center flex-column"
    color="base"
    height="20rem"
  >
    <!-- <router-link to="CreateProject" tag="div" class="project_button">
      <div class="inside_div">
        <h3>Skapa ditt projekt</h3>
      </div>
    </router-link> -->
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <div v-on="on" class="project_button">
          <div class="inside_div">
            <h3>Skapa ditt projekt</h3>
          </div>
        </div>
      </template>
      <CreateProject @close-dialog="closeDialog" />
    </v-dialog>

    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <div v-on="on" class="inventory_button">
          <div class="inside_div">
            <h3>Skapa inventarie</h3>
          </div>
        </div>
      </template>
      <CreateItem @close-dialog="closeDialog" />
    </v-dialog>

    <!-- <v-btn class="btn" color="accent2">Skapa Projekt</v-btn>
        <v-btn class="btn" color="accent2">Lägg till inventarie</v-btn> -->
  </v-card>
</template>
<script>
import CreateItem from "../components/CreateItem";
export default {
  name: "ActionCard",
  data: () => ({
    dialog: false,
  }),
  components: { CreateItem },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
.btn {
  width: 13rem;
}
.project_button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  width: 20rem;
  background-image: url("../assets/projectbutton.jpg");
  background-size: 100%;
  border: solid black 1px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
.inventory_button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  width: 20rem;
  border: solid black 1px;
  background-image: url("../assets/window.jpg");
  background-size: 100%;
}

.inside_div {
  height: 2rem;
  background: #8a9ea798;
}
</style>
