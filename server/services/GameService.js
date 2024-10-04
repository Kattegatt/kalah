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

  async patch(gameId, game) {
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
}

export default new GameService();
