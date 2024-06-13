import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const socketState = reactive({
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
  console.log(`Player with id ${playerId} connected joined the game`)
})

export const joinGame = (gameId) => {
  socket.emit('joinGame', gameId)
}
// socket.on('returnState', (args) => {
//   console.log('socket.on ~ args:', args)
//   const { newGameState, extraTurn } = args
//   socketState.returnStateEvents.push(args)
//   socketState.latestState = newGameState
//   socketState.extraTurn = extraTurn
// })
