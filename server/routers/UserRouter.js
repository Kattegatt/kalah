import UserController from "../controllers/UserController.js";
import { Router } from "express";

const router = new Router();

router.post("/users", UserController.create);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getOne);
router.put("/users", UserController.update);
router.delete("/users/:id", UserController.delete);

export default router;
