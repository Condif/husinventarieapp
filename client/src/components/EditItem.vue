<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto mt-2" color="base">
      <v-card-title>
        Lägg till inventarie </v-card-title
      >

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
        :placeholder="item.projectId"
        persistent-hint
        single-line
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
      <ImageUploader />
      <v-card-actions>
        <v-btn @click="saveItem" color="accent2">
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
mounted() {
this.item.projectId= this.project.projectName
},

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
      );
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    saveItem() {
      console.log("test", this.item.projectId);
    },
    async updateItemHandler() {
      const updatedItemObject = {
        _id: this.$store.getters["ITEMS/getItem"]._id,
        itemName: this.itemName,
        imageId: this.$store.getters["IMAGE/getImage"]._id,
        description: this.description,
        orderDate: this.orderDate,
        warranty: this.warranty,
      };
      console.log("itemobjekt" + JSON.stringify(updatedItemObject));
      await this.$store.dispatch("ITEMS/updateItem", updatedItemObject);
      await this.$store.dispatch(
        "PROJECT/addItemToProject",
        this.$store.getters["ITEMS/getItem"]._id
      );
      await this.$store.dispatch(
        "PROJECT/updateProject",
        this.$store.getters["PROJECT/getProject"]
      );
      await this.$store.dispatch("PROJECT/setProjects");
    },
  },
};
</script>

<style></style>
