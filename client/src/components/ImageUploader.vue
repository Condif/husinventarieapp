<template>
<div>

  <form @submit.prevent="sendImage" enctype="multipart/form-data">
    <div class="field">
      <label for="file" class="label">Upload File</label>
      <input type="file" @change="selectFile" ref="image" />
    </div>
    <div class="field">
      <button>send</button>
    </div>
  </form>
  <img src="/api/images/5ffee83646032c7d6e43c9b8" alt="">
</div>
  
</template>

<script>
const url = "/api/";


export default {
  name: "ImageUploader",
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    selectFile() {
      this.selectedFile = this.$refs.image.files[0];
      console.log(this.selectedFile.name);
    },

    async sendImage() {
      const formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFile.name);
      
      const response = await fetch(url + "images", {
        method: "POST",
       
        body: formData,
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          console.log("created image" + data);
        });
        return response
    },
  },
};
</script>

<style></style>
