const url = "/api/";

export const file = {
  namespaced: true,
  state: {
    file: [],
    oldFileId: [],
  },

  getters: {
    getFile: (state) => state.file,
  },
  mutations: {
    setFile(state, payload) {
      state.file = payload;
    },
    setOldFile(state, payload) {
      state.oldFileId = payload;
    },
  },

  actions: {
    setFile(state, selectedFile) {
      state.commit("setImage", selectedFile);
    },

    // updateImage(state, updatedFileId) {
      
    //   if (updatedFileId !== this.state.IMAGE.oldFileId) {
    //     console.log("ta bort gammal fil");
    //     state.dispatch("deleteFileFromDB", this.state.FILE.oldFileId);
    //   } else return;
    // },

    async uploadFileToDB(state, selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);

      const response = await fetch(url + "files", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          state.commit("setFile", data);

        });
      return response;
    },
    async deleteFileFromDB(state, fileId) {
      const response = await fetch(url + "files/" + fileId, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("image deleted" + data);
        });
  
      return response;
    },
  },
};
