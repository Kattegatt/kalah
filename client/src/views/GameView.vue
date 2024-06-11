<template>
  <div class="flex items-center justify-center">
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from '../components/GameBoard.vue'
// import { useGameStore } from '../stores/game'

export default {
  components: {
    GameBoard
  },

  data() {
    return {
      showRegisterModal: false,
      showLoginModal: false
    }
  }
}
</script>

<style scoped></style>
