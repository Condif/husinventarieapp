const url = "api/";

export const session = {
  namespaced: true,
  state: {
    loggedIn: false,
  },
  
  getters: {
    getLoggedIn: (state) => state.loggedIn,
  },

  mutations: {
    setLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn
    },
  },
  
  actions: {
    async login (state, credentials) {
        const response = await fetch(url + "session/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
            })
            .then((response) => {
                if(response.status === 200) {
                    state.commit("setLoggedIn", true);
                } else {
                    state.commit("setLoggedIn", false);
                }
                
            })
        return response;
    },
    async logout (state) {
        const response = await fetch(url + "session/logout", {
            method: "POST",
            credentials: "include",
            })
            .then((response) => {
                if(response.status === 200) {
                    state.commit("setLoggedIn", false);
                } else {
                    state.commit("setLoggedIn", true);
                }
                
            })
        return response;
    }
  }
}