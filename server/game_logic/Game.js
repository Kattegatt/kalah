// server/gameLogic/Game.js

class Game {
  constructor(id, gameState, currentPlayer = "x") {
    this.isActive = true;
    this.id = id;
    this.currentPlayer = currentPlayer;
    this.gameState = gameState || [
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
      { y7: 0 },
    ];
  }

  getGameState() {
    return this.gameState;
  }

  async handleMove(data) {
    const { gameState, cellData } = data;
    let newGameState = [...gameState];
    const moveCell = Object.keys(cellData)[0];
    let grainCount = Object.values(cellData)[0];

    const skippableCellKey = moveCell.includes("x") ? "y7" : "x7";
    // console.log(
    //   "GameService ~ handleMove ~ skippableCellKey:",
    //   skippableCellKey
    // );
    const storeKey = moveCell.includes("x") ? "x7" : "y7";
    // console.log("GameService ~ handleMove ~ storeKey:", storeKey);

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
        // console.log("skipping cell");
        // console.log(`ITERATION ${i}\n`);

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
          newGameState = await this.handleCapture(
            newGameState,
            cellKey,
            storeKey
          );
        }
      }
      //   console.log(`ITERATION ${i}\n--------------\n`);
      i++;
    }
    this.gameState = newGameState;
    const gameOver = this.isGameOver();
    if (gameOver) {
      this.isActive = false;
    } else if (!extraTurn) this.switchPlayer();
    // return { newGameState, extraTurn };
  }

  async handleCapture(state, landedCellKey, storeKey) {
    /* 
    if your grain lands on empty cell you claiming
    take opponent's grains from opposite cell
    + 1 your grain from cell it have landed
    */
    // console.log("handleCapture triggerd");
    const storeInd = state.findIndex((obj) =>
      Object.prototype.hasOwnProperty.call(obj, storeKey)
    );
    const landedInd = parseInt(
      state.findIndex((obj) =>
        Object.prototype.hasOwnProperty.call(obj, landedCellKey)
      )
    );
    const oppositeInd = this._opposites[landedInd];
    console.log("GameService ~ handleCapture ~ oppositeInd:", oppositeInd);

    const oppositeValue = Object.values(state[oppositeInd])[0];
    console.log("GameService ~ handleCapture ~ oppositeValue:", oppositeValue);
    const storeValue = parseInt(Object.values(state[storeInd]));
    const oppositeKey = Object.keys(state[oppositeInd])[0];
    const landedOnEmpty = Object.values(state[landedInd])[0] == 1;
    console.log("GameService ~ handleCapture ~ landedOnEmpty:", landedOnEmpty);
    const landOnPlayersCell =
      landedCellKey[0] == storeKey[0] && landedCellKey != storeKey;
    console.log(
      "GameService ~ handleCapture ~ landOnPlayersCell:",
      landOnPlayersCell
    );

    if (landOnPlayersCell && landedOnEmpty && oppositeValue > 0) {
      const sum = oppositeValue + 1 + storeValue;
      console.log(`GOOOOOOOL~~ sum: ${sum}`);
      state[storeInd] = { [storeKey]: sum };
      state[landedInd] = { [landedCellKey]: 0 };
      state[oppositeInd] = { [oppositeKey]: 0 };
    }
    return state;
  }
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "x" ? "y" : "x";
  }

  isGameOver() {
    // if false return false if true return winner
    const playerXCells = this.gameState.filter(
      (cell) =>
        Object.keys(cell)[0].includes("x") &&
        !Object.keys(cell)[0].includes("7")
    );
    const playerYCells = this.gameState.filter(
      (cell) =>
        Object.keys(cell)[0].includes("y") &&
        !Object.keys(cell)[0].includes("7")
    );

    const playerXEmpty = playerXCells.every(
      (cell) => Object.values(cell)[0] === 0
    );
    const playerYEmpty = playerYCells.every(
      (cell) => Object.values(cell)[0] === 0
    );

    return playerXEmpty || playerYEmpty;
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
