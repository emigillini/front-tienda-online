import { userModel } from "../models/user_model.js";

export class UserManagerBD {
  constructor() {
    this.model = userModel;
  }

  async getAll() {
    let result;
    try {
      result = await this.model.find();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    let result;
    try {
      result = await userModel.findOne({ email: email });
    } catch (error) {
      console.log(error);
    }

    return result;
  }
  async getById(id) {
    let result;
    try {
      result = await userModel.findOne({ _id: id });
    } catch (error) {
      console.log(error);
    }

    return result;
  }

  async createUser(user) {
    let result;
    try {
      result = await userModel.create(user);
    } catch (error) {
      console.log(error);
    }

    return result;
  }
  async updatePassword(email, newPassword) {
    let result;
    try {
      result = await userModel.updateOne(
        { email: email },
        { $set: { password: newPassword } }
      );
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
