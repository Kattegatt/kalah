import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET_KEY;

class jwtService {
  async generateAccessToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }
}

export default new jwtService();
