const url = "api/";
const headers = { Accept: "application/json" };

export const project = {
  namespaced: true,
  state: {
    projects: [],
    project: [],
    oldProject: [],
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
      console.log("payload",payload);
    },
    setProjectFromStorage(state, loggedInUser) {
      if(!loggedInUser) return
      const currentProject = JSON.parse(
        localStorage.getItem("currentProject") || "[]");
      if(currentProject.length === 0 && state.projects.length !== 0) {
        state.project = state.projects[0]
        return
      } else if(loggedInUser._id === currentProject.userParentId) {
          state.project = currentProject
      } else {
        return
      }
    },
    setOldProject(state, payload) {
      state.oldProject = payload;
    },
    createProject(state, payload) {
      state.projects.push(payload);
    },
    addItemToProject(state, payload) {
      state.project.itemsId.push(payload);
    },
    deleteItemFromProject(state, payload) {   
      const index = state.oldProject.itemsId.findIndex(
        (id) => id._id === payload
      );
      if (index > -1) {
        state.oldProject.itemsId.splice(index, 1);
      }
    },
    deleteProjectFromState(state, projectId) {
      const index = state.projects.findIndex((project) => project._id === projectId);
      if (index > -1) {
        state.projects.splice(index, 1);
      }
      if(state.projects.length !== 0) {
        state.project = state.projects[0]
      } else {
        state.project = []
      }
    },
  },

  selectedItem: (state) => {
    return state.items.find((item) => item.id == state.selectedId);
  },

  actions: {
    async getProjectFromProjects(state, id) {
      return await state.getters["getProjectFromProjects"](id);
    },

    async setProjects(state) {
      const loggedInUser = await fetch("/api/loggedIn")
      const jLoggedInUser = await loggedInUser.json()
      const allProjects = await fetch(url + "projects", { headers });
      const j = await allProjects.json();
      state.commit("setProjects", j);
      state.commit("setProjectFromStorage", jLoggedInUser);
    },
    async setProject(state, selectedProject) {
      await state.commit("setProject", selectedProject)
    },
    addItemToProject(state, itemsId) {
      if(state.getters["getProject"].length === 0) return
      const project = state.getters["getProject"];

      if (project.itemsId.filter((x) => x._id === itemsId).length === 1) {
        return;
      }
      state.commit("addItemToProject", itemsId);
    },
    moveItemToProject(state, itemsId) {
      if(state.getters["getProject"].itemsId === undefined) return
      const project = state.getters["getProject"];
      if (project.itemsId.length === 0) {
        state.commit("addItemToProject", itemsId);
        state.dispatch("updateProject", state.getters["getProject"]);
        state.commit("deleteItemFromProject", itemsId);
        state.dispatch("updateProject", this.state.PROJECT.oldProject);
        return;
      }
      if (project.itemsId.filter((x) => x._id === itemsId).length === 1) {
        return;
      }
      state.commit("addItemToProject", itemsId);
      state.dispatch("updateProject", project);
      state.commit("deleteItemFromProject", itemsId);
      state.dispatch("updateProject", this.state.PROJECT.oldProject);
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
        .then(() => {
          state.dispatch("setProjects")
        });
      return response;
    },
    async updateProject(state, project) {
      console.log("det uppdaterade projektet", project);
      const response = await fetch(url + "projects/" + project._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      }).then((response) => {
        return response.json();
      }).then(() => {
        state.commit("setProject", project)
      });
      return response;
    },
    async deleteProject(state, projectId) {
      const response = await fetch(url + "projects/" + projectId, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        }).then(() => {
          state.commit("deleteProjectFromState", projectId);
        })
      return response;
    },
  },
};
