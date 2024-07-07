<template>
  <div class="flex justify-end gap-2">
    <button @click="showRegisterModal = true" class="btn">Register</button>
    <button @click="showLoginModal = true" class="btn">Login</button>
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    <TutorialModal v-if="showTutorial" @close="showTutorial = false" />
  </div>
  <div class="flex items-center justify-center p-2 m-8">
    <h1 class="font-bold big text-2xl">kalah</h1>
  </div>
  <div class="flex flex-col gap-3 items-center justify-center">
    <button class="menu-button">Single Player</button>
    <button class="menu-button">Online</button>
    <button @click="showTutorial = true" class="menu-button">Tutorial</button>
    <ul>
      <li>asasdsadasd</li>
      <li>asasdsadasd</li>
    </ul>
  </div>
  <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  <TutorialModal v-if="showTutorial" @close="showTutorial = false" />
</template>

<script setup>
import { ref } from 'vue'
import RegisterModal from '../components/RegisterModal.vue'
import LoginModal from '../components/LoginModal.vue'
import TutorialModal from '../components/TutorialModal.vue'

// import { useGameStore } from '../stores/game'

const showRegisterModal = ref(false)
const showLoginModal = ref(false)
const showTutorial = ref(false)

// const gameStore = useGameStore()
</script>

<style scoped>
.btn {
  @apply py-2 px-4;
}
.menu-button {
  width: 180px;
}
</style>
