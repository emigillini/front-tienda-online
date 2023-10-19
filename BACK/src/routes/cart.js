import CustomRouter from "./router.js";
import { logRequest, userRole } from "../DAO/midleware/midleware.js";
import CartController from "../controllers/CartController.js";
import { validateParam } from "../utils.js";

const cartController1 = new CartController();

export default class CartRouter extends CustomRouter {
  init() {
    this.param("cid", (req, res, next, value) =>
      validateParam("cid", req, res, next)
    );
    this.param("pid", (req, res, next, value) =>
      validateParam("pid", req, res, next)
    );
    this.param("id", (req, res, next, value) =>
      validateParam("id", req, res, next)
    );
    this.get("/", logRequest, cartController1.getCarts);//
    this.get("/lastCart", logRequest, cartController1.lastCart);//
    this.get("/:id", logRequest, cartController1.getCartById);//
    this.delete(
      "/:cid/product/:pid",
      
      logRequest,
      cartController1.deleteCartProduct
    );//
    this.delete("/deletecart/:cid", logRequest, cartController1.deleteCart);//
    this.delete(
      "/deleteallproducts/:cid",
      logRequest,
      cartController1.deleteAllCartProduct
    );//
    this.post("/addCart", logRequest, cartController1.addCart);//
    this.post("/:cid/purchase", logRequest, cartController1.purchaseCart);
    this.put(
      "/addProductToCart/:cid/product/:pid",
      logRequest,
      cartController1.addProductToCart
    );
  }
}
