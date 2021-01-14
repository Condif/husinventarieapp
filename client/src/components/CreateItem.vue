<template>
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
</template>

<script>
import ImageUploader from "./ImageUploader.vue";
export default {
  components: { ImageUploader },
  name: "CreatItem",
  data: () => ({
    itemName: "",
    imageId: "5ed612ec6aaf5cd950517f93",
    description: "",
    orderDate: "",
    warranty: "",

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  methods: {
    async createItemHandler() {
      const newItemObject = {
        itemName: this.itemName,
        imageId: this.imageId,
        description: this.description,
        orderDate: this.orderDate,
        warranty: this.warranty,
      };
      this.$store.dispatch("ITEMS/createItem", newItemObject);
    },
  },
};
</script>

<style></style>
