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
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      return new Error("Invalid token");
    }
  }

  async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, refreshSecret);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  async getTokens(payload) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    if (!accessToken || !refreshToken) {
      throw new Error("Invalid token");
    }
    return { accessToken, refreshToken };
  }
}

export default new JwtService();
