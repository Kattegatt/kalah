import GameController from "../controllers/GameController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

import { Router } from "express";

const router = new Router();

router.post("/", GameController.create);
router.get("/", GameController.getAll);
router.get(
  "/filter/:userId",
  AuthMiddleware.verifyAccessToken,
  GameController.getAllByUserId
);
router.get("/:id", GameController.getOne);
router.put("/", GameController.update);
router.patch("/:id", GameController.patch);
router.delete("/:id", GameController.delete);

export default router;
