<template>
  <v-container fluid v-if="items !== undefined">
    <Quick-start />
    <v-row>
      <v-col color="secondary">
        <v-card-title v-if="item !== undefined">
          {{ item.itemName}}
        </v-card-title>
        <v-card-title >
          Image
        </v-card-title>
        <v-card-title v-if="item !== undefined">
            {{ item.description}}
        </v-card-title>
        <v-card-title v-if="item !== undefined">
            {{ item.orderDate}}
        </v-card-title>
        <v-card-title v-if="item !== undefined">
            {{ item.warranty}}
        </v-card-title>
        <v-card-title v-if="item !== undefined">
            {{ item.headerText}}
        </v-card-title> 
       </v-col> 
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
          console.log(message)
      }
  },
  computed: {
    items() {
      return this.$store.getters["ITEMS/getItems"];
    },
    item() {
      return this.$store.getters["ITEMS/getItemFromItems"](`${this.$store.getters["ITEMS/getItem"]}`)
       
    },
  },
};
</script>

<style>
.home {
  height: 100%;
}
</style>