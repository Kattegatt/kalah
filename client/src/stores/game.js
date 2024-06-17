import { defineStore } from 'pinia'

const GRAINS = 2

export const useGameStore = defineStore('game', {
  state: () => ({
    gameState: [
      { x1: GRAINS },
      { x2: GRAINS },
      { x3: GRAINS },
      { x4: GRAINS },
      { x5: GRAINS },
      { x6: GRAINS },
      { x7: 0 },
      { y1: GRAINS },
      { y2: GRAINS },
      { y3: GRAINS },
      { y4: GRAINS },
      { y5: GRAINS },
      { y6: GRAINS },
      { y7: 0 }
    ]
  }),
  actions: {
    resetGame() {
      const initialState = [
        { x1: GRAINS },
        { x2: GRAINS },
        { x3: GRAINS },
        { x4: GRAINS },
        { x5: GRAINS },
        { x6: GRAINS },
        { x7: 0 },
        { y1: GRAINS },
        { y2: GRAINS },
        { y3: GRAINS },
        { y4: GRAINS },
        { y5: GRAINS },
        { y6: GRAINS },
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
