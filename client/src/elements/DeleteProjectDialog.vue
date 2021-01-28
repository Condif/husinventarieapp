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
      <v-toolbar color="primary" dark>Radera projekt</v-toolbar>
      <v-card-text>
        <div class="text-h5 mt-4 text-center">
          Vill du radera {{ project.projectName }}?
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="accent1" @click="deleteProjectHandler(project._id)">JA</v-btn>
        <v-btn color="primary" @click="dialogBox = false">NEJ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "deleteProjectDialog",
  data: () => ({
    dialogBox: false,
  }),
  props: {
      project: {
      type: Object
    }
  },

  methods: {
    async deleteProjectHandler(selectedProjectId) {
      await this.$store.dispatch("PROJECT/deleteProject", selectedProjectId);
      if(this.$store.getters["PROJECT/getProject"] !== undefined) {
          if(this.$store.getters["PROJECT/getProject"].length !== 0) {
            localStorage.setItem("currentProject", JSON.stringify(this.$store.getters["PROJECT/getProjects"][0]));
          } else {
            localStorage.setItem("currentProject", [])
          }

      }
      this.$store.dispatch("PROJECT/setProjects")
      this.$store.dispatch("ITEMS/setItems");
      
    
      this.dialogBox = false;
    },
  },
};
</script>

<style></style>
