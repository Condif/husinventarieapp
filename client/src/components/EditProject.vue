<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="storeOldId">
        <v-icon color="secondary">mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto mt-2" color="base">
      <v-card-title> Ändra i ditt Projekt </v-card-title>

      <v-text-field
        label="Namn"
        v-model="project.projectName"
        :rules="rules"
        placeholder="Namn på projektet"
      >
      </v-text-field>
      <v-text-field
        label="Kategori"
        v-model="project.category"
        :rules="rules"
        placeholder="kategori"
      >
      </v-text-field>

      <v-textarea
        label="Beskriving"
        v-model="project.description"
        :rules="rules"
      ></v-textarea>

      <v-select
        v-model="project.itemsId"
        prepend-icon="mdi-calendar-check-outline"
        :items="items.map((item) => item)"
        item-text="projectName"
        item-value="_id"
        :placeholder="item.itemName"
      ></v-select>

      <v-select
        v-model="project.roomId"
        prepend-icon="mdi-home-city"
        :items="rooms.map((room) => room)"
        item-text="roomName"
        item-value="_id"
        :placeholder="project.roomId"
      ></v-select>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
      </v-menu>
      <v-img
        class="mb-2"
        contain
        :lazy-src="image"
        :src="image"
        max-height="100 "
      ></v-img>
      <ImageUploader />
      <FileUploader />
      <div v-if="project.fileId">
        <v-icon>mdi-arrow-up-bold-box-outline</v-icon>{{ project.fileId }}
      </div>
      <v-card-actions>
        <v-btn @click="updateProjectHandler" color="accent2">
          Spara
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ImageUploader from "./ImageUploader.vue";
import FileUploader from "./FileUploader.vue";
export default {
  components: { ImageUploader, FileUploader },
  name: "EditProject",

  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    
    menu: false,
    inputField: false,
    dialog: false,
  }),

  computed: {
  
    items() {
      return this.$store.getters["ITEMS/getItems"];
    },
    image() {
      return "api/images/" + this.$store.getters["ITEMS/getItem"].imageId;
    },

    projects() {
      return this.$store.getters["PROJECT/getProjects"];
    },
    project() {
      return this.$store.getters["PROJECT/getProject"];
    },

    item() {
      return this.$store.getters["ITEMS/getItemFromItems"](
        this.project.itemId
      ) !== undefined
        ? this.$store.getters["ITEMS/getItemFromItems"](
            this.project.itemId
          )
        : [];
    },
    rooms() {
      return this.$store.getters["ROOM/getRooms"];
    },
    room() {
      return this.$store.getters["ROOM/getRoomFromRooms"](this.item.roomId);
    },
  },
  methods: {
    async storeOldId() {
      await this.$store.commit("PROJECT/setOldProject", this.project);
      await this.$store.commit("IMAGE/setOldImage", this.project.imageId);
      await this.$store.commit("FILE/setOldFile", this.project.fileId);
    },

   

    async updateProjectHandler() {
      const updatedProjectObject = {
        _id: this.project._id,
        projectName: this.project.projectName,
        imageId: this.$store.getters["IMAGE/getImage"],
        description: this.project.description,
        category: this.project.category,
        fileId: this.$store.getters["FILE/getFile"]._id,
        itemsId: this.project.itemsId,
        roomId: this.item.roomId,
      };
      await this.$store.dispatch("PROJECT/updateProject", updatedProjectObject);
      await this.$store.dispatch(
        "IMAGE/updateImage",
        updatedProjectObject.imageId
      );
      localStorage.setItem(
        "currentProject",
        JSON.stringify(this.$store.getters["PROJECT/getProject"])
      );
      await this.$store.dispatch("FILE/updateFile", updatedProjectObject.fileId);
      await this.$store.dispatch("ITEMS/setItem", this.item);

      await this.$store.dispatch(
        "ITEMS/moveProjectToItems",
        this.$store.getters["ITEMS/getItem"]._id
      );

      this.dialog = false;
    },
  },
};
</script>

<style></style>
