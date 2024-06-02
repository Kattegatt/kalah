import User from "../models/User.js";

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }
  async getAll() {
    const users = await User.find();
    return users;
  }
  async getOne(userId) {
    if (!userId) throw new Error("id not provided");
    const user = await User.findById(userId);
    return user;
  }
  async update(userId, user) {
    if (!userId) throw new Error("id not provided");
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, user);
    return updatedUser;
  }
  async delete(userId) {
    if (!userId) throw new Error("id not provided");
    const deletedUser = User.findOneAndDelete({ _id: userId });
    return deletedUser;
  }
}

export default new UserService();
