import CustomRouter from "./router.js";
import { logRequest } from "../DAO/midleware/midleware.js";
import { ProductController } from "../controllers/ProductController.js";
import { validateParam } from "../utils.js";

const productController1 = new ProductController();

export default class ProdBDRouter extends CustomRouter {
  init() {
    this.param("id", (req, res, next, value) =>
      validateParam("id", req, res, next)
    );
    this.get("/:id", logRequest, productController1.getProdByid);
    this.get("/", logRequest, productController1.getProducts);
    this.post("/", logRequest, productController1.addProduct);
    this.put("/:id", logRequest, productController1.updateProduct);
    this.delete("/:id", logRequest, productController1.deleteProd);
  }
}
