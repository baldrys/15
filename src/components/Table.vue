<template>
  <div class="container">
    <!-- <ul>
        <li v-for="(cell, i, j) in cells" :key="i+j"></li>
    </ul> -->
    {{ cells }}
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Table',
    // mounted(){
        
    //      this.$store.dispatch('initCells')
    //      console.log(this.$store.state.cells);
         
    // },
    // computed: {
    //     cells () {
    //         return this.$store.state.Table.cells
    //     }
    // }
    computed:{
      ...mapState('Table', ["cells"])
    }

}
</script>

<style>

</style>