import { reactive } from 'vue'
import { io } from 'socket.io-client'
import router from './router'

export const socketState = reactive({
  gameId: null,
  connected: false,
  returnStateEvents: [],
  latestState: {},
  extraTurn: false
})

const URL = 'http://localhost:5050'

export const socket = io(URL)

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

export const joinGame = (gameId) => {
  socket.emit('joinGame', gameId)
}

export const createGame = () => {
  socket.emit('createGame')
}
// socket.on('returnState', (args) => {
//   console.log('socket.on ~ args:', args)
//   const { newGameState, extraTurn } = args
//   socketState.returnStateEvents.push(args)
//   socketState.latestState = newGameState
//   socketState.extraTurn = extraTurn
// })
