<template>
  <n-card style="width: 600px" title="Game Rules">
    <n-list hoverable>
      <n-thing>
        <n-list-item>
          Moving counter-clockwise, the player deposits one of the stones in each pocket until the
          stones run out.
        </n-list-item>
      </n-thing>
      <n-thing>
        <n-list-item>
          If the last piece you drop is in your own Mancala, you take another turn.
        </n-list-item>
      </n-thing>
      <n-thing>
        <n-list-item>
          If the last piece you drop is in an empty pocket on your side, you capture that piece and
          any pieces in the pocket directly opposite.
        </n-list-item>
      </n-thing>
      <n-thing>
        <n-list-item>
          The game ends when all six pockets on one side of the Mancala board are empty.
        </n-list-item>
      </n-thing>
      <n-thing>
        <n-list-item>
          The player who still has pieces on his/her side of the board when the game ends captures
          all of those pieces.
        </n-list-item>
      </n-thing>
      <n-thing>
        <n-list-item>The winner is the player with the most pieces.</n-list-item>
      </n-thing>
    </n-list>

    <n-button class="mt-2" type="primary" @click="emit('close')">Gotcha</n-button>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { NCard, NThing, NList, NListItem, NButton } from 'naive-ui'

const emit = defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #d1cdb7;
  max-width: 500px;
  width: 100%;
}
</style>
