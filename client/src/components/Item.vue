<template>
  <v-container
    fluid
    class="py-16"
    v-if="items !== undefined || item !== undefined"
  >
    <Quick-start />
    <v-row>
      <v-col cols="12" md="6" order-md="1">
        <v-card
          color="primary"
          class="mx-auto mt-2"
          max-width="900"
          v-if="item !== undefined"
        >
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div class="card-header">
                <p>Valt inventarie</p>
                <h2>
                  {{ item.itemName }}
                </h2>
              </div>
              <div class="edit-buttons d-flex" color="accent2">
                <Edit-item />
                <Delete-dialog />
              </div>
            </div>
            <v-img height="200" :src="image"></v-img>
            <div class="text--primary">
              <p>Beskrivning: {{ item.description }}</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text x-large color="secondary" @click="reveal = true">
              Visa mer
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card
              color="primary"
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal d-flex flex-column justify-space-between"
              style="height: 100%;"
            >
           

              <v-card-text class="pb-0">
                <p>Garanti: {{ item.warranty }}</p>
                <p>Inköpsdatum: {{ item.orderDate }}</p>
                <p>Rum: Köket</p>
                <p>Projekt: {{ item.warranty }}</p>
                <div class="d-flex justify-space-between align-center">
                  <div v-if="item.fileId">
                    <v-icon>mdi-arrow-up-bold-box-outline</v-icon
                    >{{ item.fileId }} Namn på filen
                  </div>
                <v-btn :href="fileURL">visa fil </v-btn>
                </div>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn text x-large color="secondary" @click="reveal = false">
                  Stäng
                </v-btn>
              </v-card-actions>
           
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    
      <v-col cols="12" md="6">
        <v-card  max-width="900" color="primary" class="mx-auto mt-1"
          >
          <v-card-text>
            <h5>Alla inventarier</h5>

            <v-list-item two-line v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.itemName }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.description }},
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="openItemDetails(item)">
                  <v-icon color="secondary">mdi-open-in-new</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuickStart from "../components/QuickStart.vue";
import DeleteDialog from "../elements/DeleteDialog.vue";
import EditItem from "./EditItem.vue";

export default {
  namespaced: true,
  name: "item",

  data: () => ({
    reveal: false,
    file: {},
    
  }),

  components: {
    QuickStart,
    DeleteDialog,
    EditItem,
  },
  

  methods: {
    openItemDetails(selectedItem) {
      this.$store.dispatch("ITEMS/setItem", selectedItem);
      // this.fileURL =
      //   "/api/files/" + this.$store.getters["ITEMS/getItem"].fileId;
      this.$store.dispatch(
        "IMAGE/setImage",
        this.$store.getters["ITEMS/getItem"].imageId
      );
      localStorage.setItem("currentItem", JSON.stringify(selectedItem));
      window.scrollTo(0, 0);
    },
  },
  computed: {
    fileURL() {
      return (
        "/api/files/" + this.$store.getters["ITEMS/getItem"].fileId);
    },
    items() {
      return this.$store.getters["ITEMS/getItems"];
    },
    item() {
      return this.$store.getters["ITEMS/getItem"];
    },
    image() {
      return "api/images/" + this.$store.getters["ITEMS/getItem"].imageId;
    },
    files() {
      return this.$store.getters["FILE/getFiles"];
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
p {
  font-size: 0.8rem;
}
</style>
