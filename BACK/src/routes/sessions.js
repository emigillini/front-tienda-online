import CustomRouter from "./router.js";
import { adminRole, authMiddleware, logRequest } from "../DAO/midleware/midleware.js";
import passport from "passport";
import { UserController } from "../controllers/UserController.js";

const userController1 = new UserController();

export default class SessionRouter extends CustomRouter {
  init() {
    //this.get("/register", logRequest, userController1.register);

    this.post(
      "/register",
      logRequest,
      passport.authenticate("register", {
        failureRedirect: "register-error",
      }),
      userController1.postRegister
    );

    this.get("/register-error", userController1.registerError);

    //this.get("/login", userController1.login);

    this.post(
      "/login",
      passport.authenticate("login", {
        failureRedirect: "login-error",
      }),
      userController1.postLogin
    );

    this.get("/admin", authMiddleware, adminRole, userController1.admin);

    this.get("/login-error", userController1.loginError);

    this.get("/current", userController1.current);

    this.get("/logout", userController1.logout);

    this.get("/restore-password", userController1.restorePassword);

    this.post("/restore-password", userController1.postRestorePassword);

    this.get("/github", userController1.github);

    this.get("/githubcallback", userController1.githubCallback);
  }
}
