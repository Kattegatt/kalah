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
}

export default new GameService();
