<template>
<div class="text-center">
    <v-card class="mx-auto mt-2 px-1" color="base">
      <v-card-title placeholder="test">
        Lägg till rum i {{house.houseName}}
      </v-card-title>

      <v-text-field
        label="Namn"
        v-model="roomName"
        :rules="rules"
        placeholder="Skriv in namnet på rummet"
      >
      </v-text-field>

      <v-text-field
        label="Storlek"
        v-model="roomSize"
        :rules="rules"
        placeholder="Husets storlek i kvm"
      >
      </v-text-field>
      <v-text-field
        label="Höjd"
        v-model="roomHeight"
        :rules="rules"
        placeholder="Rummets höjd"
      ></v-text-field>
      <v-card-actions>
        <v-btn @click="createRoomHandler">
          Skapa rum
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "CreateRoom",
  data: () => ({
    roomName: "",
    roomSize: "",
    roomHeight: "",
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    dialog: false
  }),
  computed: {
    house() {
      return this.$store.getters["HOUSE/getHouse"];
    },
  },
  methods: {
    async createRoomHandler() {
      const newRoomObject = {
        houseId: this.house._id,
        roomName: this.roomName,
        roomSize: this.roomSize,
        roomHeight: this.roomHeight
      };
      await this.$store.dispatch("ROOM/createRoom", newRoomObject);
      await this.$store.dispatch(
        "HOUSE/addRoomToHouse",
        this.$store.getters["ROOM/getRoom"]._id
      );
      await this.$store.dispatch(
        "HOUSE/updateHouse",
        this.$store.getters["HOUSE/getHouse"]
      );
      await this.$store.dispatch("HOUSE/setHouseFromDb",  this.$store.getters["HOUSE/getHouse"]._id);
      await this.$store.dispatch("HOUSE/setHouses")
      this.$store.dispatch("ROOM/computedRooms", this.$store.getters["HOUSE/getHouse"]._id);
      this.$emit('close-dialog')
     
      
    },
  },
};
</script>