import GameModel from "../db_models/Game.js";

class GameService {
  async create(game) {
    try {
      const createdGame = await GameModel.create(game);
      return createdGame;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll() {
    const games = await GameModel.find();
    return games;
  }
  async handleMove(data) {
    const { gameState, cellData } = data;
    console.log("GameService ~ handleMove ~ gameState:", gameState);
    console.log("GameService ~ handleMove ~ cellData:", cellData);
    let newGameState = [...gameState];
    const moveCell = Object.keys(cellData)[0];
    let grainCount = Object.values(cellData)[0];

    const skippableCellKey = moveCell.includes("x") ? "y7" : "x7";
    console.log(
      "GameService ~ handleMove ~ skippableCellKey:",
      skippableCellKey
    );
    const storeKey = moveCell.includes("x") ? "x7" : "y7";
    console.log("GameService ~ handleMove ~ storeKey:", storeKey);

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

      console.log(
        `handleMove ~ cellKey: ${cellKey} -- skippableCellKey: ${skippableCellKey}`
      );

      if (cellKey === skippableCellKey) {
        console.log("skipping cell");
        console.log(`ITERATION ${i}\n`);

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
      console.log(`ITERATION ${i}\n--------------\n`);
      i++;
    }
    return { newGameState, extraTurn };
  }

  async handleCapture(state, landedCellKey, storeKey) {
    /* 
    if your grain lands on empty cell you claiming
    take opponent's grains from opposite cell
    + 1 your grain from cell it have landed
    */
    console.log("handleCapture triggerd");
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

  async getAllByUserId(userId) {
    // get all games that user participated in
    if (!userId) throw new Error("id not provided");
    const games = await GameModel.find({
      $or: [{ player1: userId }, { player2: userId }],
    });
    if (games) {
      return games;
    } else throw new Error("games not found");
  }

  async getOne(gameId) {
    if (!gameId) throw new Error("id not provided");
    const game = await GameModel.findById(gameId);
    if (game) {
      return game;
    } else throw new Error("game not found");
  }

  async update(gameId, game) {
    if (!gameId) throw new Error("id not provided");
    const updatedGame = await GameModel.findOneAndUpdate(
      { _id: gameId },
      game,
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedGame) {
      return updatedGame;
    } else throw new Error("game not found");
  }

  async delete(gameId) {
    if (!gameId) throw new Error("id not provided");
    const deletedGame = await GameModel.findOneAndDelete({ _id: gameId });
    console.log("GameService ~ delete ~ deletedGame:", deletedGame);
    if (deletedGame) {
      return deletedGame;
    } else throw new Error("game not found");
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

export default new GameService();
