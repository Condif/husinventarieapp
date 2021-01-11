const url = "http://localhost:3002/api/"
const headers = { Accept: "application/json"}


export const items = {
    namespaced: true,
    state: {
        items: [],
        item: []
    },

    getters: {
        getItems: state => state.items,
        getItem: state => (id) => state.items.find(item => item._id === id),
    },

    mutations: {
        setItems(state, payload) {
            state.items = payload
        },
        createItem(state, payload) {
            state.items.push(payload)
         
        },
    },

    actions: {
        async setItems (state) {
            const allItems = await fetch(url +"items", {headers})
            const j = await allItems.json()
            state.commit("setItems", j)
        },
        async createItem(state, newItemObject) {
            const response = await fetch(url + "newitem", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(newItemObject),
              })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    state.commit("createItem", data)
                })
              return response   
        }
    },
}