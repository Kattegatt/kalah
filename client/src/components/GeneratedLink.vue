<template>
  <form class="yorha-border container">
    <figure class>{{ inviteLink }}</figure>
    <button type="button" @click="copyLink" class="w-1/2">Copy</button>
  </form>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { socket, joinGame, createGame } from '@/socket'

const emit = defineEmits(['inviteLink'])
const emitLink = (val) => {
  emit('link', val)
}

let inviteLink = ref('')

onBeforeMount(() => {
  const link = window.location.href
  if (link.split('?').pop().startsWith('game=')) {
    const gameId = link.split('game=').pop()
    joinGame(gameId)
  } else {
    createGame()
  }
})

socket.on('createdGame', (gameId) => {
  console.log(`game created with id: ${gameId}`)
  inviteLink.value = createInviteLink(gameId)
  emitLink(inviteLink.value)
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
    .then(() => {})
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
