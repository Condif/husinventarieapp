const url = "/api/";
const headers = { Accept: "application/json" };

export const house = {
  namespaced: true,
  state: {
    houses: [],
    house: [],
  },

  getters: {
    getHouses: (state) => state.houses,
    getHouse: (state) => state.house,
    getHouseFromHouses: (state) => (id) =>
      state.houses.find((house) => house._id === id),
  },

  mutations: {
    setHouses(state, payload) {
      state.houses = payload;
    },
    setHouse(state, payload) {
      state.house = payload;
    },
    createHouse(state, payload) {
      state.house.push(payload);
    },
    addRoomToHouse(state, room) {
      state.house.rooms.push(room);
    },
  },

  actions: {

//     setHouseFromId() {
//  const house = (state) => (id) =>
//  state.house.find((house) => house._id === id),

 
//     },

    async setHouses(state) {
      const allhouses = await fetch(url + "houses", { headers });
      const j = await allhouses.json();
      state.commit("setHouses", j);
    },
    async setHouseFromDb(state, newHouse) {
      const house = await fetch(url + "houses/" + newHouse, { headers });
      const j = await house.json();
      state.commit("setHouse", j);
    },
    async createHouse(state, newHouseObject) {
      const response = await fetch(url + "newhouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newHouseObject),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          state.commit("createHouse", data);
        });
      return response;
    },
    setHouse(state, house) {
      state.commit("setHouse", house);
    },
    async updateHouse(state, house) {
      const response = await fetch(url + "houses/" + house._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(house),
      }).then((response) => {
        return response.json();
      });
      return response;
    },
    addRoomToHouse(state, room) {
      state.commit("addRoomToHouse", room);
    },
  },
};
