import UserService from "../services/UserService.js";

class UserController {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOne(req, res) {
    try {
      const user = await UserService.getOne(req.params.id);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      const updatedUser = await UserService.update(req.body._id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res) {
    try {
      const deletedUser = await UserService.delete(req.body._id);
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
