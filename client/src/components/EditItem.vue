<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="storeOldId">
        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto mt-2" color="base">
      <v-card-title> Lägg till inventarie </v-card-title>

      <v-text-field
        label="Namn"
        v-model="item.itemName"
        :rules="rules"
        placeholder="itemName"
      >
      </v-text-field>

      <v-text-field
        label="Garanti"
        v-model="item.warranty"
        :rules="rules"
        placeholder="Hur många års garanti har produkten"
      >
      </v-text-field>
      <v-textarea
        label="Beskriving"
        v-model="item.description"
        :rules="rules"
      ></v-textarea>

      <v-select
        v-model="item.projectId"
        prepend-icon="mdi-calendar-check-outline"
        :items="projects.map((project) => project)"
        item-text="projectName"
        item-value="_id"
        :placeholder="project.projectName"
      ></v-select>

      <v-select
        v-model="item.roomId"
        prepend-icon="mdi-home-city"
        :items="rooms.map((room) => room)"
        item-text="roomName"
        item-value="_id"
        :placeholder="item.roomId"
      ></v-select>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="item.orderDate"
            label="Inköpsdatum"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="item.orderDate"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
        ></v-date-picker>
      </v-menu>
      <v-img
        class="mb-2"
        contain
        :lazy-src="image"
        :src="image"
        max-height="100 "
      ></v-img>
      <ImageUploader />
      <v-card-actions>
        <v-btn @click="updateItemHandler" color="accent2">
          Spara
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ImageUploader from "./ImageUploader.vue";
export default {
  components: { ImageUploader },
  name: "UpdateItem",

  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    date: null,
    menu: false,
    inputField: false,
    dialog: false,
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  computed: {
    item() {
      return this.$store.getters["ITEMS/getItem"];
    },
    image() {
      return "api/images/" + this.$store.getters["ITEMS/getItem"].imageId;
    },

    projects() {
      return this.$store.getters["PROJECT/getProjects"];
    },

    project() {
      return this.$store.getters["PROJECT/getProjectFromProjects"](
        this.item.projectId
      ) !== undefined
        ? this.$store.getters["PROJECT/getProjectFromProjects"](
            this.item.projectId
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
      console.log("skicka gamla porjektet store", this.project);
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    async updateItemHandler() {
      const updatedItemObject = {
        _id: this.item._id,
        itemName: this.item.itemName,
        imageId: this.$store.getters["IMAGE/getImage"]._id,
        description: this.item.description,
        orderDate: this.item.orderDate,
        warranty: this.item.warranty,
        projectId: this.item.projectId,
        roomId: this.item.roomId,
      };
      console.log("itemobjekt" + JSON.stringify(updatedItemObject));
      //updatera item-state
      await this.$store.dispatch("ITEMS/updateItem", updatedItemObject);

      //Updatera projekt med nytt Item ej om oförändrat
      // ta bort item från projekt
      await this.$store.dispatch("PROJECT/setProject", this.project);
      console.log("this.project", this.project);
      // if (this.project.itemsId === this.$store.getters["Pro"].itemsId) {

      // }

      // if (this.project.itemsId.length === 0 ) {
      //   console.log("tom lista");

      //   this.$store.commit("PROJECT/addItemToProject", this.$store.getters["ITEMS/getItem"]._id)
      //   this.$store.dispatch("PROJECT/updateProject", this.$store.getters["PROJECT/getProject"])
      // } else
      // console.log(this.project.itemsId, " de finns något");

      await this.$store.dispatch(
        "PROJECT/addItemToProject",
        this.$store.getters["ITEMS/getItem"]._id
      );

      //Uppdatera rum om förändrat
      //

      // await this.$store.dispatch(
      //   "PROJECT/updateProject",
      //   this.$store.getters["PROJECT/getProject"]
      // );
      // await this.$store.dispatch("PROJECT/setProjects");
      this.dialog = false;
    },
  },
};
</script>

<style></style>
