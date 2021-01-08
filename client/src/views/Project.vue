<template>
  <v-sheet
    id="scrolling-techniques-7"
    class="overflow-y-auto"
    max-height="100%"
  >
    <v-card class="mx-auto mt-2" max-width="344">
      <v-card-title placeholder="test">
        Skapa nytt projekt
      </v-card-title>

      <v-card-subtitle color="error" text>
        Datum: 2021-01-02
      </v-card-subtitle>

      <v-text-field
        label="Namn"
        v-model="projectName"
        :rules="rules"
        placeholder="Skriv in namnet på ditt projekt"
      >
      </v-text-field>
      <v-textarea
        label="Description"
        v-model="description"
        :rules="rules"
      ></v-textarea>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <v-icon expand_more></v-icon>
            <span>Rum: {{room}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(room, index) in rooms" :key="index" @click="addRoomToState(room)">
            <v-list-item-title>{{ room }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-card-actions>
        <v-btn @click="createProjectHandler">
          Skapa projekt
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Project",
  data: () => ({
    projectName: "",
    imageId: "5ed612ec6aaf5cd950517f93",
    description: "",
    room: "",
    category: "",
    items: [],

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    show: false,
    rooms: ["Badrum", "Sovrum", "Kök"],
  }),
  methods: {
    async createProjectHandler() {
      const newProjectObject = {
        projectName: this.projectName,
        imageId: this.imageId,
        description: this.description,
        roomId: this.roomId,
        category: this.category,
        items: this.items,
      };
      this.$store.dispatch("PROJECT/createProject", newProjectObject);
    },
    addRoomToState(room) {
      this.room = room
    }
  },
};
</script>
