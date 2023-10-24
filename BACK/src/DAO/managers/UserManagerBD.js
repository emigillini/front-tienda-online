import { userModel } from "../models/user_model.js";
import { logger } from "../../logger.js";

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
      logger.error(error);
    }
  }
  async eliminarUsuario(id) {
    let result;
    try {
      result = await this.model.findByIdAndDelete(id);
    } catch (error) {
      logger.error(error);
    }

    return result;
  }

  async getByEmail(email) {
    let result;
    try {
      result = await userModel.findOne({ email: email });
    } catch (error) {
      logger.error(error);
    }

    return result;
  }
  async getById(id) {
    let result;
    try {
      result = await userModel.findOne({ _id: id });
    } catch (error) {
      logger.error(error);
    }

    return result;
  }

  async createUser(user) {
    let result;
    try {
      result = await userModel.create(user);
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
    }
    return result;
  }
}
