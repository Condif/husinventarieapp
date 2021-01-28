<template>
  <v-container fluid class="py-16" min-width="300">
    <Quick-start />
    <v-row>
      <v-col sm="12" order-md="1" color="secondary">
        <v-card
          class="mx-auto mt-2 px-1 "
          color="primary"
          max-width="900"
          min-width="280"
        >
          <v-card-title class="mb-2">
            <h1>Mitt Boende</h1>
          </v-card-title>
          <v-select
            filled
            rounded
            class="selectHouse"
            v-if="houses"
            v-model="currentHouseId"
            v-on:change="goToHouseHandler(currentHouseId)"
            prepend-icon="mdi-calendar-check-outline"
            :items="houses.map((house) => house)"
            item-text="houseName"
            item-value="_id"
            :placeholder="placeholderText"
          ></v-select>
          <v-col cols="12">
              <v-expansion-panels
                v-for="room in computedRooms"
                :key="room._id"
                popout
                color="primary"
                class="pb-1"
              >
                <v-expansion-panel>
                  <v-expansion-panel-header color="primary">{{
                    room.roomName
                  }}</v-expansion-panel-header>
                  <v-expansion-panel-content color="primary" >
                    <p>Höjd till tak: {{ room.roomHeight }}</p>
                    <p>Antal kvadratmeter {{ room.roomSize }}</p>
                    <div class="projects">
                      <h5>Projekt</h5>
                      <v-expansion-panels popout color="primary" class="mt-2">
                        <v-expansion-panel
                          v-for="project in room.projects"
                          :key="project._id"
                        >
                          <v-expansion-panel-header color="primary">
                            {{ project.projectName }}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content color="primary">
                            <p>Beskrivning</p>
                            {{ project.description }}
                            <div class="btn_div">
                              <v-btn
                                class="align-self-center"
                                fab
                                color="accent2"
                                @click="goToProjectHandler(project)"
                                ><v-icon color="white"
                                  >mdi-arrow-right</v-icon
                                ></v-btn
                              >
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                    <div class="items">
                      <h5>Inventarier</h5>
                      <v-expansion-panels popout color="primary" class="mt-2">
                        <v-expansion-panel
                          v-for="item in room.items"
                          :key="item._id"
                        >
                          <v-expansion-panel-header color="primary">
                            {{ item.itemName }}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content color="primary">
                            <p>Beskrivning</p>
                            {{ item.description }}
                            <div class="btn_div">
                              <v-btn
                                class="align-self-center"
                                fab
                                color="accent2"
                                @click="goToItemHandler(item)"
                                ><v-icon color="white"
                                  >mdi-arrow-right</v-icon
                                ></v-btn
                              >
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

    <v-card
      max-width="900"
      class="mx-auto pt-2 mt-4 d-flex justify-space-around align-center flex-wrap"
      color="primary"
      height="20rem"
    >
      <v-dialog v-model="dialogHouse" max-width="800">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="house_button">
            <div class="inside_div">
              <h3 class="skapa_hus_title">Skapa hus</h3>
            </div>
          </div>
        </template>
        <CreateHouse @close-dialog="closeDialogHouse" />
      </v-dialog>
      <v-dialog v-model="dialogRoom" max-width="800">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="room_button">
            <div class="inside_div">
              <h3 class="skapa_hus_title">Skapa Rum</h3>
            </div>
          </div>
        </template>
        <CreateRoom @close-dialog="closeDialogRoom" />
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import QuickStart from "../components/QuickStart.vue";
import CreateRoom from "../components/CreateRoom.vue";
import CreateHouse from "../components/CreateHouse.vue";

export default {
  data() {
    return {
      currentHouseId: this.$store.getters["HOUSE/getHouse"],
      dialogRoom: false,
      dialogHouse: false,
      placeholderText: "Välj hus att visa",

      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  name: "Home",
  components: {
    QuickStart,
    CreateHouse,
    CreateRoom,
  },

  methods: {
    closeDialogRoom() {
      this.dialogRoom = false;
    },
    closeDialogHouse() {
      this.dialogHouse = false;
    },
    log(message) {
      console.log(message);
    },
    goToProjectHandler(selectedProject) {
      this.$store.dispatch("PROJECT/setProject", selectedProject);
      localStorage.setItem("currentProject", JSON.stringify(selectedProject));
      this.$router.push("Project");
    },
    // Måste testas
    goToItemHandler(selectedItem) {
      this.$store.dispatch("ITEMS/setItem", selectedItem);
      localStorage.setItem("currentItem", JSON.stringify(selectedItem));
      this.$router.push("Item");
    },
    goToHouseHandler(currentHouseId) {
      const currentHouse = this.$store.getters["HOUSE/getHouseFromHouses"](
        currentHouseId
      );
      localStorage.setItem("currentHouse", JSON.stringify(currentHouse));
      this.$store.dispatch("HOUSE/setHouse", currentHouse);
      this.$store.dispatch("ROOM/computedRooms", currentHouseId);
    },
  },

  computed: {
    houses() {
      return this.$store.getters["HOUSE/getHouses"];
    },
    house() {
      return this.$store.getters["HOUSE/getHouse"];
    },
    computedRooms() {
      return this.$store.getters["ROOM/getComputedRooms"];
    },
  },
};
</script>

<style>
.home {
  height: 100%;
}
.skapa_hus_title {
  color: white;
}
.house_button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  width: 13rem;
  min-width: 20rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url("../assets/bluehouse.jpg");
  background-size: 100%;
  border: solid #8a9ea798 2px;
}
.room_button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  width: 13rem;
  min-width: 20rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url("../assets/room.jpg");
  background-size: 100%;
  border: solid #8a9ea798 2px;
}
.btn_div {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.items {
  margin-top: 1rem;
  margin-left: 3px;
}

.selectHouse {
  width: 50%;
  min-width: 300px;
}

@media screen and (min-width: 720px) {
  .house_button {
    height: 85%;
    width: 45%;
    min-width: 20rem;

    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
      url("../assets/bluehouse.jpg");
    background-size: 130%;
  }
  .room_button {
    height: 85%;
    width: 45%;
    min-width: 20rem;

    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
      url("../assets/room.jpg");
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
  .skapa_hus_title {
  padding: 0 5px;
  font-size: 24px;
  color: white;
}
}
</style>
