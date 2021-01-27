<template>
<v-row>
    <v-dialog v-model="dialog"  max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          skapa nytt rum
        </v-btn>
      </template>
      <v-card>
  <v-sheet
    id="scrolling-techniques-7"
    class="overflow-y-auto"
    max-height="100%"
  >
    <v-card class="mx-auto mt-2" max-width="344">
      <v-card-title placeholder="test">
        Skapa nytt rum
      </v-card-title>

      <v-card-subtitle color="error" text>
        Datum: 2021-01-02
      </v-card-subtitle>

      <v-text-field
        label="Namn"
        v-model="roomName"
        :rules="rules"
        placeholder="Skriv in namnet på ditt projekt"
      >
      </v-text-field>
      <v-textarea
        label="Room size"
        v-model="roomSize"
        :rules="rules"
      ></v-textarea>
      <v-textarea
        label="Room height"
        v-model="roomHeight"
        :rules="rules"
      ></v-textarea>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" >
            <span>Rum: {{room}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(room, index) in rooms" :key="index" @click="addRoomToState(room)">
            <v-list-item-title>{{ room }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-card-actions>
        <v-btn @click="createRoomHandler">
          Skapa rum
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-sheet>
  </v-card>
    </v-dialog>
  </v-row>
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
  methods: {
    async createRoomHandler() {
      const newRoomObject = {
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
     
      this.dialog = false
    },
  },
};
</script>