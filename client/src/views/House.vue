<template>
  <v-container fluid>
    <Quick-start />
    <v-row>
      <v-select v-if="houses !== undefined || houses !== null"
        v-model="currentHouseId"
        v-on:change="goToHouseHandler(currentHouseId)"
        prepend-icon="mdi-calendar-check-outline"
        :items="houses.map((house) => house)"
        item-text="houseName"
        item-value="_id"
        :placeholder="house.houseName"
      ></v-select>
      <v-col cols="12" sm="6" md="8">
        <v-card class="mx-auto" color="base" v-if="house !== undefined">
          <v-expansion-panels
            v-for="room in house.rooms"
            :key="room._id"
            focusable
          >
            <v-expansion-panel>
              <v-expansion-panel-header>{{
                room.roomName
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Höjd till tak: {{ room.roomHeight }}</p>
                <p>Antal kvadratmeter {{ room.roomSize }}</p>
                <!-- {{room}} -->
                <div class="items">
                  <h5>Inventarier</h5>
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="item in room.items"
                      :key="item._id"
                    >
                      <v-expansion-panel-header>
                        {{ item.itemName }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <p>Beskrivning</p>
                        {{ item.description }}
                        <v-btn @click="goToItemHandler(item)"
                          >Visa inventariet</v-btn
                        >
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>

                <div class="projects">
                  <h5>Projekt</h5>
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(project, i) in room.projects"
                      :key="i"
                    >
                      <v-expansion-panel-header>
                        {{ project.projectName }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        {{ project.description }}

                        <v-btn @click="goToProjectHandler(project)"
                          >Gå till projektet</v-btn
                        >
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-col>
      <v-btn to="/createRoom">Skapa rum</v-btn>
    </v-col>
  </v-container>
</template>

<script>
import QuickStart from "../components/QuickStart.vue";

export default {
  data() {
    return {
      // items: ["Olvonvägen 47", "Sommarstugan"],
      currentHouseId: {},
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
  },

  methods: {
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
      const currentHouse = this.$store.getters["HOUSE/getHouseFromHouses"](currentHouseId)
      localStorage.setItem("currentHouse", JSON.stringify(currentHouse))
      this.$store.dispatch("HOUSE/setHouse", currentHouse)
    },
  },

  computed: {
    // rooms() {
    //   return this.$store.getters["ROOM/getRooms"];
    // },
    houses() {
      return this.$store.getters["HOUSE/getHouses"];
    },
    house() {
      return this.$store.getters["HOUSE/getHouse"];
    },
  },
};
</script>

<style>
.home {
  height: 100%;
}
</style>
