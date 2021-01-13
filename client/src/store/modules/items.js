const url = "/api/"
const headers = { Accept: "application/json"}


export const items = {
    namespaced: true,
    state: {
        items: [],
        item: []
    },

    getters: {
        getItems: state => state.items,
        getItem: state => state.item,
        getItemFromItems: state => (id) => state.items.find(item => item._id === id),
    },

    mutations: {
        setItems(state, payload) {
            state.items = payload
        },
        setItem(state, payload) {
            state.item = payload
            
        },
        createItem(state, payload) {
            state.items.push(payload)
         
        },
        setItemFromStorage(state) {
            state.item = JSON.parse(localStorage.getItem("currentItemId") || '[]')  
        },
    },

    actions: {
        async setItems (state) {
            const allItems = await fetch(url +"items", {headers})
            const j = await allItems.json()
            state.commit("setItems", j)
        },
        setItem (state, selectedItemId) {
            state.commit("setItem", selectedItemId)
        },
        setItemFromStorage (state, selectedItemId) {
            state.commit("setItemFromStorage", selectedItemId)
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
                    state.commit("setItem", data)
                })
              return response   
        }
    },
}