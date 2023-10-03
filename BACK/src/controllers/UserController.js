import passport from "passport";
import { UserService } from "../services/UserService.js";
import { userModel } from "../DAO/models/user_model.js";
import { createHash } from "../utils.js";
import { logger } from "../logger.js";

const userServ1 = new UserService();

export class UserController {
  async register(req, res) {
    res.render("register", {});
  }
  async postRegister(req, res) {
    try {
      res.render("login", {});
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }

  async registerError(req, res) {
    res.render("register-error", {});
  }

  async login(req, res) {
    res.render("login", {});
  }

  async postLogin(req, res) {
    try {
      req.session.user = {
        email: req.user.email,
        role: req.user.role,
      };

      res.render("bienvenida-datos", { user: req.session.user });
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }

  async admin(req, res) {
    res.sendSuccess("Welcome to the admin page!");
  }

  async loginError(req, res) {
    res.render("login-error", {});
  }

  async current(req, res) {
    let user = req.session.user;
    res.render("bienvenida-datos", { user });
  }
  async logout(req, res) {
    req.session.destroy((error) => {
      res.render("login");
    });
  }

  async restorePassword(req, res) {
    res.render("restore-password", {});
  }

  async postRestorePassword(req, res) {
    try {
      let user = req.body;
      let userFound = await userServ1.getByEmail(user.email);
      if (!userFound) {
        return res.render("register", {});
      }
      let newPassword = createHash(user.password);
      if (newPassword === userFound.password) {
        return res.sendServerError("no misma")
      }
      await userServ1.updatePassword(user.email, newPassword);
      res.render("login", {successMessage: "Contraseña restablecida con éxito"});
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }

  async github(req, res) {
    passport.authenticate("github", { scope: ["user:email"] })(req, res);
  }

  async githubCallback(req, res) {
    passport.authenticate("github", { failureRedirect: "/login" })(
      req,
      res,
      () => {
        req.session.user = req.user;
        res.redirect("/index");
      }
    );
  }

  async getAll(req, res) {
    try {
      let users = await userServ1.getAllUsers();
      return res.sendSuccess(users);
    } catch (error) {
      logger.error(error);
    }
  }
  async getUserById(req, res) {
    try {
      let user = await userServ1.getUserById(req.params.id);
      return res.sendSuccess(user);
    } catch (error) {
      logger.error(error);
    }
  }
  async changeUserRole(req, res) {
    const { uid } = req.params;

    try {
     
      const user = await userModel.findById(uid);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (user.role === "usuario") {
        user.role = "premium";
      } else if (user.role === "premium") {
        user.role = "usuario";
      }

      
      await user.save();

      return res.json({ message: "Rol del usuario cambiado exitosamente", newUserRole: user.role });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al cambiar el rol del usuario" });
    }
  }
  async uploadDocuments(req, res) {
    try {
      const userId = req.params.uid;
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const uploadedDocuments = req.files.map(file => {
        return {
          name: file.originalname,
          reference: `/uploads/${file.originalname}`,
           // Ruta de acceso al archivo.//
        };
      });

      // Agrega los documentos subidos al usuario
      user.documents = uploadedDocuments;
      await user.save();

      return res.status(200).json({ message: 'Documentos subidos exitosamente' });
    } catch (error) {
      console.error('Error al subir documentos:', error);
      return res.status(500).json({ message: 'Error al subir documentos' });
    }
  }
}
