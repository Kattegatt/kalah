<template>
  <div>
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
  // setup() {
  //   const gameStore = useGameStore()

  //   const resetGame = () => {
  //     gameStore.resetGame()
  //   }

  //   const apiBase = `http://localhost:5000/api`
  //   const gameId = '665dc10057bf2e3bb944e976'
  //   const gameData = fetch(apiBase + '/games/' + gameId)
  //   gameData
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result)
  //       gameStore.updateGameState(result)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })

  //   return {
  //     gameState: gameStore.gameState,
  //     resetGame
  //   }
  // },
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
