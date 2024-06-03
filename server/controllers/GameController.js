import GameService from "../services/GameService.js";

class GameController {
  async create(req, res) {
    try {
      const game = await GameService.create(req.body);
      res.status(201).json(game);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getAll(req, res) {
    try {
      const games = await GameService.getAll();
      res.json(games);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getAllByUserId(req, res) {
    try {
      const games = await GameService.getAllByUserId(req.params.userId);
      res.json(games);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const game = await GameService.getOne(req.params.id);
      res.json(game);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
  async update(req, res) {
    try {
      const updatedGame = await GameService.update(req.body._id, req.body);
      res.json(updatedGame);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const deletedGame = await GameService.delete(req.params.id);
      res.json(deletedGame);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new GameController();
