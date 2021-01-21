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
            state.item = JSON.parse(localStorage.getItem("currentItem") || '[]')  
        },
        deleteItemFromState(state, itemId) {
            const index = state.items.findIndex(item => item._id === itemId);
            if(index > -1) {
                state.items.splice(index, 1)
            }
        }
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
        setItemFromStorage (state, selectedItem) {
            state.commit("setItemFromStorage", selectedItem)
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
        },
        async deleteItem(state, itemId) {
            console.log("delete item");
            const response = await fetch(url + "items/" + itemId, {
                method: "DELETE",
              })
                .then((response) => {
                    return response.json()
                })
                .then(()=> {
                    state.commit("deleteItemFromState", itemId)
                })
            return response   
        },
        async updateItem(state, updatedItemObject) {
            console.log("update item");
            const response = await fetch(url + "items/" + updatedItemObject._id, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(updatedItemObject),
              })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    state.commit("createItem", data)
                    state.commit("setItem", data)
                })
              return response   
        },
    },
}