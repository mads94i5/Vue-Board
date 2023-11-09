<template>
  <div class="board"><br>
    <h2><strong>Board</strong></h2><br>
    <BoardItem />
  </div>
</template>

<script lang="ts">
import BoardItem from '../components/Board/BoardItem.vue'

export default {
  name: 'BoardView',
  components: {
    BoardItem,
  }
}
</script>