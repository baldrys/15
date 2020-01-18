import Vue from "vue"
import Vuex from "vuex"
import Table from './modules/Table'

Vue.use(Vuex)

export default new Vuex.Store({
    // state:{
    //     cells: 1488
    // }
    modules: {
        Table
    }
})