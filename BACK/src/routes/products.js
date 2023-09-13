import CustomRouter from "./router.js";
import { validateParam } from "../utils.js";
import { logRequest, adminRole } from "../DAO/midleware/midleware.js";
import { ProductController } from "../controllers/ProductController.js";

const productController1 = new ProductController()

export default class ProdRouter extends CustomRouter {
  init() {
    this.param("id", (req, res, next, value) =>
      validateParam("id", req, res, next)
    );
    this.get("/:id", logRequest, productController1.getProdByid);
    this.get("/", logRequest, productController1.getProducts);
    this.post("/", logRequest, productController1.addProduct);
    this.put("/:id", logRequest,adminRole, productController1.updateProduct);
    this.delete("/:id", logRequest, productController1.deleteProd);
  }}
