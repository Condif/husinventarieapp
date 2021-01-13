const url = "api/"
const headers = { Accept: "application/json"}


export const project = {
    namespaced: true,
    state: {
        projects: [],
        project: []
    },

    getters: {
        getProjects: state => state.projects,
        getProjectFromProjects: state => (id) => state.projects.find(project => project._id === id),
        getProject: state => state.project
    },

    mutations: {
        setProjects(state, payload) {
            state.projects = payload
        },
        setProject(state, payload) {
            state.project = payload
            
        },
        setProjectFromStorage(state) {
            state.project = JSON.parse(localStorage.getItem("currentProject") || '[]')  
        },
        createProject(state, payload) {
            state.projects.push(payload)
        },
        addItem(state, payload) {
            state.project.itemId.push(payload)
         
        },
    },

    actions: {
        async setProjects (state) {
            const allProjects = await fetch(url +"projects", {headers})
            const j = await allProjects.json()
            state.commit("setProjects", j)
        },
        setProject (state, selectedProjectId) {
            state.commit("setProject", selectedProjectId)
        },
        setProjectFromStorage (state, selectedProjectId) {
            state.commit("setProjectFromStorage", selectedProjectId)
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
                    state.commit("setProjects", data)
                })
              return response   
        },
        async updateProject(state, updatedProject) {
            const response = await fetch(url + "projects", {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(updatedProject),
              })
                .then((response) => {
                    return response.json()
                })
                .then(() => {
                    this.setProjects()
                })
              return response   
        }
    },
}