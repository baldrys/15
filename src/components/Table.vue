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
    mounted(){
      this.$store.dispatch('TableStore/initCells')        
    },
    computed:{
      ...mapState('TableStore', ["cells"])
    }

}
</script>

<style>

</style>