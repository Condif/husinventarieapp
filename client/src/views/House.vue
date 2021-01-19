<template>
  <v-container fluid>
    <Quick-start />
    <v-row>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="items" :label="items[0]" solo></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-card class="mx-auto" color="base">
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="(room, i) in rooms" :key="i">
              <v-expansion-panel-header>{{
                room.roomName
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Höjd till tak:{{ room.roomHeigt }}</p>
                <p>Antal kvadratmeter {{ room.roomSize }}</p>
                <!-- {{room}} -->
                <div class="items">
                  <h5>Inventarier</h5>
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(item, i) in room.items" :key="i">
                      <v-expansion-panel-header>
                        {{ item.itemName }}
                       
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <p>Beskrivning</p>
                        {{ item.description }}
                         <v-btn @click="goToItemHandler(item)">Visa inventariet</v-btn>
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
                       
                       
                        <v-btn @click="goToProjectHandler(project)">Gå till projektet</v-btn>
                     
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
  </v-container>
</template>

<script>
import QuickStart from "../components/QuickStart.vue";

export default {
  data() {
    return {
      items: ["Olvonvägen 47", "Sommarstugan"],

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
      this.$store.dispatch("PROJECT/setProject", selectedProject)
      localStorage.setItem("currentProject", JSON.stringify(selectedProject))
      this.$router.push('Project')
    },


// Måste testas
    goToItemHandler(selectedItem) {
      this.$store.dispatch("ITEMS/setItem", selectedItem)
      localStorage.setItem("currentItem", JSON.stringify(selectedItem))
      this.$router.push('Item')
    }
  },

  computed: {
    rooms() {
      return this.$store.getters["ROOM/getRooms"];
    },
  },
};
</script>

<style>
.home {
  height: 100%;
}
</style>
