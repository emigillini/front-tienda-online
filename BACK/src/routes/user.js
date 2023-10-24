import CustomRouter from "./router.js";
import { UserController } from "../controllers/UserController.js";
import { upload } from "../DAO/midleware/midleware.js";

const userController1 = new UserController();

export default class UserRouter extends CustomRouter {
  init() {
    this.get("/", userController1.getAll);
    this.delete("/inactivos", userController1.eliminarUsuariosInactivos);
    this.get("/:id", userController1.getUserById);
    this.put("/premium/:uid", userController1.changeUserRole);
    this.delete("/:id", userController1.eliminarUsuario);
    this.post(
      "/:uid/documents",
      upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "productImage", maxCount: 1 },
        { name: "identificacion", maxCount: 1 },
        { name: "comp_domicilio", maxCount: 1 },
        { name: "estado_cuenta", maxCount: 1 },
      ]),
      userController1.uploadDocuments
    );
  }
}
