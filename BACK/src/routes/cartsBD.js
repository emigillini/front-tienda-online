import CustomRouter from "./router.js";
import { logRequest} from "../DAO/midleware/midleware.js";
import CartController from "../controllers/CartController.js";
import { validateParam } from "../utils.js";
const cartController = new CartController();


export default class CartBDRouter extends CustomRouter{
  init(){
    this.param("cid", (req, res, next, value) => validateParam("cid", req, res, next));
    this.param("pid", (req, res, next, value) => validateParam("pid", req, res, next));
    this.param("id", (req, res, next, value) => validateParam("id", req, res, next));
    this.get("/",logRequest, cartController.getCarts);
    this.get('/lastCart', logRequest,cartController.lastCart)
    this.get("/:id",logRequest, cartController.getCartById)
    this.delete("/:cid/product/:pid", logRequest,  cartController.deleteCartProduct)
    this.delete("/deletecart/:cid", logRequest, cartController.deleteCart)
    this.delete("/deleteallproducts/:cid", logRequest, cartController.deleteAllCartProduct)
    this.post("/addCart", logRequest, cartController.addCart)
    this.put("/addProductToCart/:cid/product/:pid", logRequest, cartController.addProductToCart)
  }}