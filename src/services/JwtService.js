import { UserManagerBD } from "../UserManagerBD.js";

const userman1 = new UserManagerBD();

export class JwtService {
  async getUserByEmail(email) {
    try {
      let userFound = await userman1.getByEmail(email);
      return userFound;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }
}