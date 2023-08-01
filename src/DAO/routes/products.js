import CustomRouter from "./router.js";
import { validateParam } from "../../utils.js";
import { logRequest, msg } from "../midleware/midleware.js";
import { ProductControllerFS } from "../ProductControllerFS.js";

const productController1 = new ProductControllerFS()

export default class ProdRouter extends CustomRouter {
  init() {
    this.param("id", (req, res, next, value) =>
      validateParam("id", req, res, next)
    );
    this.get("/:id", logRequest, productController1.getProdByid);
    this.get("/", logRequest, productController1.getProducts);
    this.post("/", logRequest, productController1.addProduct);
    this.put("/:id", logRequest, productController1.updateProduct);
    this.delete("/:id", logRequest, productController1.deleteProd);
  }}
