import { UserManagerBD } from "../DAO/UserManagerBD.js";

const userManager1 = new UserManagerBD();

export class UserService {
  async getByEmail(email) {
    try {
      const user = await userManager1.getByEmail(email);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuario");
    }
  }

  async updatePassword(email, newPassword) {
    try {
      const updatedPasword = await userManager1.updatePassword(
        email,
        newPassword
      );
      return updatedPasword;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar password");
    }
  }

  async createUser(user) {
    try {
      const newuser = await userManager1.createUser(user);
      return newuser;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear usuario");
    }
  }

  async getAllUsers() {
    try {
      const users = await userManager1.getAll();
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error alpbtener usuarios");
    }
  }

  async getUserById(id) {
    try {
      const user = await userManager1.getById(id);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuario por id");
    }
  }
}
