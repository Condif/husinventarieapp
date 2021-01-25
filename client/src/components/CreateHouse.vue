<template>
  <v-sheet
    id="scrolling-techniques-7"
    class="overflow-y-auto"
    max-height="100%"
  >
    <v-card class="mx-auto mt-2" max-width="344">
      <v-card-title placeholder="test">
        Skapa nytt hus
      </v-card-title>

      <v-card-subtitle color="error" text>
        Datum: 2021-01-02
      </v-card-subtitle>

      <v-text-field
        label="Namn"
        v-model="houseName"
        :rules="rules"
        placeholder="Skriv in namnet på ditt hus"
      >
      </v-text-field>
      <v-text-field
        label="House size"
        v-model="houseSize"
      ></v-text-field>
      <v-text-field
        label="Number of rooms"
        v-model="numberOfRooms"
      ></v-text-field>
      <v-card-actions>
        <v-btn @click="createHouseHandler">
          Skapa hus
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CreateHouse",
  data: () => ({
    houseName: "",
    houseSize: "",
    numberOfRooms:"",
    houseCategory: "",
    rooms: [],
    projects: [],

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  methods: {
    async createHouseHandler() {
      const newHouseObject = {
        houseName: this.houseName,
        houseCategory: this.houseCategory,
        houseSize: this.houseSize,
        numberOfRooms: this.numberOfRooms,
        rooms: this.rooms,
        projects: this.projects
      };
      this.$store.dispatch("HOUSE/createHouse", newHouseObject);
    },
  },
};
</script>
