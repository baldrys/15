export default {
    actions:{
        initCells(context){
            const N_CELLS = 16;
            for (let i = 0; i < N_CELLS/2; i++) { 
                for (let j = 0; j < N_CELLS/2; j++) { 
                    
                    alert(i);
                }
            }
            context.commit('updateCells', cells)
        }
    },
    mutations:{
        updateCells(state, cells){
            state.cells = cells
        }
    },
    state:{
        cells: []
    },
    getters:{
        getCells(state){
            return state.cells
        }
    },
}