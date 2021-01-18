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
              <v-expansion-panel-header>{{ room }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
      rooms: ["sovrum", "kök", "vardagsrum", "toalett"],
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
};
</script>

<style>
.home {
  height: 100%;
}
</style>
