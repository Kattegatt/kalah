<template>
  <form v-if="inviteLink" class="yorha-border container">
    <figure class>{{ inviteLink }}</figure>
    <button type="button" @click="copyLink" class="w-1/2">Copy</button>
  </form>
  <CircleLoader v-if="!inviteLink" />
</template>

<script setup>
import CircleLoader from './CircleLoader.vue'
import { ref, onBeforeMount } from 'vue'
import { socket, joinGame, createGame } from '@/socket'

let inviteLink = ref('')

onBeforeMount(() => {
  const link = window.location.href
  if (link.split('?').pop().startsWith('game=')) {
    const gameId = link.split('game=').pop()
    joinGame(gameId)
    // ROUTE TO THE GAME LOGIC
  } else {
    createInviteLink()
    createGame()
  }
})

socket.on('createdGame', (gameId) => {
  console.log(`game created with id: ${gameId}`)
  // socketState.gameId = gameId
  inviteLink.value = createInviteLink(gameId)
  joinGame(gameId)
})

function createInviteLink(id) {
  const url = window.location.href
  console.log(url)
  const res = url + '?game=' + id
  return res
}

function copyLink() {
  navigator.clipboard
    .writeText(inviteLink.value)
    .then(() => {
      console.log('Link copied to clipboard')
    })
    .catch((err) => {
      console.error('Failed to copy link: ', err)
    })
}
</script>

<style scoped>
.container {
  @apply flex flex-col place-items-center min-w-fit  min-h-fit;
  padding: 1rem;
}
</style>
