import Vue from "vue"
import Vuex from "vuex"
import TableStore from './modules/TableStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        TableStore
    }
})