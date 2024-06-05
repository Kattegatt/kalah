import UserController from "../controllers/UserController.js";
import { Router } from "express";
import { check } from "express-validator";
const router = new Router();

router.post(
  "/users",
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
  "/users/login",
  [check("email", "Email can not be empty").notEmpty()],
  UserController.login
);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getOne);
router.put("/users", UserController.update);
router.delete("/users/:id", UserController.delete);

export default router;
