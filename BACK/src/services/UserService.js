import { UserManagerBD } from "../DAO/managers/UserManagerBD.js";
import { userDTO } from "../DAO/DTOS/userDto.js";
import { logger } from "../logger.js";

const userManager1 = new UserManagerBD();

export class UserService {
  async getByEmail(email) {
    try {
      const user = await userManager1.getByEmail(email);
      return user;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener usuario");
    }
  }

  async eliminarUsuario(userId) {
    try {
      const user = await userManager1.eliminarUsuario(userId);
      return user;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al eliminar usuario");
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
      logger.error(error);
      throw new Error("Error al actualizar password");
    }
  }

  async createUser(user) {
    try {
      const userDTOs = new userDTO({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        age: user.age,
        cart: user.cart,
        role: user.role,
      });

      const newUser = await userManager1.createUser(userDTOs);
      return newUser;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al crear usuario");
    }
  }

  async getAllUsers() {
    try {
      const users = await userManager1.getAll();
      return users;
    } catch (error) {
      logger.error(error);
      throw new Error("Error alpbtener usuarios");
    }
  }

  async getUserById(id) {
    try {
      const user = await userManager1.getById(id);
      return user;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener usuario por id");
    }
  }
}
