import CustomRouter from "./router.js";
import { UserController } from "../controllers/UserController.js";

const userController1 = new UserController();

export default class UserRouter extends CustomRouter {
  init() {
    this.get("/", userController1.getAll);
    this.get("/:id", userController1.getUserById);
    this.put("/premium/:uid", userController1.changeUserRole);
  }
}
