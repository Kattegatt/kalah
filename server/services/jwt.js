import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY;
const refreshSecret = process.env.REFRESH_SECRET_KEY;

class JwtService {
  generateAccessToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }
  generateRefreshToken(payload) {
    return jwt.sign(payload, refreshSecret, { expiresIn: "30d" });
  }
  verifyAccessToken(token) {
    return jwt.verify(token, secret);
  }
}

export default new JwtService();
