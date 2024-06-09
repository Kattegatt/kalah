import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post(
  "/",
  [
    check("username", "Username can not be empty").notEmpty(),
    check("email", "Email can not be empty").notEmpty(),
    check("password", "Password must consist more than 4 characters").isLength({
      min: 4,
    }),
  ],
  UserController.create
);
router.post(
  "/login",
  [check("email", "Email can not be empty").notEmpty()],
  UserController.login
);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.put("/", UserController.update);
router.delete("/:id", authMiddleware, UserController.delete);

export default router;
