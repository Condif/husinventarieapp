<template>
  <div class="text-center">
    <v-card class="mx-auto mt-2 px-1" color="base">
      <v-card-title placeholder="test">
        Skapa nytt hus
      </v-card-title>

      <v-text-field
        label="Namn"
        v-model="houseName"
        :rules="rules"
        placeholder="Skriv in namnet på ditt hus"
      >
      </v-text-field>
      <v-text-field
        label="Storlek"
        v-model="roomSize"
        placeholder="Ange husets storlek i kvm"
      >
      </v-text-field>
      <v-text-field
        label="Husets storlek"
        v-model="houseSize"
        placeholder="Ange husets area"
      ></v-text-field>
      <v-text-field
        label="Antal rum"
        v-model="numberOfRooms"
        placeholder="Ange antal rum"
      ></v-text-field>
      <v-card-actions>
        <v-btn @click="createHouseHandler">
          Skapa rum
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CreateHouse",
  data: () => ({
    houseName: "",
    houseSize: "",
    numberOfRooms: "",
    houseCategory: "",
    rooms: [],
    projects: [],

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    dialog: false,
  }),
  methods: {
    async createHouseHandler() {
      const newHouseObject = {
        houseName: this.houseName,
        houseCategory: this.houseCategory,
        houseSize: this.houseSize,
        numberOfRooms: this.numberOfRooms,
        rooms: this.rooms,
        projects: this.projects,
      };
      this.$store.dispatch("HOUSE/createHouse", newHouseObject);
      this.diaolg = false;
    },
  },
};
</script>
