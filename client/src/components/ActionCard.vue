<template>
  <v-card
    max-width="900"
    class="mx-auto pt-2 d-flex justify-space-around align-center flex-wrap"
    color="primary"
    height="20rem"
  >
    <!-- <router-link to="CreateProject" tag="div" class="project_button">
      <div class="inside_div">
        <h3>Skapa ditt projekt</h3>
      </div>
    </router-link> -->
    <v-dialog v-model="dialogProject">
      <template v-slot:activator="{ on }">
        <div v-on="on" class="project_button">
          <div class="inside_div">
            <h3>Skapa ditt projekt</h3>
          </div>
        </div>
      </template>
      <CreateProject @close-dialog="closeDialogProject" />
    </v-dialog>

    <v-dialog v-model="dialogInventory">
      <template v-slot:activator="{ on }">
        <div v-on="on" class="inventory_button">
          <div class="inside_div">
            <h3>Lägg till inventarie</h3>
          </div>
        </div>
      </template>
      <CreateItem @close-dialog="closeDialogInventory" />
    </v-dialog>

    <!-- <v-btn class="btn" color="accent2">Skapa Projekt</v-btn>
        <v-btn class="btn" color="accent2">Lägg till inventarie</v-btn> -->
  </v-card>
</template>
<script>
import CreateItem from "../components/CreateItem";
import CreateProject from "../components/CreateProject";
export default {
  name: "ActionCard",
  data: () => ({
    dialogProject: false,
    dialogInventory: false,
    
  }),
  components: { CreateItem, CreateProject },
  methods: {
    closeDialogProject() {
      this.dialogProject = false;
    },
    closeDialogInventory() {
      this.dialogInventory = false;
    },
    },
};
</script>
<style scoped>
.project_button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45%;
  width: 45%;
  min-width: 20rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url("../assets/projectbutton.jpg");
  background-size: 100%;
  border: solid #8a9ea798 2px;
}
.inventory_button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45%;
  width: 45%;
  min-width: 20rem;
  border: solid #8a9ea798 2px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url("../assets/window.jpg");
  background-size: 100%;
}
.project_button:hover {
  border: solid black 3px;
}
.project_button:active {
  border: solid #8a9ea798 6px;
}
.inventory_button:hover {
  border: solid black 3px;
}
.inventory_button:active {
  border: solid #8a9ea798 6px;
}

h3 {
  padding: 0 5px;
  font-size: 24px;
  color: white;
}

@media screen and (min-width: 720px) {
  .project_button {
    height: 85%;
    width: 45%;
    min-width: 20rem;

    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
      url("../assets/projectbutton.jpg");
    background-size: 130%;
  }
  .inventory_button {
    height: 85%;
    width: 45%;
    min-width: 20rem;

    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
      url("../assets/window.jpg");
    background-size: 130%;
  }

  h3 {
    padding: 0 10px;
    font-size: 36px;
    color: white;
  }
}
</style>
