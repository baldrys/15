<template>
  <div class="container">
    <!-- <ul>
        <li v-for="(cell, i, j) in cells" :key="i+j"></li>
    </ul> -->
    
    <table class="game-table">
      <tr class="game-table__row" v-for="(row, i) in cells" :key="i">
        <td class="game-table__col" v-for="(col, j) in row" :key="j"
          v-on:click="cellClicked(i, j)"
        >
          {{ col }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Table',
    methods: {
      cellClicked(i, j){
        const cellClicked = {x:i, y:j};
        let cellToSwap = null;
      if( i-1 >= 0 && this.cells[i-1][j] == ''){
        cellToSwap = {x:i-1, y:j};
      } else if (j+1 <= this.cells[0].length - 1 && this.cells[i][j+1] == '') {
        cellToSwap = {x:i, y:j+1};
      } else if (i+1 <= this.cells[0].length - 1 && this.cells[i+1][j] == '') {
        cellToSwap = {x:i+1, y:j};
      } else if (j-1 >=0 && this.cells[i][j-1] == '') {
        cellToSwap = {x:i, y:j-1};
      }
      if(cellToSwap) {
        // console.log(cellClicked);
        // console.log(cellToSwap, cellClicked);
        const payload = {cell1:cellToSwap, cell2:cellClicked};
        this.$store.dispatch('TableStore/swapCells', payload)
        
      }

      }
    },
    mounted(){
      this.$store.dispatch('TableStore/initCells')        
    },
    computed:{
      ...mapState('TableStore', ["cells"])
    }

}
</script>

<style>
.game-table {
  border-collapse: collapse;
  margin: 0 auto;

}

  .game-table, .game-table__row, .game-table__col {
    border: 1px solid black;
    /* width: 200px; */
    /* height: 100px; */
  }

  .game-table__col { 
    width: 100px;
    height: 100px;
    cursor: pointer;
  }

</style>