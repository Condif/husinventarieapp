const url = "http://localhost:3002/api/projects"
const headers = { Accept: "application/json"}


export const project = {
    namespaced: true,
    state: {
        projects: [],
        project: []
    },

    getters: {
        getProjects: state => state.projects,
        getProject: state => (id) => state.projects.find(project => project._id === id)  
    },

    mutations: {
        setProjects(state, payload) {
            state.projects = payload
        },
    },

    actions: {
        async setProjects (state) {
            const allProjects = await fetch(url, {headers})
            const j = await allProjects.json()
            console.log(j)
            state.commit("setProjects", j)
        },
    }  
}