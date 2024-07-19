import jwtService from "../services/JwtService.js";

class AuthMiddleware {
  async verifyAccessToken(req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "Not authorized" });
      }
      const decodedData = jwtService.verifyAccessToken(token);
      req.user = decodedData;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Not authorized" });
    }
  }

  async verifyRefreshToken(req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(401);
      const decodedData = await jwtService.verifyRefreshToken(refreshToken);

      req.user = decodedData;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Not authorized" });
    }
  }
}

export default new AuthMiddleware();
