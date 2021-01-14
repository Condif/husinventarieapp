const url = "api/";

export const login = {
  namespaced: true,
  state: {
    loggedIn: false,
  },
  
  getters: {
    getLoggedIn: (state) => state.loggedIn,
  },

  mutations: {
    loggedIn(state, loggedIn) {
        state.loggedIn = loggedIn
    }
  },
  
  actions: {
    async login (state, credentials) {
        const response = await fetch(url + "users/login", {
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
                    state.commit("loggedIn", true);
                } else {
                    state.commit("loggedIn", false);
                }
                
            })
        return response;
    }
  }
}