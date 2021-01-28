const url = "/api/";
const headers = { Accept: "application/json" };

export const room = {
  namespaced: true,
  state: {
    rooms: [],
    room: [],
    computedRooms: [],
  },

  getters: {
    getRooms: (state) => state.rooms,
    getComputedRooms: (state) => state.computedRooms,
    getRoom: (state) => state.room,
    getRoomFromRooms: (state) => (id) =>
      state.rooms.find((room) => room._id === id), 
  },

  mutations: {
    setRooms(state, payload) {
      state.rooms = payload;
    },
    setRoom(state, payload) {
      state.room = payload;
      
    },
    updateRooms(state, payload) {
      state.rooms.push(payload)
    },
    
    addProjectToRoom(state, payload) {
      state.room.projects.push(payload);
    },
    addItemToRoom(state, payload) {
      state.room.items.push(payload);
    },
    updateToRoomsWithHouseId (state, payload) {
      const filteredRooms = state.rooms.filter( ({ houseId }) => houseId == payload );
      state.computedRooms = filteredRooms
    }
  },

  actions: {
    async setRooms(state) {
      const allRooms = await fetch(url + "rooms", { headers });
      const j = await allRooms.json();
      state.commit("setRooms", j);
    },
    computedRooms(state, currentHouseId) {
      state.commit("updateToRoomsWithHouseId", currentHouseId)
    },
    async createRoom(state, newRoomObject) {
      
      const response = await fetch(url + "newroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newRoomObject),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          state.commit("setRoom", data);
          state.commit("updateRooms", data);
          
        });
      return response;
    },
    addProjectToRoom(state, projectId) {
      if(state.getters["getRoom"].length === 0) return
      const room = state.getters["getRoom"];
      if (room.projects.filter((x) => x._id === projectId).length === 1) {
        return;
      }
      state.commit("addProjectToRoom", projectId);
    },
    addItemToRoom(state, itemId) {
      if(state.getters["getRoom"].length === 0) return
      const room = state.getters["getRoom"];
      if (room.items.filter((x) => x._id === itemId).length === 1) {
        return;
      }
      state.commit("addItemToRoom", itemId);
    },
    async setRoom(state, selectedRoom) {
      await state.commit("setRoom", selectedRoom)
    },
    async updateRoom(state, room) {
      const response = await fetch(url + "rooms/" + room._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      }).then((response) => {
        return response.json();
      });
      return response;
    },
  },
};
