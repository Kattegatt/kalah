<template>
  <div v-if="!isSignedIn" class="flex justify-end gap-2">
    <button @click="showRegisterModal = true" class="btn">Sign Up</button>
    <button @click="showLoginModal = true" class="btn">Sign In</button>
  </div>
  <div class="flex items-center justify-center p-2 m-8">
    <h1 class="font-bold big text-2xl">kalah</h1>
  </div>
  <div class="flex flex-col gap-3 items-center justify-center">
    <button class="menu-button">Single Player</button>
    <button v-if="isSignedIn" class="menu-button">Online</button>
    <button @click="showTutorial = true" class="menu-button">Tutorial</button>
  </div>
  <RegisterModal
    v-if="showRegisterModal"
    @signedIn="setSignedIn"
    @close="showRegisterModal = false"
  />
  <LoginModal v-if="showLoginModal" @signedIn="setSignedIn" @close="showLoginModal = false" />
  <TutorialModal v-if="showTutorial" @close="showTutorial = false" />
</template>

<script setup>
import { ref, computed } from 'vue'
import RegisterModal from '../components/RegisterModal.vue'
import LoginModal from '../components/LoginModal.vue'
import TutorialModal from '../components/TutorialModal.vue'
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()
const playerState = playerStore.$state.playerState
const isSignedIn = computed(() => playerState.isSignedIn)

function setSignedIn() {
  console.log('setSignedIn')
  playerState.isSignedIn = true
}
const showRegisterModal = ref(false)
const showLoginModal = ref(false)
const showTutorial = ref(false)
</script>

<style scoped>
.btn {
  @apply py-2 px-4;
}
.menu-button {
  width: 180px;
}
</style>
