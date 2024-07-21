<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="text-3xl mb-4 text-center">Kalah</h1>
    <div v-if="!isLobbyOpened" class="flex flex-col gap-3 items-center justify-center">
      <button class="w-44">Find Game</button>
      <button class="w-44" @click="localLobbyOpened = true">Local</button>
    </div>
    <!-- <WinRecords /> -->
    <PrivateGame v-if="localLobbyOpened" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import PrivateGame from '../components/PrivateGame.vue'
import WinRecords from '../components/WinRecords.vue'
const localLobbyOpened = ref(false)
const findGameOpened = ref(false)

const isLobbyOpened = computed(() => localLobbyOpened.value || findGameOpened.value)
</script>

<style scoped></style>
