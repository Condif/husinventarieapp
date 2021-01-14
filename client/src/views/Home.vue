<template>
  <v-container fluid>
        <Quick-start />
    <v-row>
      <v-col cols="12" sm="6"
          md="4">
        <Dashboard />
      </v-col>
     
      <v-col cols="12" sm="6"
          md="8">
        <v-card class="mx-auto" color="base">
          <v-img
            class="white--text align-end"
            height="150px"
            src="../assets/vinden.jpeg"
          >
            <v-card-title> <h3>Senaste anteckning</h3></v-card-title>
          </v-img>

          <v-card-subtitle>
            2021-01-02 En massa kablar och annat bös
          </v-card-subtitle>

  
          <v-card-text>
            <div>
              Behöver fixa ventialtionen <span />Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col  sm="6"
          md="5">
        <Create-item/>
      </v-col>
      <v-col  sm="6"
          md="5">
        <ImageUploader/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateItem from '../components/CreateItem.vue';
import Dashboard from "../components/Dashboard.vue";
import QuickStart from '../components/QuickStart.vue';
import ImageUploader from '../components/ImageUploader.vue';

export default {
  name: "Home",
  components: {
    Dashboard,
    QuickStart,
    CreateItem,
    ImageUploader,
  },
};
</script>

<style>
.home {
  height: 100%;
}
</style>
