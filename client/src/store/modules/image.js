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
    },
  },

  actions: {
    setImage(state, selectedImageId) {
      state.commit("setImage", selectedImageId);
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
  },
};
