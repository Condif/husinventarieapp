const url = "http://localhost:3002/api/projects"
const headers = { Accept: "application/json"}


export const project = {
    namespaced: true,
    state: {
        projects: []
    },

    getters: {
        getProjects: state => state.projects     
    },

    mutations: {
        setProjects(state, payload) {
            state.projects = payload
        }
    },

    actions: {
        async setProjects (state) {
            const allProjects = await fetch(url, {headers})
            const j = await allProjects.json()
            state.commit("setProjects", j)
        }
    }  
}