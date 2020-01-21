const defaultState = {
    cells: [[]],
};

const mutations = {
    updateCells(state, cells){
        state.cells = cells
    },
    swapCells(state, payload) {
        const fistCell = state.cells[payload.cell1.x][payload.cell1.y];
        state.cells[payload.cell1.x].splice(payload.cell1.y, 1, state.cells[payload.cell2.x][payload.cell2.y]);
        state.cells[payload.cell2.x].splice(payload.cell2.y, 1, fistCell);
    }
};

const actions = {
    initCells(context){
        const N = 4;
        let cells =[];
        let l = 1;
        for (let i = 0; i < N; i++) { 
            cells[i] = [];
            for (let j = 0; j < N; j++) {
                cells[i][j] = l;
                l++;
            }
        }
        cells[N-1][N-1] = '';
        context.commit('updateCells', cells)
    },

    swapCells(context, payload ){
        context.commit('swapCells', payload)
    },
};

const getters = {
    getCells(state) {
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