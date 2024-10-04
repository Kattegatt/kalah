// socket.js
import { reactive } from 'vue'
import { io } from 'socket.io-client'
import router from './router'
import { usePlayerStore } from './stores/player'

export const socketState = reactive({
  gameId: null,
  connected: false,
  returnStateEvents: [],
  latestState: {},
  extraTurn: false
})

const URL = 'http://localhost:5000'
export const socket = io(URL)

export const initializeSocket = () => {
  const playerStore = usePlayerStore()
  socket.on('connect', () => {
    console.log(`Connected to server on id ${socket.id}`)
    socketState.connected = true
  })

  socket.on('disconnect', () => {
    socketState.connected = false
  })

  socket.on('newPlayer', ({ playerId }) => {
    console.log(`Player with id ${playerId} joined the game`)
  })

  socket.on('startGame', (id) => {
    console.log('GAME STARTED')

    router.push({ path: '/game', query: { id } })
  })

  socket.on('currentPlayer', ({ playerId }) => {
    if (playerId === socket.id) playerStore.setTurnTrue()
  })

  socket.on('error', (error) => {
    console.log(error)
  })
}

export const joinGame = (gameId, isFirstMove) => {
  socket.emit('joinGame', { gameId, isFirstMove })
}

export const createGame = (grains) => {
  socket.emit('createGame', grains)
}

export const deleteGame = () => {
  socket.emit('deleteGame')
}
