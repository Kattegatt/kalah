class Game {
  constructor(id, gameState, grains = 3, first) {
    this.isActive = false;
    this.id = id;
    this.currentPlayer = null;
    this.players = new Set();
    this.gameState = gameState || [
      { x1: grains },
      { x2: grains },
      { x3: grains },
      { x4: grains },
      { x5: grains },
      { x6: grains },
      { x7: 0 },
      { y1: grains },
      { y2: grains },
      { y3: grains },
      { y4: grains },
      { y5: grains },
      { y6: grains },
      { y7: 0 },
    ];
  }

  getGameState() {
    return this.gameState;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getPlayersArray() {
    return Array.from(this.players);
  }

  addPlayer(socketId) {
    if (this.players.has(socketId)) {
      console.error("Player already in the game");
    } else if (this.players.size >= 2) {
      console.error("There are already 2 players in the game");
    } else {
      this.players.add(socketId);
    }
  }

  async handleMove(data) {
    const { gameState, cellData } = data;
    let newGameState = [...gameState];
    const moveCell = Object.keys(cellData)[0];
    let grainCount = Object.values(cellData)[0];

    const skippableCellKey = moveCell.includes("x") ? "y7" : "x7";
    const storeKey = moveCell.includes("x") ? "x7" : "y7";

    const startIndex =
      gameState.findIndex((item) => Object.keys(item)[0] === moveCell) + 1;

    newGameState[startIndex - 1] = { [moveCell]: 0 };

    let i = 0;
    let extraTurn = false;
    while (grainCount > 0) {
      const cellKey =
        i >= 14
          ? String(Object.keys(newGameState[i - 14]))
          : String(Object.keys(gameState[i]));

      if (cellKey === skippableCellKey) {
        i++;
        continue;
      }

      if (i >= 14) {
        const oldCellValue = parseInt(Object.values(newGameState[i - 14]));
        newGameState[i - 14] = { [cellKey]: oldCellValue + 1 };
        grainCount -= 1;
      } else if (i >= startIndex) {
        const oldCellValue = parseInt(Object.values(gameState[i]));
        newGameState[i] = { [cellKey]: oldCellValue + 1 };
        grainCount -= 1;
      }

      if (grainCount === 0) {
        // handling last cell drop
        if (cellKey == "x7" || cellKey == "y7") {
          extraTurn = true;
        } else {
          newGameState = await this.#handleCapture(
            newGameState,
            cellKey,
            storeKey
          );
        }
      }
      i++;
    }
    this.gameState = newGameState;
    const gameOver = this.isGameOver();
    if (gameOver) {
      this.isActive = false;
    } else if (!extraTurn) this.switchPlayer();
    // return { newGameState, extraTurn };
  }

  async #handleCapture(state, landedCellKey, storeKey) {
    /* 
    if your grain lands on empty cell you claiming
    take opponent's grains from opposite cell
    + 1 your grain from cell it have landed
    */
    const storeInd = state.findIndex((obj) =>
      Object.prototype.hasOwnProperty.call(obj, storeKey)
    );
    const landedInd = parseInt(
      state.findIndex((obj) =>
        Object.prototype.hasOwnProperty.call(obj, landedCellKey)
      )
    );
    const oppositeInd = this._opposites[landedInd];

    const oppositeValue = Object.values(state[oppositeInd])[0];
    const storeValue = parseInt(Object.values(state[storeInd]));
    const oppositeKey = Object.keys(state[oppositeInd])[0];
    const landedOnEmpty = Object.values(state[landedInd])[0] == 1;
    const landOnPlayersCell =
      landedCellKey[0] == storeKey[0] && landedCellKey != storeKey;

    if (landOnPlayersCell && landedOnEmpty && oppositeValue > 0) {
      const sum = oppositeValue + 1 + storeValue;
      state[storeInd] = { [storeKey]: sum };
      state[landedInd] = { [landedCellKey]: 0 };
      state[oppositeInd] = { [oppositeKey]: 0 };
    }
    return state;
  }
  switchPlayer(playerId) {
    if (!playerId) {
      // Если playerId не передан, переключаем игрока
      if (this.players.size === 2) {
        // Преобразуем Set в массив для фильтрации
        const playersArray = Array.from(this.players);
        this.currentPlayer = playersArray.find(
          (id) => id !== this.currentPlayer
        );
      } else if (this.players.size === 1) {
        this.currentPlayer = Array.from(this.players)[0];
      }
    } else if (!this.players.has(playerId)) {
      // Если передан playerId, проверяем его наличие в игре
      throw new Error("there is no such player in the game");
    } else {
      this.currentPlayer = playerId;
    }

    if (!this.currentPlayer || !this.players.has(this.currentPlayer)) {
      throw new Error("Invalid current player");
    }
  }

  async isGameOver() {
    const playerXCells = await this.#getCells("x");
    const playerYCells = await this.#getCells("y");

    const playerXEmpty = playerXCells.every(
      (cell) => Object.values(cell)[0] === 0
    );
    const playerYEmpty = playerYCells.every(
      (cell) => Object.values(cell)[0] === 0
    );

    if (playerXEmpty) {
      this.#collectLeftGrains("y");
    } else if (playerYEmpty) {
      this.#collectLeftGrains("x");
    }

    return playerXEmpty || playerYEmpty;
  }

  async #collectLeftGrains(side) {
    const playerCells = await this.#getCells(side);
    const playerStoreKey = side === "x" ? "x7" : "y7";
    const playerStoreIndex = this.#getCellIndex(playerStoreKey);

    const sum = playerCells.reduce(
      (acc, cell) => acc + Object.values(cell)[0],
      0
    );

    this.gameState[playerStoreIndex] = { [playerStoreKey]: sum };

    // set every cell to 0
    playerCells.forEach((cell) => {
      const cellKey = Object.keys(cell)[0];
      const cellIndex = this.#getCellIndex(cellKey);
      this.gameState[cellIndex] = { [cellKey]: 0 };
    });
  }

  async #getCells(side) {
    return this.gameState.filter(
      (cell) =>
        Object.keys(cell)[0].includes(side) &&
        !Object.keys(cell)[0].includes("7")
    );
  }

  async #getCellIndex(cellKey) {
    return this.gameState.findIndex((cell) =>
      Object.keys(cell)[0].includes(cellKey)
    );
  }

  _opposites = {
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
    7: 5,
  };
}

export default Game;
