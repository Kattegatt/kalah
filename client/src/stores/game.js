import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    gameState: [
      { x1: 4 },
      { x2: 4 },
      { x3: 4 },
      { x4: 4 },
      { x5: 4 },
      { x6: 4 },
      { x7: 0 },
      { y1: 4 },
      { y2: 4 },
      { y3: 4 },
      { y4: 4 },
      { y5: 4 },
      { y6: 4 },
      { y7: 0 }
    ]
  }),
  actions: {
    resetGame() {
      const initialState = [
        { x1: 4 },
        { x2: 4 },
        { x3: 4 },
        { x4: 4 },
        { x5: 4 },
        { x6: 4 },
        { x7: 0 },
        { y1: 1 },
        { y2: 4 },
        { y3: 4 },
        { y4: 4 },
        { y5: 4 },
        { y6: 4 },
        { y7: 0 }
      ]

      initialState.forEach((newItem, index) => {
        const key = Object.keys(newItem)[0]
        const oldItem = this.gameState.find((item) => Object.keys(item)[0] === key)
        if (oldItem) {
          oldItem[key] = newItem[key]
        } else {
          this.gameState[index] = newItem
        }
      })
    },
    updateGameState(newState) {
      console.log('updateGameState ~ newState:', newState)
      newState.forEach((newItem, index) => {
        const key = Object.keys(newItem)[0]
        const oldItem = this.gameState.find((item) => Object.keys(item)[0] === key)
        if (oldItem) {
          oldItem[key] = newItem[key]
        } else {
          this.gameState[index] = newItem
        }
      })
    }
  }
})
