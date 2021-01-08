<template>
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
</template>

<script>

export default {
  name: "CreateRoom",
  data: () => ({
    houseId: "5fec43c4cceaaf1f07ed3268",
    roomName: "Kök",
    roomSize: "35",
    roomHeight: "2.40",
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  methods: {
    async createRoomHandler() {
      const newRoomObject = {
        houseId: this.houseId,
        roomName: this.roomName,
        roomSize: this.roomSize,
        roomHeight: this.roomHeight
      };
      this.$store.dispatch("ROOM/createRoom", newRoomObject);
    },
  },
};
</script>