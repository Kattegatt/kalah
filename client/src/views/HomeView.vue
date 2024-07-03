<template>
  <div class="flex gap-2">
    <button @click="showRegisterModal = true" class="btn">Register</button>
    <button @click="showLoginModal = true" class="btn">Login</button>
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RegisterModal from '../components/RegisterModal.vue'
import LoginModal from '../components/LoginModal.vue'
// import { useGameStore } from '../stores/game'

const showRegisterModal = ref(false)
const showLoginModal = ref(false)

// const gameStore = useGameStore()
</script>

<style scoped>
.btn {
  @apply bg-blue-500 text-white py-2 px-4 rounded;
}
</style>
