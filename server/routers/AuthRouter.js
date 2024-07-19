import { Router } from "express";
import { check } from "express-validator";
import AuthMiddleware from "../middleware/authMiddleware.js";
import JwtService from "../services/JwtService.js";

const router = new Router();
router.get("/verify", AuthMiddleware.verifyAccessToken, async (req, res) => {
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

export default router;
