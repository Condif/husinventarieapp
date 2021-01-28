const url = "api/";

export const session = {
  namespaced: true,
  state: {
    loggedIn: false,
    inSignup: false,
    inLogin: true,
  },
  
  getters: {
    getLoggedIn: (state) => state.loggedIn,
    getInSignup: (state) => state.inSignup,
    getInLogin: (state) => state.inLogin,
  },

  mutations: {
    setLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn
    },
    setLoggedInFromStorage(state) {
        state.loggedIn = JSON.parse(localStorage.getItem("loggedIn") || false)  
    },
    inLogin(state, payload) {
        state.inLogin = payload
    },
    inSignup(state, payload) {
        state.inSignup = payload
    }
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
                    localStorage.setItem("loggedIn", JSON.stringify(true));
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
                    localStorage.setItem("loggedIn", JSON.stringify(false));
                } else {
                    state.commit("setLoggedIn", true);
                }
                
            })
        return response;
    },
    async signup (state, credentials) {
        const response = await fetch(url + "newuser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        })
        return response;
    },
    setLoggedInFromStorage (state) {
        state.commit("setLoggedInFromStorage")
    },
    setInLogin(state, inLogin) {
        state.commit("inLogin", inLogin)
    },
    setInSignup(state, inSignup) {
        state.commit("inSignup", inSignup)
    }
  }
}