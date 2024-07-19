import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { check } from "express-validator";
import AuthMiddleware from "../middleware/authMiddleware.js";
import JwtService from "../services/JwtService.js";

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
router.get("/refresh", AuthMiddleware.verifyRefreshToken, async (req, res) => {
  try {
    const { _id, username, email } = req.user;
    const payload = { _id, username, email };
    const { token, refreshToken } = await JwtService.getTokens(payload);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.put("/", UserController.update);
router.delete("/:id", AuthMiddleware.verifyAccessToken, UserController.delete);

export default router;
