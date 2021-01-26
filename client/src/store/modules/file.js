const url = "/api/";

export const file = {
  namespaced: true,
  state: {
    files: [],
    file: [],
    oldFileId: [],
  },

  getters: {
    getFile: (state) => state.file,
    getFiles: (state) => state.files
  },
  mutations: {
    setFile(state, payload) {
      state.file = payload;
    },
    setFiles(state, payload) {
      state.files = payload;
    },
    setOldFile(state, payload) {
      state.oldFileId = payload;
    },
  },

  actions: {
    setFile(state, selectedFile) {
      state.commit("setImage", selectedFile);
    },


    async setFiles(state) {
      const allFiles = await fetch(url + "files");
      const j = await allFiles.json();
      state.commit("setFiles", j);
      console.log("hömtat alla fileid");
    },
    updateFile(state, updatedFileId) {
      console.log(
        updatedFileId + "nytt id " + this.state.FILE.oldFileId + "gammalt id"
      );
      if (this.state.IMAGE.oldFileID === undefined) {
        console.log("tomt oldFileId");
        return
      }
      if (updatedFileId !== this.state.IMAGE.oldFileId) {
        console.log("ta bort gammal fil");
        state.dispatch("deleteFileFromDB", this.state.FILE.oldFileId);
      } else console.log("finns inget att updatera");
      return;
    },

    async uploadFileToDB(state, selectedFile) {
      console.log("addfile", selectedFile);
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
          console.log(data, "fileupload complete");
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
          console.log("file deleted" + data._id);
        });

      return response;
    },
  },
};
