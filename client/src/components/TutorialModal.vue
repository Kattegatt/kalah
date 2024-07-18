<template>
  <div class="fixed inset-0 flex items-center justify-center z-10">
    <div class="modal-content flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-bold text-center mb-4">Game Rules</h2>
      <ul class="list-disc list-inside">
        <li>
          Moving counter-clockwise, the player deposits one of the stones in each pocket until the
          stones run out.
        </li>
        <li>If the last piece you drop is in your own Mancala, you take another turn.</li>
        <li>
          If the last piece you drop is in an empty pocket on your side, you capture that piece and
          any pieces in the pocket directly opposite.
        </li>
        <li>The game ends when all six pockets on one side of the Mancala board are empty.</li>
        <li>
          The player who still has pieces on his/her side of the board when the game ends captures
          all of those pieces.
        </li>
        <li>The winner is the player with the most pieces.</li>
      </ul>
      <button @click="close" class="modal-button mt-4 py-2 px-4">Gotcha</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}
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
