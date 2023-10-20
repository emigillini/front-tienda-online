import passport from "passport";
import { UserService } from "../services/UserService.js";
import { userModel } from "../DAO/models/user_model.js";
import { createHash } from "../utils.js";
import { logger } from "../logger.js";

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
      console.log(req.session)
  
      if (req.accepts('json')) {
        // Si el cliente acepta JSON
        if (req.isAuthenticated()) {
          // Autenticación exitosa
          res.json({ success: true, user: req.user });
        } else {
          // Autenticación fallida
          res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
      } else {
        // De lo contrario, si el cliente no acepta JSON, renderiza una vista
        if (req.isAuthenticated()) {
          // Autenticación exitosa
          res.render('bienvenida-datos', { user: req.user });
        } else {
          // Autenticación fallida
          res.render('login-error', {});
        }
      }
    } catch (error) {
      if (req.accepts('json')) {
        // Si se produce un error, envía una respuesta JSON de error
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      } else {
        // De lo contrario, si el cliente no acepta JSON, renderiza una vista de error
        res.render('login-error', {});
      }
    }
  }
  

  async admin(req, res) {
    res.sendSuccess("Welcome to the admin page!");
  }

  async loginError(req, res) {
    if (req.accepts('json')) {
      // Si el cliente acepta JSON, envía una respuesta JSON de error
      res.status(401).json({ success: false, message: 'Error en el inicio de sesión' });
    } else {
      // De lo contrario, renderiza una vista de error
      res.render('login-error', {});
    }
  }
  

  async current(req, res) {
    let user = req.session.user;
    res.render("bienvenida-datos", { user });
  }
  async logout(req, res) {
    if (req.accepts('json')){ req.session.destroy((error) => {
      if (error) {
        // Error al destruir la sesión
        res.status(500).json({ message: 'Error al cerrar sesión' });
      } else {
        // Sesión destruida con éxito
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
      }
    });
    }else{ req.session.destroy((error) => {
      res.render("login");
    });}}
  

  async restorePassword(req, res) {
    res.render("restore-password", {});
  }

  async postRestorePassword(req, res) {
    try {
      const user = req.body;
      const userFound = await userServ1.getByEmail(user.email);
  
      if (!userFound) {
        // No se encontró el usuario, renderiza una vista
        return res.render('register', {});
      }
  
      const newPassword = createHash(user.password);
  
      if (newPassword === userFound.password) {
        // La nueva contraseña es la misma que la anterior, enviar una respuesta JSON de error
        if (req.accepts('json')) {
          return res.status(400).json({ error: 'La nueva contraseña no puede ser la misma que la anterior' });
        } else {
          // Renderiza una vista de error
          return res.render('restore-password-error', {});
        }
      }
  
      await userServ1.updatePassword(user.email, newPassword);
  
      // Contraseña restablecida con éxito
      if (req.accepts('json')) {
        return res.status(200).json({ success: 'Contraseña restablecida con éxito' });
      } else {
        // Renderiza una vista de éxito
        return res.render('restore-password-success', { successMessage: 'Contraseña restablecida con éxito' });
      }
    } catch (error) {
      if (req.accepts('json')) {
        // Si se produce un error, envía una respuesta JSON de error
        return res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        // Renderiza una vista de error
        return res.render('restore-password-error', {});
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
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (user.role === 'usuario') {
        const requiredDocuments = ['estado_cuenta', 'comp_domicilio', 'identificacion'];
        const missingDocuments = requiredDocuments.filter(doc => !user.documents.some(d => d.doctype === doc));
        if (missingDocuments.length === 0) {
          user.role = 'premium';
          await user.save();
          return res.status(200).json({ message: 'Usuario actualizado a premium', newUserRole: user.role });
        } else {
          return res.status(400).json({ message: 'El usuario no ha terminado de procesar su documentación', missingDocuments });
        }
      } else if (user.role === "premium") {
        user.role = "usuario";
        await user.save();
      }
      return res.json({ message: "Rol del usuario cambiado exitosamente", newUserRole: user.role });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al cambiar el rol del usuario" });
    }
  }
  
  async uploadDocuments(req, res){
    const { uid } = req.params;
    const { file } = req;
    const { doctype } = req.body;
    try {
      const user = await userModel.findById(uid);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      user.documents.push({ file, doctype});
      await user.save();
  
      res.status(200).json({ message: 'Documento subido exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al cambiar el rol del usuario" });
    }
  }
  
}
