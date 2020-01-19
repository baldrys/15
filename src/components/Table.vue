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
      for (let l = 0; l < this.cells[0].length; l++) {
        if(this.cells[i][l] == ''){
          // Right shift
          if( j < l) {
            for (let m = l-1; m >= j; m--) {
                const payload = {
                  cell1: {x:i, y:m+1},
                  cell2: {x:i, y:m},
                };
                this.$store.dispatch('TableStore/swapCells', payload)
            }
          } else {
            // Left shift
            for (let m = l+1; m <= j; m++) {
                const payload = {
                  cell1: {x:i, y:m-1},
                  cell2: {x:i, y:m},
                };
                this.$store.dispatch('TableStore/swapCells', payload)
            }
          }
          break
        }
        if(this.cells[l][j] == ''){
          // Down shift
          if( i < l) {
            for (let m = l-1; m >= i; m--) {
                const payload = {
                  cell1: {x:m+1, y:j},
                  cell2: {x:m, y:j},
                };
                this.$store.dispatch('TableStore/swapCells', payload)
            }
          } else {
            // Up shift
            for (let m = l+1; m <= i; m++) {
                const payload = {
                  cell1: {x:m-1, y:j},
                  cell2: {x:m, y:j},
                };
                this.$store.dispatch('TableStore/swapCells', payload)
            }
          }
          break
        } 
        
      }

      // if(cellToSwap) {
      //   // console.log(cellClicked);
      //   // console.log(cellToSwap, cellClicked);
      //   const payload = {cell1:cellToSwap, cell2:cellClicked};
      //   this.$store.dispatch('TableStore/swapCells', payload)
        
      // }

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