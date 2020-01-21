<template>
  <div class="container">

  <div class="game-field">
      <div class="game-field__header">
      <div class="game-field__count">
        <span>Действий: </span>
        {{ count }}
      </div>
      <div class="game-field__timer">
        <span>Прошло времени: </span>
        {{ formatedTime }}
      </div>
    </div>
    <table class="game-table">
      <tr class="game-table__row" v-for="(row, i) in cells" :key="i">
        <td class="game-table__col" v-for="(col, j) in row" :key="j"
          v-on:click="cellClicked(i, j)">
            <div class="cell-bg" :key="col">{{ col }}</div> 
        </td>
      </tr>
    </table>
  </div>


<div id="myModal" class="modal" tabindex="-1" role="dialog" data-toggle="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Победа!</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Вы победили!</p>
      </div>
    </div>
  </div>
</div>
    
   
  </div>
</template>

<script>

import { mapState } from 'vuex'
import $ from 'jquery'

export default {
    name: 'Table',
    data() {
      return {
        count: 0,
        isTimerRunning: false,
        currentTime: 0,
        thicker: undefined
      }
    },
    methods: {
      cellClicked(i, j){
        if(!this.isTimerRunning) {
          this.startTimer();
        }
        if(this.isCellAllowed(i,j)){
          this.count++;
          this.moveCellsByCoordinates(i,j)
          if (this.isPlayerWon){
            this.count = 0;
            this.stopTimer();
            $('#myModal').modal('show');
            this.shuffle();
          }
        }
      },
      moveCellsByCoordinates(i,j) {
        let payload = null;
        for (let l = 0; l < this.cells[0].length; l++) {
          if(this.cells[i][l] == ''){
            // Right shift
            if( j < l) {
              for (let m = l-1; m >= j; m--) {
                  payload = {
                    cell1: {x:i, y:m+1},
                    cell2: {x:i, y:m},
                  };
                  this.$store.dispatch('TableStore/swapCells', payload)
              }
            } else {
              // Left shift
              for (let m = l+1; m <= j; m++) {
                  payload = {
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
                  payload = {
                    cell1: {x:m+1, y:j},
                    cell2: {x:m, y:j},
                  };
                  this.$store.dispatch('TableStore/swapCells', payload)
              }
            } else {
              // Up shift
              for (let m = l+1; m <= i; m++) {
                  payload = {
                    cell1: {x:m-1, y:j},
                    cell2: {x:m, y:j},
                  };
                  this.$store.dispatch('TableStore/swapCells', payload)
              }
            }
            break
          } 
        }
      },
      getAllowedCells(){
        let allowedCells = [];
        const emptyCell = this.getEmptyCell();
        for (let l = 0; l < this.cells[0].length; l++) {
          if(l != emptyCell.y){
            allowedCells.push({
              x: emptyCell.x,
              y: l
            })
          }
        }
        for (let l = 0; l < this.cells[0].length; l++) {
          if(l != emptyCell.x){
            allowedCells.push({
              x: l,
              y: emptyCell.y
            })
          }
        }
        return allowedCells;
      },
      getEmptyCell() {
        for (let i = 0; i < this.cells[0].length; i++){ 
          for (let j = 0; j < this.cells[0].length; j++){ 
            if (this.cells[i][j] == '')
              return {
                x: i,
                y: j
              }
          }
        }
      },
      isCellAllowed(i,j){
        const allowedCells = this.getAllowedCells();
        for(let allowedCell of allowedCells){
          if(i == allowedCell.x && j == allowedCell.y) {
            return true
          }
        }
        return false
      },
      shuffle(N = 10) {    
        for (let _ = 0; _ < N; _++) {
          let allowedCells = this.getAllowedCells();
          let randomCell = allowedCells[Math.floor(Math.random() * Math.floor(allowedCells.length))];
          this.moveCellsByCoordinates(randomCell.x,randomCell.y);
        }
      },
      startTimer() {
        this.thicker = setInterval(()=>{
          this.currentTime++;
        }, 1000);
        this.isTimerRunning = true
      },
      stopTimer() {
        window.clearInterval(this.thicker);
        this.isTimerRunning = false;
        this.currentTime = 0;

      },
    },
    mounted(){
      this.$store.dispatch('TableStore/initCells');
      this.shuffle();      
    },
    computed:{
      ...mapState('TableStore', ["cells"]),
      formatedTime(){
        const hours = Math.floor(this.currentTime/(60*60));
        const minutes = Math.floor(this.currentTime/(60)) - hours*60 ;
        const seconds =  this.currentTime - minutes*60;
        return `${hours >= 10 ? hours: '0'+ hours.toString()}:${minutes >= 10 ? minutes: '0'+ minutes.toString()}:${seconds >= 10 ? seconds: '0'+ seconds.toString()}`;
      },
      isPlayerWon(){
        let l = 1;
        const N = this.cells[0].length;
        for (let i = 0; i < N; i++) { 
            for (let j = 0; j <  N; j++) {
              if(l < N*N && this.cells[i][j] != l)
                return false;
              l++;  
            }
        }
        return true;
      }
    },


}
</script>

<style>
  .game-field{
      margin: 0 auto;
      width: 400px;
  }
  .game-table {
    border-collapse: collapse;
  }

  .game-table, .game-table__row, .game-table__col {
    border: 1px solid black;

  }

  .game-table__col { 
    width: 100px;
    height: 100px;
    cursor: pointer;
  }

  .game-field__header{
    display: flex;
    justify-content: space-between
  }
</style>