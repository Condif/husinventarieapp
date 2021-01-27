<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="344"
    v-model="dialogBox"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="secondary">mdi-delete</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="primary" dark>Radera inventarie</v-toolbar>
      <v-card-text>
        <div class="text-h5 mt-4 text-center">
          Vill du radera {{ item.itemName }}?
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="accent1" @click="deleteItemHandler(item._id)">JA</v-btn>
        <v-btn color="primary" @click="dialogBox = false">NEJ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "deleteDialog",
  data: () => ({
    dialogBox: false,
  }),

  methods: {
    async deleteItemHandler(selectedItemId) {
      await this.$store.dispatch("ITEMS/deleteItem", selectedItemId);
      if(this.$store.getters["ITEMS/getItems"].length !== 0) {
        localStorage.setItem("currentItem", JSON.stringify(this.$store.getters["ITEMS/getItems"][0]));
      } else {
        localStorage.setItem("currentItem", [])
      }
      this.$store.dispatch("ITEMS/setItems")
      this.$store.dispatch("PROJECT/setProjects");
      this.dialogBox = false;
    },
  },
  computed: {
    item() {
      return this.$store.getters["ITEMS/getItem"];
    },
  },
};
</script>

<style></style>
