<template>
  <div class="text-center">
    <v-card class="mx-auto mt-2" color="base">
      <v-card-title placeholder="test">
        Lägg till inventarie
      </v-card-title>

      <v-text-field
        label="Namn"
        v-model="itemName"
        :rules="rules"
        placeholder="Skriv in namnet på inventariet"
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
            v-model="orderDate"
            label="Inköpsdatum"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="orderDate"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
         
        ></v-date-picker>
      </v-menu>
      <ImageUploader />
      <v-card-actions>
        <v-btn @click="createItemHandler" color="accent2">
          Spara
        </v-btn>
      </v-card-actions>
    </v-card>
  
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
 date: null,
      menu: false,
  
  }),
 watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
  methods: {
    save (date) {
        this.$refs.menu.save(date)
      },
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
console.log("emit");
      this.$emit('close-dialog')
    },
  },
};
</script>

<style></style>
