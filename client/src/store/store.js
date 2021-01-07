import Vue from "vue";
import Vuex from "vuex";
import { project as PROJECT } from "./modules/project";
// import { project2 as PROJECT2 } from "./modules/project2";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PROJECT
    },
});
