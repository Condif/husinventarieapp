<template>
  <v-container fluid v-if="items !== undefined || item !== undefined" >
    <Quick-start />
    <v-row>
      <v-card min-width="100%">
        <v-col color="secondary">
          <v-card-title >
            {{ item.itemName }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-subtitle >
            <v-img height="200" :src="image"></v-img>
          </v-card-subtitle>

          <div >
            <v-card-subtitle >
              Beskrivning:
            </v-card-subtitle>
            <v-card-text><p>{{ item.description }}</p></v-card-text>
          </div>

          <v-card-subtitle>
            Order datum: {{ item.orderDate }}
          </v-card-subtitle>
          <v-card-subtitle>
           Garanti: {{ item.warranty }}
          </v-card-subtitle>
        </v-col>
      </v-card>
    </v-row>
    <v-row>
      <v-col sm="6" md="5">
        <Create-item />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateItem from "../components/CreateItem.vue";
import QuickStart from "../components/QuickStart.vue";

export default {
  namespaced: true,
  name: "item",
  data: () => ({}),
  components: {
    QuickStart,
    CreateItem,
  },
  methods: {
    log(message) {
      console.log(message);
    },
  },
  computed: {
    items() {
      return this.$store.getters["ITEMS/getItems"];
    },
    item() {
      return this.$store.getters["ITEMS/getItemFromItems"](
        `${this.$store.getters["ITEMS/getItem"]}`
      );
    },
    image() {
      return (
        "api/images/" +
        this.$store.getters["ITEMS/getItemFromItems"](
          `${this.$store.getters["ITEMS/getItem"]}`
        ).imageId
      );
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}
p {
  font-size: 0.8rem;
}
</style>
