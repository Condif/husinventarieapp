const url = "/api/";

export const image = {
  namespaced: true,
  state: {
    image: [],
    oldImageId: [],
  },

  getters: {
    getImage: (state) => state.image,
  },
  mutations: {
    setImage(state, payload) {
      state.image = payload;
    },
    setOldImage(state, payload) {
      state.oldImageId = payload;
    },
  },

  actions: {
    setImage(state, selectedImageId) {
      state.commit("setImage", selectedImageId);
    },

    updateImage(state, updatedImageId) {
      // denna funkar sådär då den även plockar bort den gamla bilden när den e undefined mm.. 
      //old image ska bara sparas om vi har satt en ny
      if (updatedImageId !== this.state.IMAGE.oldImageId) {
        console.log("ta bort gammal bild" ,this.state.IMAGE.oldImageId);
        state.dispatch("deleteImageFromDB", this.state.IMAGE.oldImageId);
      } else return;
    },

    async uploadImageToDB(state, selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile, selectedFile.name);

      const response = await fetch(url + "images", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          state.commit("setImage", data);
        });
      return response;
    },
    async deleteImageFromDB(state, imageId) {
      const response = await fetch(url + "images/" + imageId, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("image deleted tralalal" + data);
        });
  
      return response;
    },
  },
};
