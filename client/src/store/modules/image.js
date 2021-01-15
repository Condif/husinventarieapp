const url = "/api/";

export const image = {
  namespaced: true,
  state: {
    image: [],
  },

  getters: {
    getImage: (state) => state.image,
  },
  mutations: {
    setImage(state, payload) {
      state.image = payload;
      console.log("state image" + JSON.stringify(state.image));
    },
  },

  actions: {
    setImage(state, selectedImageId) {
      state.commit("setImage", selectedImageId);
    },

    async uploadImageToDB(state, selectedFile) {
        console.log(selectedFile, "vald fil");
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
          console.log("created image" + data);
        });
      return response;
    },
  },
};
