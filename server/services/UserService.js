import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwtService from "./jwt.js";

class UserService {
  async create(user) {
    const { username, email, password } = user;
    const candidate = await User.findOne({
      $or: [({ username: username }, { email: email })],
    });
    if (candidate) {
      throw new Error("User already exists");
    }
    const salt = await bcryptjs.genSalt();
    const hashedPass = await bcryptjs.hash(password, salt);
    user = { username, email, password: hashedPass };
    const createdUser = await User.create(user);

    const payload = {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
    };

    const token = jwtService.generateAccessToken(payload);
    const refreshToken = jwtService.generateRefreshToken(payload);

    return { token, refreshToken };
  }
  async login(user) {
    const { email, password } = user;
    const exist = await User.findOne({ email });
    if (!exist) {
      throw new Error("User not found");
    }
    const validPass = bcryptjs.compare(password, exist.password);
    if (!validPass) throw new Error("Invalid password");
    const payload = {
      _id: exist._id,
      username: exist.username,
      email: exist.email,
    };
    const token = jwtService.generateAccessToken(payload);
    const refreshToken = jwtService.generateRefreshToken(payload);
    return { token, refreshToken };
  }
  async getAll() {
    const users = await User.find();
    return users;
  }
  async getOne(userId) {
    if (!userId) throw new Error("id not provided");
    const user = await User.findById(userId);
    if (user) {
      return user;
    } else throw new Error("user not found");
  }
  async update(userId, user) {
    if (!userId) throw new Error("id not provided");
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, user, {
      new: true,
      runValidators: true,
    });
    if (updatedUser) {
      return updatedUser;
    } else throw new Error("user not found");
  }
  async delete(userId) {
    if (!userId) throw new Error("id not provided");
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      return deletedUser;
    } else throw new Error("user not found");
  }
}

export default new UserService();
