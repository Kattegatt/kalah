import GameController from "../controllers/GameController.js";
import { Router } from "express";

const router = new Router();

router.post("/games", GameController.create);
router.get("/games", GameController.getAll);
router.get("/games/filter/:userId", GameController.getAllByUserId);
router.get("/games/:id", GameController.getOne);
router.put("/games", GameController.update);
router.delete("/games/:id", GameController.delete);

export default router;
