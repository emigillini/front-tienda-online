import { UserManagerBD } from "../UserManagerBD.js";
import { logger } from "../logger.js";

const userman1 = new UserManagerBD();

export class JwtService {
  async getUserByEmail(email) {
    try {
      let userFound = await userman1.getByEmail(email);
      return userFound;
    } catch (error) {
      logger.error (error);
      throw new Error("Internal Server Error");
    }
  }
}