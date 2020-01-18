const defaultState = {
    cells: null,
};

const mutations = {
    updateCells(state, cells){
        state.cells = cells
    }
};

const actions = {
    initCells(context){

        let cells = 1488;
        // const N = 4;
        // let cells =[];
        // let l = 0;
        // for (let i = 0; i < N; i++) { 
        //     cells[i] = [];
        //     for (let j = 0; j < N; j++) {
        //         cells[i][j] = l;
        //         l++;
        //     }
        // }
        context.commit('updateCells', cells)
    }
};

const getters = {
    getCells(state){
        return state.cells
    }
};

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations,
}