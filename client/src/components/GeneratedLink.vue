<template>
  <n-space vertical>
    <!-- <n-loading-bar-provider :to="linkCard"> -->
    <n-card ref="linkCard" v-show="inviteLink">
      <n-text>{{ inviteLink }}</n-text>
    </n-card>
    <!-- </n-loading-bar-provider> -->
    <div class="flex flex-row justify-evenly gap-2">
      <n-button @click="emit('back')">Back</n-button>
      <n-button v-show="inviteLink" @click="copyLink">Copy</n-button>
    </div>
  </n-space>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { NButton, NCard, NText, NSpace } from 'naive-ui'
import { socket, joinGame, createGame } from '@/socket'
import { usePlayerStore } from '../stores/player'

const props = defineProps({
  grains: {
    type: Number,
    required: false
  },
  firstPlayer: {
    type: Boolean,
    required: false
  }
})
const playerStore = usePlayerStore()
// const playerState = playerStore.$state.playerState

// Loading Bar
// const loadingBar = useLoadingBar()
// const handleLoadingStart = () => {
//   loadingBar.start()
// }
// const handleLoadingFinish = () => {
//   loadingBar.finish()
// }
// const handleLoadingError = () => {
//   loadingBar.error()
// }

const emit = defineEmits(['link'])
const emitLink = (val) => {
  emit('link', val)
}

let inviteLink = ref('')

onBeforeMount(() => {
  const link = window.location.href
  if (link.split('?').pop().startsWith('game=')) {
    const gameId = link.split('game=').pop()
    joinGame(gameId)
    // Set Player Side to y (second player)
    playerStore.changePlayerSide('y')
  } else {
    createGame(grains, firstPlayer)
  }
})

// ЯК ВИДАЛЯТИ ГРУ ТІЛЬКИ ПРИ ЗАКРИТТІ ЛОББІ
// АЛЕ НЕ ВИДАЛЯТИ ПРИ ЗНАХОДЖЕННІ ГРИ Й ПЕРЕКЛЮЧЕННІ НА ГЕЙМБОАРД
onUnmounted(() => {
  socket.off('createdGame')
})

socket.on('createdGame', (gameId) => {
  console.log(`game created with id: ${gameId}`)
  inviteLink.value = createInviteLink(gameId)
  emitLink(inviteLink.value)
  joinGame(gameId, firstPlayer)
  playerStore.changePlayerSide('x')
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
