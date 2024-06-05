import UserService from "../services/UserService.js";
import { validationResult } from "express-validator";

class UserController {
  async create(req, res) {
    const validationErrors = validationResult(req);
    if (validationErrors.errors.length) {
      res.status(400).json({ message: "Validation error", validationErrors });
      return;
    }
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      if (error.message === "user already exists") {
        res.status(409).json(error.message);
      } else {
        res.status(500).json(error.message);
      }
    }
  }
  async login(req, res) {
    const validationErrors = validationResult(req);
    if (validationErrors.errors.length) {
      res.status(400).json({ message: "Validation error", validationErrors });
      return;
    }
    try {
      const user = await UserService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  }
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const user = await UserService.getOne(req.params.id);
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
  async update(req, res) {
    try {
      const updatedUser = await UserService.update(req.body._id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const deletedUser = await UserService.delete(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new UserController();
