const url = "/api/";
const headers = { Accept: "application/json" };

export const items = {
  namespaced: true,
  state: {
    items: [],
    item: [],
    oldItem: [],
  },

  getters: {
    getItems: (state) => state.items,
    getItem: (state) => state.item,
    getItemFromItems: (state) => (id) =>
      state.items.find((item) => item._id === id),
  },

  mutations: {
    setItems(state, payload) {
      state.items = payload;
    },
    setItem(state, payload) {
      state.item = payload;
    },
    createItem(state, payload) {
      state.items.push(payload);
    },
    setItemFromStorage(state, loggedInUser) {
      if(!loggedInUser) return
      const currentItem = JSON.parse(
        localStorage.getItem("currentItem") || "[]"
      );
      if (loggedInUser._id === currentItem.userParentId) {
        state.item = currentItem;
      }
      return;
    },
    updateItem(state, payload) {
      const index = state.items.findIndex((item) => item._id === payload._id);
      if (index > -1) {
        state.items.splice(index, 1, payload);
      }
    },
    deleteItemFromState(state, itemId) {
      const index = state.items.findIndex((item) => item._id === itemId);
      if (index > -1) {
        state.items.splice(index, 1);
      }
      if(state.items.length !== 0) {
        state.item = state.items[0]
      } else {
        state.item = []
      }
    },
    deleteProjectFromItem(state, payload) {   
      const index = state.oldItem.projectId.findIndex(
        (id) => id._id === payload
      );
      if (index > -1) {
        state.oldItem.projectId.splice(index, 1);
      }
    },
  },

  actions: {
    async setItems(state) {
      const allItems = await fetch(url + "items", { headers });
      const j = await allItems.json();
      state.commit("setItems", j);
    },
    setItem(state, selectedItemId) {
      state.commit("setItem", selectedItemId);
    },
    async setItemFromStorage(state) {
      const loggedInUser = await fetch("/api/loggedIn")
      const j = await loggedInUser.json()
      state.commit("setItemFromStorage", j);
    },
    async createItem(state, newItemObject) {
      const response = await fetch(url + "newitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newItemObject),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          state.commit("createItem", data);
          state.commit("setItem", data);
        });
      return response;
    },
    async deleteItem(state, itemId) {
      const response = await fetch(url + "items/" + itemId, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          state.commit("deleteItemFromState", itemId);
        });
      return response;
    },
    async updateItem(state, updatedItemObject) {
      const response = await fetch(url + "items/" + updatedItemObject._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedItemObject),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          state.commit("updateItem", data);
          state.commit("setItem", data);
        });
      return response;
    },

    moveProjectToItems(state, projectId) {
      if(state.getters["getItem"].projectId === undefined) return
      const item = state.getters["getItem"];
      if (item.projectId.length === 0) {
        state.commit("addProjectToItem", projectId);
        state.dispatch("updateItem", state.getters["getItem"]);
        state.commit("deleteItemFromProject", projectId);
        // varför old item db?
        state.dispatch("updateItem", this.state.ITEM.oldItem);
        return;
      }
      if (item.projectId.filter((x) => x._id === projectId).length === 1) {
        return;
      }
      state.commit("addProjecToItem", projectId);
      state.dispatch("updateItem", item);
      state.commit("deleteItemFromProject", projectId);
      state.dispatch("updateItem", this.state.ITEM.oldItem)
    },
    addProjectToItem(state, projectId) {
      if(state.getters["getItem"].length === 0) return
      const item = state.getters["getItem"];

      if (item.projectId.filter((x) => x._id === projectId).length === 1) {
        return;
      }
      state.commit("addProjectToItem", projectId);
    },
  },
};
