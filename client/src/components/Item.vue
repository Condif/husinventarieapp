<template>
  <v-container fluid v-if="items !== undefined || item !== undefined">
    <Quick-start />
    <v-row>
      <v-col sm="6" md="5" color="secondary">
        <v-card class="mx-auto" max-width="344" v-if="item !== undefined">
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div class="card-header">
                <p>Inventarie</p>
                <p class="display-1 text--primary">
                  {{ item.itemName }}
                </p>
              </div>
              <div class="edit-buttons d-flex">
                
                <Edit-item />
                <Delete-dialog />
              </div>
            </div>
            <v-img height="200" :src="image"></v-img>
            <div class="text--primary">
              {{ item.description }}
              <p>Inköpsdatum: {{ item.orderDate }}</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="teal accent-4" @click="reveal = true">
              Visa mer
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal"
              style="height: 100%;"
            >
              <v-card-text class="pb-0">
                <p>Garanti: {{ item.warranty }}</p>
                <v-img height="200" :src="image"></v-img>
                <p>Kvitto</p>
                <p>Rum: {{ item.warranty }}</p>
                <p>Projekt: {{ item.warranty }}</p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn text color="teal accent-4" @click="reveal = false">
                  Stäng
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6" md="5">
        <v-card class="mx-auto" max-width="344">
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
                  <v-icon color="grey lighten-1">mdi-open-in-new</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">
              Lägg till nytt inventarie
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuickStart from "../components/QuickStart.vue";
import DeleteDialog from "../elements/DeleteDialog.vue";
import EditItem from './EditItem.vue';

export default {
  namespaced: true,
  name: "item",

  data: () => ({
    reveal: false,
  }),

  components: {
    QuickStart,
    DeleteDialog,
    EditItem,
  },
  methods: {
    log(message) {
      console.log(message);
    },

    openItemDetails(selectedItem) {
      this.$store.dispatch("ITEMS/setItem", selectedItem);
      localStorage.setItem("currentItem", JSON.stringify(selectedItem));
      window.scrollTo(0,0)
      
    },
  },
  computed: {
    items() {
      return this.$store.getters["ITEMS/getItems"];
    },
    item() {
      return this.$store.getters["ITEMS/getItem"];
    },
    image() {
      return "api/images/" + this.$store.getters["ITEMS/getItem"].imageId;
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
