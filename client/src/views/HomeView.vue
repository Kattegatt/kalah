<template>
  <div class="flex gap-2">
    <button @click="showRegisterModal = true" class="btn">Register</button>
    <button @click="showLoginModal = true" class="btn">Login</button>
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<script>
import RegisterModal from '../components/RegisterModal.vue'
import LoginModal from '../components/LoginModal.vue'
import { useGameStore } from '../stores/game'

export default {
  components: {
    RegisterModal,
    LoginModal
  },
  setup() {
    const gameStore = useGameStore()

    const resetGame = () => {
      gameStore.resetGame()
    }

    return {
      gameState: gameStore.gameState,
      resetGame
    }
  },
  data() {
    return {
      showRegisterModal: false,
      showLoginModal: false
    }
  }
}
</script>

<style scoped>
.btn {
  @apply bg-blue-500 text-white py-2 px-4 rounded;
}
</style>
