<template>
  <div v-if="!isSignedIn" class="flex justify-end gap-2">
    <n-button @click="showRegisterModal = true" class="btn">Sign Up</n-button>
    <n-button @click="showLoginModal = true" class="btn">Sign In</n-button>
    <!-- <button @click="showRegisterModal = true" class="btn">Sign Up</button> -->
    <!-- <button @click="showLoginModal = true" class="btn">Sign In</button> -->
  </div>
  <div class="flex items-center justify-center p-2 m-8">
    <h1 class="font-bold big text-2xl">Kalah</h1>
  </div>
  <div class="flex flex-col gap-3 items-center justify-center">
    <n-button class="menu-button" type="tertiary" @click="SinglePlayerRoute"
      >Single Player</n-button
    >
    <n-button v-if="isSignedIn" class="menu-button" @click="lobbyRoute">Online</n-button>
    <n-button @click="showTutorial = true" class="menu-button">Tutorial</n-button>
  </div>
  <n-modal v-model:show="showRegisterModal">
    <RegisterModal @signedIn="setSignedIn" @close="showRegisterModal = false" />
  </n-modal>
  <n-modal v-model:show="showLoginModal">
    <LoginModal @signedIn="setSignedIn" @close="showLoginModal = false" />
  </n-modal>
  <n-modal v-model:show="showTutorial">
    <TutorialModal @close="showTutorial = false" />
  </n-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import RegisterModal from '../components/RegisterModal.vue'
import LoginModal from '../components/LoginModal.vue'
import TutorialModal from '../components/TutorialModal.vue'
import { usePlayerStore } from '../stores/player'
import router from '../router/index.js'
import SinglePlayer from './SinglePlayer.vue'

//components
import { NButton, NModal } from 'naive-ui'

const lobbyRoute = () => {
  router.push({ path: '/lobby' })
}

const SinglePlayerRoute = () => {
  router.push({ path: '/singleplayer' })
}
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
  width: 12rem;
  height: 3rem;
  @apply py-2 px-4;
}
</style>
