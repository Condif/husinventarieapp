<template>
  <div class="text-center">
    <v-card class="mx-auto mt-2 px-1" color="base">
      <v-card-title placeholder="test">
        Lägg till projekt
      </v-card-title>

      <v-text-field
        label="Namn"
        v-model="projectName"
        :rules="rules"
        placeholder="Skriv in namnet på projektet"
      >
      </v-text-field>

      <v-text-field
        label="Beskrivning"
        v-model="description"
        :rules="rules"
        placeholder="Beskriv projektet"
      >
      </v-text-field>
      <v-textarea
        label="Kategori"
        v-model="category"
        :rules="rules"
        placeholder="Välj kategori för projektet"
      ></v-textarea>
      <v-select
        v-if="rooms !== undefined"
        v-model="selectedRoomId"
        prepend-icon="mdi-home-city"
        :items="rooms.map((room) => room)"
        item-text="roomName"
        item-value="_id"
        placeholder="Välj rum"
      ></v-select>
      <ImageUploader />
      <v-card-actions>
        <v-btn @click="createProjectHandler">
          Skapa projekt
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageUploader from "./ImageUploader.vue";
export default {
  name: "CreateProject",
  components: { ImageUploader },
  data: () => ({
    projectName: "",
    imageId: "",
    description: "",
    category: "",
    selectedRoomId: undefined,

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  methods: {
    async createProjectHandler() {
      const newProjectObject = {
        projectName: this.projectName,
        imageId: this.$store.getters["IMAGE/getImage"]._id,
        description: this.description,
        roomId: this.project.roomId,
        category: this.category,
        itemsId: this.selectedItemId,
      };
      await this.$store.dispatch("ROOM/setRoom", this.room);
      await this.$store.dispatch("PROJECT/createProject", newProjectObject);
      await this.$store.dispatch(
        "ROOM/addProjectToRoom",
        this.$store.getters["PROJECT/getProject"]._id
      );
      if(this.$store.getters["ROOM/getRoom"].length !== 0) {
        await this.$store.dispatch(
          "ROOM/updateRoom",
          this.$store.getters["ROOM/getRoom"]
        );
      }
      await this.$store.dispatch("ROOM/setRooms");
      this.$emit('close-dialog')
    },
  },
  computed: {
    items() {
      return this.$store.getters["ITEMS/getItems"];
    },
    room() {
      return this.$store.getters["ITEMS/getRoomFromRooms"](
        this.selectedRoomId
      ) !== undefined
        ? this.$store.getters["ITEMS/getRoomFromRooms"](this.selectedRoomId)
        : [];
    },
    rooms() {
      return this.$store.getters["ROOM/getRooms"];
    },
  },
};
</script>
