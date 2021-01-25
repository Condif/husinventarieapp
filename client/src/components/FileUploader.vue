<template>
  <div>
    <v-form @submit.prevent="sendFile" enctype="multipart/form-data"
      ><div class="field">
        <v-file-input
          label="File upload"
          filled
          prepend-icon="mdi-camera"
          type="file"
          @change="selectFile"
          ref="file"
          accept="file"
        />
        <div class="field">
          <v-btn @click="uploadFile(selectedFile)">
            Ladda upp filen
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
// const url = "/api/";

export default {
  name: "FileUploader",
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    selectFile(file) {
      this.selectedFile = file;
    },

    async uploadFile(selectedFile) {
      console.log(selectedFile);
      await this.$store.dispatch("FILE/uploadFileToDB", selectedFile);
    },

  
  },
};
</script>

<style></style>
