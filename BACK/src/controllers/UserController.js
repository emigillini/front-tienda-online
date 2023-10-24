import passport from "passport";
import { UserService } from "../services/UserService.js";
import { userModel } from "../DAO/models/user_model.js";
import { createHash } from "../utils.js";
import { logger } from "../logger.js";
import { transport } from "../App.js";

const userServ1 = new UserService();

export class UserController {
  /*async register(req, res) {
    res.render("register", {});
  }*/
  async postRegister(req, res) {
    try {
      res.json({ success: true, user: req.user });
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }

  async registerError(req, res) {
    res.render("register-error", {});
  }

  /*async login(req, res) {
    res.render("login", {});
  }*/

  async postLogin(req, res) {
    try {
      req.session.user = {
        email: req.user.email,
        role: req.user.role,
      };
      console.log(req.session);

      if (req.isAuthenticated()) {
        res.json({ success: true, user: req.session.user });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Credenciales incorrectas" });
      }
    } catch (error) {
      if (req.accepts("json")) {
        res
          .status(401)
          .json({ success: false, message: "Credenciales incorrectas" });
      } else {
        res.render("login-error", {});
      }
    }
  }

  async admin(req, res) {
    res.sendSuccess("Welcome to the admin page!");
  }

  async loginError(req, res) {
    if (req.accepts("json")) {
      res
        .status(401)
        .json({ success: false, message: "Error en el inicio de sesión" });
    } else {
      res.render("login-error", {});
    }
  }

  async current(req, res) {
    let user = req.session.user;
    res.render("bienvenida-datos", { user });
  }
  async logout(req, res) {
    if (req.accepts("json")) {
      req.session.destroy((error) => {
        if (error) {
          res.status(500).json({ message: "Error al cerrar sesión" });
        } else {
          res.status(200).json({ message: "Sesión cerrada exitosamente" });
        }
      });
    } else {
      req.session.destroy((error) => {
        res.render("login");
      });
    }
  }

  async restorePassword(req, res) {
    res.render("restore-password", {});
  }

  async postRestorePassword(req, res) {
    try {
      const user = req.body;
      const userFound = await userServ1.getByEmail(user.email);

      if (!userFound) {
        return res.render("register", {});
      }

      const newPassword = createHash(user.password);

      if (newPassword === userFound.password) {
        if (req.accepts("json")) {
          return res
            .status(400)
            .json({
              error:
                "La nueva contraseña no puede ser la misma que la anterior",
            });
        } else {
          return res.render("restore-password-error", {});
        }
      }

      await userServ1.updatePassword(user.email, newPassword);

      if (req.accepts("json")) {
        return res
          .status(200)
          .json({ success: "Contraseña restablecida con éxito" });
      } else {
        return res.render("restore-password-success", {
          successMessage: "Contraseña restablecida con éxito",
        });
      }
    } catch (error) {
      if (req.accepts("json")) {
        return res.status(500).json({ error: "Error interno del servidor" });
      } else {
        return res.render("restore-password-error", {});
      }
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

      if (user.role === "usuario") {
        user.role = "premium";
        await user.save();
        return res
          .status(200)
          .json({
            message: "Usuario actualizado a premium",
            newUserRole: user.role,
          });
      } else if (user.role === "premium") {
        user.role = "usuario";
        await user.save();
        return res.json({
          message: "Rol del usuario cambiado exitosamente",
          newUserRole: user.role,
        });
      } else {
        return res.status(400).json({ message: "Rol no reconocido" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al cambiar el rol del usuario" });
    }
  }
  async eliminarUsuariosInactivos(req, res) {
    const inactivityThreshold = 2 * 24 * 60 * 60 * 1000;
    const currentTime = new Date();

    try {
      const users = await userModel.find();
      let inactivosEliminados = 0;

      for (const user of users) {
        const lastConnectionTime = user.last_connection;
        const timeSinceLastConnection = currentTime - lastConnectionTime;

        if (timeSinceLastConnection > inactivityThreshold) {
          await userModel.findByIdAndDelete(user._id);
          inactivosEliminados++;
          const mailOptions = {
            from: "emigillini@gmail.com",
            to: deletedUser.email,
            subject: "Eliminación de cuenta por inactividad",
            text: "Tu cuenta ha sido eliminada debido a inactividad. Si deseas restaurarla, contacta al soporte.",
          };

          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(
                "Error al enviar el correo al usuario eliminado:",
                error
              );
            } else {
              console.log(
                "Correo enviado al usuario eliminado:",
                info.response
              );
            }
          });
        }
      }

      if (inactivosEliminados === 0) {
        res.json({
          message: "No se encontraron usuarios inactivos para eliminar.",
        });
      } else {
        res.json({
          message: `Se eliminaron ${inactivosEliminados} usuarios inactivos con éxito.`,
        });
      }
    } catch (error) {
      console.error("Error al eliminar usuarios inactivos:", error);
      res.status(500).json({ message: "Error al eliminar usuarios inactivos" });
    }
  }

  async eliminarUsuario(req, res) {
    const { id } = req.params;

    try {
      const user = await userServ1.eliminarUsuario(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  }

  async uploadDocuments(req, res) {
    const { uid } = req.params;
    const { file } = req;
    const { doctype } = req.body;
    try {
      const user = await userModel.findById(uid);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      user.documents.push({ file, doctype });
      await user.save();

      res.status(200).json({ message: "Documento subido exitosamente" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al cambiar el rol del usuario" });
    }
  }
}
