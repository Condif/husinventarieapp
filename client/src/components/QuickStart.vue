<template>
  <v-container class="pa-0">
    <v-speed-dial height="100vh" fixed v-model="fab" bottom absolute right>
      <template #activator>
        <v-btn v-model="fab" fab dark x-large color="accent2">
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>

      <v-btn fab dark medium color="accent1" @click="dialogRoom = true">
        <v-icon>mdi-home-city-outline</v-icon>
      </v-btn>
      <v-btn fab dark medium color="primary" @click="dialogProject = true">
        <v-icon>mdi-calendar-check-outline</v-icon>
      </v-btn>

      <v-btn fab dark medium color="secondary" @click="dialogItem = true">
        <v-icon>mdi-ballot</v-icon>
      </v-btn>
    </v-speed-dial>

 
    <v-dialog v-model="dialogItem" width="500">
      <CreateItem @close-dialog="closeDialogItem" />
    </v-dialog>
    <v-dialog v-model="dialogProject" width="500">
      <CreateProject @close-dialog="closeDialogProject" />
    </v-dialog>
    <v-dialog v-model="dialogRoom" width="500">
      <CreateRoom @close-dialog="closeDialogRoom" />
    </v-dialog>
  </v-container>
</template>

<script>
import CreateItem from "../components/CreateItem";
import CreateProject from "../components/CreateProject";
import CreateRoom from "../components/CreateRoom";
export default {
  components: { CreateItem, CreateProject, CreateRoom },
  name: "QuickStart",

  data: () => ({
    fab: false,
    dialogItem: false,
    dialogProject: false,
    dialogRoom: false,
  }),

  methods: {
    closeDialogRoom() {
      this.dialogRoom = false;
    },
    closeDialogProject() {
      this.dialogRoom = false;
    },
    closeDialogItem() {
      this.dialogRoom = false;
    },
  },
};
</script>

<style></style>
