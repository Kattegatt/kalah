// stores/singlePlayerGame.js
import { defineStore } from 'pinia'

export const useSinglePlayerGameStore = defineStore('singlePlayerGame', {
  state: () => ({
    gameState: [],
    currentPlayer: 'x',
    winner: false,
    isDraw: false,
    isActive: null,
    grains: 2,
    _opposites: {
      0: 12,
      1: 11,
      2: 10,
      3: 9,
      4: 8,
      5: 7,
      12: 0,
      11: 1,
      10: 2,
      9: 3,
      8: 4,
      7: 5
    }
  }),
  actions: {
    getWinner() {
      return this.winner
    },
    getIsDraw() {
      return this.isDraw
    },
    triggerBotsMove() {
      this.currentPlayer = 'z'
      setTimeout(() => (this.currentPlayer = 'y'), 100)
    },
    resetGame(player) {
      this.gameState = [
        { x1: this.grains },
        { x2: this.grains },
        { x3: this.grains },
        { x4: this.grains },
        { x5: this.grains },
        { x6: this.grains },
        { x7: 0 },
        { y1: this.grains },
        { y2: this.grains },
        { y3: this.grains },
        { y4: this.grains },
        { y5: this.grains },
        { y6: this.grains },
        { y7: 0 }
      ]
      this.currentPlayer = player ? player : 'x'
      this.isActive = true
      if (this.currentPlayer == 'y') this.triggerBotsMove()
    },
    calcWinner() {
      if (!this.isGameOver()) {
        throw new Error('Game is not over')
      } else {
        const playerXStore = this.gameState.filter(
          (cell) => Object.keys(cell)[0].includes('x') && Object.keys(cell)[0].includes('7')
        )[0]['x7']
        const playerYStore = this.gameState.filter(
          (cell) => Object.keys(cell)[0].includes('y') && Object.keys(cell)[0].includes('7')
        )[0]['y7']
        if (playerXStore === playerYStore) {
          this.isDraw = true
          return
        }
        if (playerXStore > playerYStore) {
          this.winner = 'x'
          return
        }
        if (playerXStore < playerYStore) {
          this.winner = 'y'
          return
        }
      }
    },
    setGrains(number) {
      this.grains = number
    },
    async handleMove(cellData) {
      const gameState = this.gameState
      let newGameState = [...gameState]
      const moveCell = Object.keys(cellData)[0]
      let grainCount = Object.values(cellData)[0]

      const skippableCellKey = moveCell.includes('x') ? 'y7' : 'x7'
      const storeKey = moveCell.includes('x') ? 'x7' : 'y7'

      const startIndex = gameState.findIndex((item) => Object.keys(item)[0] === moveCell) + 1

      newGameState[startIndex - 1] = { [moveCell]: 0 }

      let i = startIndex
      let extraTurn = false
      while (grainCount > 0) {
        const cellKey =
          i >= 14 ? String(Object.keys(newGameState[i - 14])) : String(Object.keys(gameState[i]))

        if (cellKey === skippableCellKey) {
          i++
          continue
        }

        if (i >= 14) {
          const oldCellValue = parseInt(Object.values(newGameState[i - 14]))
          newGameState[i - 14] = { [cellKey]: oldCellValue + 1 }
        } else {
          const oldCellValue = parseInt(Object.values(gameState[i]))
          newGameState[i] = { [cellKey]: oldCellValue + 1 }
        }
        grainCount -= 1

        if (grainCount === 0) {
          // handling last cell drop
          if (cellKey == 'x7' || cellKey == 'y7') {
            extraTurn = true
          } else {
            newGameState = await this.handleCapture(newGameState, cellKey, storeKey)
          }
        }
        i++
      }

      this.gameState = newGameState
      const gameOver = this.isGameOver()
      if (gameOver) {
        this.collectAllGrains()
        this.isActive = false
      } else if (!extraTurn) {
        this.switchPlayer()
      } else if (this.currentPlayer == 'y' && extraTurn) this.triggerBotsMove()
    },
    async handleCapture(state, landedCellKey, storeKey) {
      const storeInd = state.findIndex((obj) => Object.prototype.hasOwnProperty.call(obj, storeKey))
      const landedInd = parseInt(
        state.findIndex((obj) => Object.prototype.hasOwnProperty.call(obj, landedCellKey))
      )
      const oppositeInd = this._opposites[landedInd]
      const oppositeValue = parseInt(Object.values(state[oppositeInd])[0])
      const storeValue = parseInt(Object.values(state[storeInd]))
      const oppositeKey = Object.keys(state[oppositeInd])[0]
      const landedOnEmpty = Object.values(state[landedInd])[0] == 1
      const landOnPlayersCell = landedCellKey[0] == storeKey[0] && landedCellKey != storeKey

      if (landOnPlayersCell && landedOnEmpty && oppositeValue > 0) {
        const sum = oppositeValue + 1 + storeValue
        state[storeInd] = { [storeKey]: sum }
        state[landedInd] = { [landedCellKey]: 0 }
        state[oppositeInd] = { [oppositeKey]: 0 }
      }
      return state
    },
    switchPlayer(player) {
      if (!player) {
        this.currentPlayer = this.currentPlayer === 'x' ? 'y' : 'x'
      } else {
        this.currentPlayer = player
      }
    },
    handleBotMove() {
      if (this.currentPlayer != 'y') {
        console.log("Bot can't move, player is not switched")
        return
      }
      const botCells = this.gameState.filter(
        (cell) =>
          Object.keys(cell)[0].startsWith('y') &&
          Object.values(cell)[0] > 0 &&
          !Object.keys(cell)[0].includes('7')
      )
      if (botCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * botCells.length)
        const botMove = botCells[randomIndex]
        this.handleMove(botMove)
      }
    },
    isGameOver() {
      return this.isXCellsEmpty() || this.isYCellsEmpty()
    },
    collectAllGrains() {
      if (!this.isXCellsEmpty()) {
        const xStore = this.gameState.filter(
          (cell) => Object.keys(cell)[0].includes('x') && Object.keys(cell)[0].includes('7')
        )
        console.log('xStore: ', xStore)
        const xStoreValue = parseInt(Object.values(xStore[0])[0])
        const xStoreKey = Object.keys(xStore[0])[0]
        const allXCells = this.gameState.filter(
          (cell) => Object.keys(cell)[0].includes('x') && !Object.keys(cell)[0].includes('7')
        )
        const allXCellsSum = allXCells.reduce(
          (acc, cell) => acc + parseInt(Object.values(cell)[0]),
          0
        )
        allXCells.forEach((cell) => {
          Object.values(cell)[0] = 0
        })

        const sum = allXCellsSum + xStoreValue
        this.gameState[6] = { [xStoreKey]: sum }
      }
      if (!this.isYCellsEmpty()) {
        const yStore = this.gameState.filter(
          (cell) => Object.keys(cell)[0].includes('y') && Object.keys(cell)[0].includes('7')
        )
        const yStoreValue = parseInt(Object.values(yStore[0])[0])
        const yStoreKey = Object.keys(yStore[0])[0]
        const allYCells = this.gameState.filter(
          (cell) => Object.keys(cell)[0].includes('y') && !Object.keys(cell)[0].includes('7')
        )
        const allYCellsSum = allYCells.reduce(
          (acc, cell) => acc + parseInt(Object.values(cell)[0]),
          0
        )
        allYCells.forEach((cell) => {
          Object.values(cell)[0] = 0
        })

        const sum = allYCellsSum + yStoreValue
        this.gameState[13] = { [yStoreKey]: sum }
      }
    },
    isXCellsEmpty() {
      const playerXCells = this.gameState.filter(
        (cell) => Object.keys(cell)[0].includes('x') && !Object.keys(cell)[0].includes('7')
      )
      const playerXEmpty = playerXCells.every((cell) => Object.values(cell)[0] === 0)
      return playerXEmpty
    },
    isYCellsEmpty() {
      const playerYCells = this.gameState.filter(
        (cell) => Object.keys(cell)[0].includes('y') && !Object.keys(cell)[0].includes('7')
      )
      const playerYEmpty = playerYCells.every((cell) => Object.values(cell)[0] === 0)
      return playerYEmpty
    }
  }
})
