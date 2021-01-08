import Vue from "vue";
import Vuex from "vuex";
import { project as PROJECT } from "./modules/project";
import { room as ROOM } from "./modules/room";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PROJECT,
        ROOM
    },
});
