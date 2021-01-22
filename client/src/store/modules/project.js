const url = "api/";
const headers = { Accept: "application/json" };

export const project = {
  namespaced: true,
  state: {
    projects: [],
    project: [],
    oldProject: []
  },

  getters: {
    getProjects: (state) => state.projects,
    getProjectFromProjects: (state) => (id) =>
      state.projects.find((project) => project._id === id),
    getProject: (state) => state.project,
  },

  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    setProject(state, payload) {
      
      state.project = payload;
    },
    setProjectFromStorage(state) {
      state.project = JSON.parse(
        localStorage.getItem("currentProject") || "[]"
      );
    },
    setOldProject(state, payload) {
      console.log(payload, "payload");
      state.project = payload;
    },
    createProject(state, payload) {
      state.projects.push(payload);
    },
    addItemToProject(state, payload) {
      state.project.itemsId.push(payload);
    },
    deleteItemFromProject(state, payload) {
      console.log(state);
      var filteredAry = state.oldProject.itemsId.filter(e => e !== payload)
      console.log( filteredAry , "filter");
    }
  },


  selectedItem: state => {
    return state.items.find(
      item => item.id == state.selectedId
    );
  },


  actions: {
    async setProjects(state) {
      const allProjects = await fetch(url + "projects", { headers });
      const j = await allProjects.json();
      state.commit("setProjects", j);
    },
    setProject(state, selectedProject) {
      state.commit("setProject", selectedProject);
    },
    setProjectFromStorage(state, selectedProjectId) {
      state.commit("setProjectFromStorage", selectedProjectId);
    },
    addItemToProject(state, itemsId) {
      const project = state.getters["getProject"];
      const map = project.itemsId.filter(x => x._id === itemsId)
      console.log(map, this.oldProject, "bef projekt");
      if (project.itemsId.length === 0) {
        state.commit("addItemToProject", itemsId);
        console.log("tomt id", itemsId);
        state.dispatch("updateProject", project);
        state.commit("deleteItemFromProject", itemsId)
        return;
      }
      if (project.itemsId.filter(x => x._id === itemsId).length !== 0) {
        console.log("finns ett likandant id");
        return;
      }
      console.log("inte tom men olika idn", itemsId);
      state.commit("addItemToProject", itemsId);
      state.dispatch("updateProject", project);
      state.commit("deleteItemFromProject", itemsId)
    },
    async createProject(state, newProjectObject) {
      const response = await fetch(url + "newproject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newProjectObject),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          state.commit("setProjects", data);
        });
      return response;
    },
    async updateProject(state, project) {
      console.log(project, "updateproject");
      const response = await fetch(url + "projects/" + project._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      }).then((response) => {
        return response.json();
      });
      return response;
    },
  },
};
