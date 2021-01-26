const url = "http://localhost:3002/api/"
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
        createProject(state, payload) {
            state.projects.push(payload)
        },
    },

    actions: {
        async setProjects (state) {
            const allProjects = await fetch(url +"projects", {headers})
            const j = await allProjects.json()
            state.commit("setProjects", j)
        },
        async createProject(state, newProjectObject) {
            const response = await fetch(url + "newproject", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(newProjectObject),
              })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    state.commit("createProject", data)
                })
              return response   
        }
    },
}