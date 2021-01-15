<template>
  <div class="text-center">
    <!-- <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template> -->

      <v-card class="mx-auto mt-2" color="base">
        <v-card-title placeholder="test">
          Lägg till inventarie
        </v-card-title>

        <v-card-subtitle color="error" text>
          Datum: 2021-01-02
        </v-card-subtitle>

        <v-text-field
          label="Namn"
          v-model="itemName"
          :rules="rules"
          placeholder="Skriv in namnet på inventariet"
        >
        </v-text-field>
        <v-text-field
          label="Inköpsdatum"
          v-model="orderDate"
          :rules="rules"
          placeholder="Skriv in när du köpte produkten"
        >
        </v-text-field>
        <v-text-field
          label="Garanti"
          v-model="warranty"
          :rules="rules"
          placeholder="Hur många års garanti har produkten"
        >
        </v-text-field>
        <v-textarea
          label="Beskriving"
          v-model="description"
          :rules="rules"
        ></v-textarea>
        <ImageUploader />
        <v-card-actions>
          <v-btn @click="createItemHandler" color="accent2">
            Spara
          </v-btn>
        </v-card-actions>
      </v-card>
    <!-- </v-dialog> -->
  </div>
</template>

<script>
import ImageUploader from "./ImageUploader.vue";
export default {
  components: { ImageUploader },
  name: "CreatItem",
  data: () => ({
    itemName: "",

    description: "",
    orderDate: "",
    warranty: "",

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],

    dialog: false,
  }),

  methods: {
    async createItemHandler() {
      const newItemObject = {
        itemName: this.itemName,
        imageId: this.$store.getters["IMAGE/getImage"]._id,
        description: this.description,
        orderDate: this.orderDate,
        warranty: this.warranty,
      };
      console.log("new itemobjekt hätr" + JSON.stringify(newItemObject));
      await this.$store.dispatch("ITEMS/createItem", newItemObject);
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
