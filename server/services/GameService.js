import Game from "../models/Game.js";

class GameService {
  async create(game) {
    const createdGame = await Game.create(game);
    return createdGame;
  }
  async getAll() {
    const games = await Game.find();
    return games;
  }
  async handleMove(gameState, cellData) {
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
        i >= 13
          ? String(Object.keys(newGameState[i - 13]))
          : String(Object.keys(gameState[i]));

      if (cellKey === skippableCellKey) {
        i++;
        continue;
      }

      if (i >= 13) {
        const oldCellValue = parseInt(Object.values(newGameState[i - 13]));
        newGameState[i - 13] = { [cellKey]: oldCellValue + 1 };
        grainCount -= 1;
      } else if (i >= startIndex) {
        const oldCellValue = parseInt(Object.values(gameState[i]));
        newGameState[i] = { [cellKey]: oldCellValue + 1 };
        grainCount -= 1;
      }

      if (grainCount === 0) {
        if (cellKey == "x7" || cellKey == "y7") {
          extraTurn = true;
        } else {
          newGameState = this.handleCapture(newGameState, cellKey, storeKey);
        }
      }
      i++;
    }
    return { newGameState, extraTurn };
  }

  async handleCapture(state, landedCellKey, storeKey) {
    const storeInd = state.findIndex((obj) =>
      Object.prototype.hasOwnProperty.call(obj, storeKey)
    );
    const landedInd = state.findIndex((obj) =>
      Object.prototype.hasOwnProperty.call(obj, landedCellKey)
    );
    const oppositeInd = this.opposites[landedInd];
    console.log("GameService ~ handleCapture ~ oppositeInd:", oppositeInd);

    if (!oppositeInd) return state;

    const oppositeValue = Object.values(state[oppositeInd])[0];
    const oppositeKey = Object.keys(state[oppositeInd])[0];
    const landedOnEmpty = Object.values(state[landedInd])[0] == 1;
    const landOnPlayersCell =
      landedCellKey[0] == storeKey[0] && landedCellKey != storeKey;

    if (landOnPlayersCell && landedOnEmpty && oppositeValue > 0) {
      const sum = oppositeValue + 1;
      state[storeInd] = { [storeKey]: sum };
      state[landedInd] = { [landedCellKey]: 0 };
      state[oppositeInd] = { [oppositeKey]: 0 };
    }
    return state;
  }
  async getAllByUserId(userId) {
    // get all games that user participated in
    if (!userId) throw new Error("id not provided");
    const games = await Game.find({
      $or: [{ player1: userId }, { player2: userId }],
    });
    if (games) {
      return games;
    } else throw new Error("games not found");
  }
  async getOne(gameId) {
    if (!gameId) throw new Error("id not provided");
    const game = await Game.findById(gameId);
    if (game) {
      return game;
    } else throw new Error("game not found");
  }
  async update(gameId, game) {
    if (!gameId) throw new Error("id not provided");
    const updatedGame = await Game.findOneAndUpdate({ _id: gameId }, game, {
      new: true,
      runValidators: true,
    });
    if (updatedGame) {
      return updatedGame;
    } else throw new Error("game not found");
  }
  async delete(gameId) {
    if (!gameId) throw new Error("id not provided");
    const deletedGame = await Game.findOneAndDelete({ _id: gameId });
    console.log("GameService ~ delete ~ deletedGame:", deletedGame);
    if (deletedGame) {
      return deletedGame;
    } else throw new Error("game not found");
  }
  static opposites = {
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
