import Vue from "vue";
import Vuex from "vuex";
import { project as PROJECT } from "./modules/project";
import { items as ITEMS } from "./modules/items";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PROJECT,
        ITEMS
    },
});
