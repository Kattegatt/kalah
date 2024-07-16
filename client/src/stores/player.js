import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    userState: { side: null, activeTurn: false, isSignedIn: false }
  }),
  actions: {
    changePlayerSide(newSide) {
      if (newSide != 'x' && newSide != 'y') throw new Error('Incorrect side value')
      this.userState.side = newSide
    },
    swapPlayerSide() {
      if (this.userState.side === null) throw new Error('Side is not chosen')
      this.userState.side = this.userState.side === 'x' ? 'y' : 'x'
    },
    setTurnTrue() {
      this.userState.activeTurn = true
    },
    setTurnFalse() {
      this.userState.activeTurn = false
    }
  }
})
