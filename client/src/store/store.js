import Vue from "vue";
import Vuex from "vuex";
import { project as PROJECT } from "./modules/project";
import { room as ROOM } from "./modules/room";
import { items as ITEMS } from "./modules/items";
import { login as LOGIN } from "./modules/login";
import { image as IMAGE } from "./modules/images";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PROJECT,
        ROOM,
        ITEMS,
        LOGIN,
        IMAGE,
    },
});
