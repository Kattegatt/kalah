import GameController from "../controllers/GameController.js";
import { Router } from "express";

const router = new Router();

router.post("/", GameController.create);
router.get("/", GameController.getAll);
router.get("/filter/:userId", GameController.getAllByUserId);
router.get("/:id", GameController.getOne);
router.put("/", GameController.update);
router.delete("/:id", GameController.delete);

export default router;
