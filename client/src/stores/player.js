import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    playerState: { side: null, activeTurn: false, isSignedIn: false }
  }),
  actions: {
    changePlayerSide(newSide) {
      if (newSide != 'x' && newSide != 'y') throw new Error('Incorrect side value')
      this.playerState.side = newSide
    },
    swapPlayerSide() {
      if (this.playerState.side === null) throw new Error('Side is not chosen')
      this.playerState.side = this.playerState.side === 'x' ? 'y' : 'x'
    },
    setTurnTrue() {
      this.playerState.activeTurn = true
    },
    setTurnFalse() {
      this.playerState.activeTurn = false
    }
  }
})
