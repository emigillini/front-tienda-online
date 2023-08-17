import passport from "passport";
import { UserService } from "../services/UserService.js";

import { createHash } from "../utils.js";

const userServ1 = new UserService();

export class UserController {
  async register(req, res) {
    res.render("register", {});
  }
  async postRegister(req, res) {
    try {
      res.render("login", {});
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      await userServ1.updatePassword(user.email, newPassword);
      res.render("login", {});
    } catch (error) {
      console.error(error);
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
      console.log(error);
    }
  }
  async getUserById(req, res) {
    try {
      let user = await userServ1.getUserById(req.params.id);
      return res.sendSuccess(user);
    } catch (error) {
      console.log(error);
    }
  }
}
