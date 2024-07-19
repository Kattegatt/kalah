import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY;
const refreshSecret = process.env.REFRESH_SECRET_KEY;

class JwtService {
  async generateAccessToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }
  async generateRefreshToken(payload) {
    return jwt.sign(payload, refreshSecret, { expiresIn: "30d" });
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, secret);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, refreshSecret);
  }

  async getTokens(payload) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }
}

export default new JwtService();
