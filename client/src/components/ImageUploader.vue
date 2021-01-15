<template>
  <div>
    <v-form @submit.prevent="sendImage" enctype="multipart/form-data"
      ><div class="field">
        <v-file-input
          label="Image upload"
          filled
          prepend-icon="mdi-camera"
          type="file"
          @change="selectFile"
          ref="imag"
          accept="image"
        />
        <div class="field">
        <v-btn @click="uploadImage(selectedFile)">
          Ladda upp bilden
        </v-btn>
      </div>
      </div>
    </v-form>
  </div>
</template>

<script>
// const url = "/api/";

export default {
  name: "ImageUploader",
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    selectFile(image) {
    
      this.selectedFile = image;
      console.log(this.selectedFile, "test");
    },

    async uploadImage(selectedFile) {
      await this.$store.dispatch("IMAGE/uploadImageToDB", selectedFile)
    }


    // async sendImage() {
    //   const formData = new FormData();
    //   formData.append("image", this.selectedFile, this.selectedFile.name);

    //   const response = await fetch(url + "images", {
    //     method: "POST",

    //     body: formData,
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })

    //     .then((data) => {
    //       console.log("created image" + data);
    //     });
    //   return response;
    // },
  },
};
</script>

<style></style>
