import CustomRouter from "./router.js";
import { logRequest, msg } from "../midleware/midleware.js";
import { CartManagerBD } from "../CartManagerBD.js";
import { ProductManagerBD } from "../ProductManagerBD.js";

const CartManager1 = new CartManagerBD();



const idValidator = /^[0-9]+$/;

export default class CartBDRouter extends CustomRouter{
  init(){
    this.param("cid", (req, res, next, value) => {
      if (!idValidator.test(value)) {
        return res.status(400).send("El cid debe ser un número entero positivo.");
      }
      req.params.cid = parseInt(value, 10);
      next();
    });
    
    this.param("pid", (req, res, next, value) => {
      if (!idValidator.test(value)) {
        return res.status(400).send ("El pid debe ser un número entero positivo.");
      }
      req.params.pid = parseInt(value, 10);
      next();
    });
    
    this.param("id", (req, res, next, value) => {
      if (!idValidator.test(value)) {
        return res.status(400).send("El id debe ser un número entero positivo.");
      }
      req.params.id = parseInt(value, 10);
      next();
    });
    
 
    
    this.get("/", logRequest, async (req, res) => {
      try {
        const carts = await CartManager1.getCarts();
        const limit = parseInt(req.query.limit);
        if (limit) {
          const firstCarts = carts.slice(0, limit);
          res.sendSuccess(firstCarts);
          console.log(firstCarts);
        } else {
          res.sendSuccess({ status: "succes", payload: carts });
          console.log(carts);
        }
      } catch (error) {
        console.error(error);
        res.sendServerError("Error interno del servidor");
      }
    });
    
    this.get('/lastCart', async (req, res) => {
      try {
        const lastCartId = await CartManager1.getLastCartId();
        res.sendSuccess(lastCartId.id);
      } catch (error) {
        console.error(error);
        res.sendServerError('An error occurred' );
      }
    });
    
    this.get("/:id", logRequest, async (req, res) => {
      try {
        const cart = await CartManager1.getCartById(req.params.id);
    
        if (!cart) {
          return res.sendUserError({
            id: req.params.id,
            message: `id ${req.params.id} no encontrado`,
          });
        }
        res.sendSuccess(cart );
      } catch (error) {
        console.error(error);
        res.sendUserError("Error id no encontrado");
      }
    });
    
    this.delete("/:cid/product/:pid", logRequest, async (req, res) => {
    
      const { cid, pid } = req.params;
      
      try {
        const cart = await CartManager1.getCartById(parseInt(cid));
        if (!cart) {
          return res.sendUserError(
          `Carrito con ID ${cid} no encontrado.`
          );
        }
    
        const product = await CartManager1.getProductInCart(parseInt(cid), parseInt(pid));
        if (!product) {
          return res.sendUserError(
            `Producto con ID ${pid} no encontrado en el carrito ${cid}.`
          );
        }
    
        await CartManager1.deleteCartProduct(parseInt(cid), parseInt(pid));
        res.sendSuccess(`Producto ${pid} eliminado del carrito ${cid}.`);
      } catch (error) {
        console.error(error);
        res.sendServerError("Error al eliminar el producto del carrito.");
      }
    });
    
    this.delete("/deletecart/:cid", logRequest, async (req, res) => {
    
      const { cid } = req.params;
     
      try {
        const cart = await CartManager1.getCartById(parseInt(cid));
        if (!cart) {
          return res.sendUserError(`Carrito con ID ${cid} no encontrado.`
          );
        }
    
        await CartManager1.deleteCart(parseInt(cid));
        res.sendSuccess(`Carrito ${cid} eliminado correctamente.`);
      } catch (error) {
        console.error(error);
        res.sendServerError("Error al eliminar el carrito.");
      }
    });
    
    this.delete("/:cid", logRequest, async (req, res) => {
    
      const { cid } = req.params;
      
      try {
        const cart = await CartManager1.getCartById(parseInt(cid));
        if (!cart) {
          return res.sendUserError( `Carrito con ID ${cid} no encontrado.`
          );
        }
    
        await CartManager1.deleteAllCartProduct(cid);
        console.log(`Se eliminaron todos los productos del carrito ${cid}.`);
        res.send(`Se eliminaron todos los productos del carrito ${cid}.`);
      } catch (error) {
        console.error(error);
        res.sendServerError("Error al eliminar los productos del carrito.");
      }
    });
    
    
    this.post("/", logRequest, async (req, res) => {
      try {
        await CartManager1.addCart();
        res.sendSuccess( "carro agregado");
      } catch (error) {
        console.error(error);
        res.sendServerError("Error interno del servidor");
      }
    });
    
    this.put("/:cid/product/:pid", logRequest, async (req, res) => {
      
      const { cid, pid } = req.params;
      const quantity = 1;
      const cartManager = new CartManagerBD();
      const productManager = new ProductManagerBD();
    
      try {
        const product = await productManager.getProductById(pid);
        if (!product) {
          console.error(`Error: Producto con ID ${pid} no encontrado.`);
          return res.sendUserError(`Error: Producto con ID ${pid} no encontrado.`);
        }
    
        await cartManager.addProductToCart(
          parseInt(cid),
          parseInt(pid),
          parseInt(quantity)
        );
        res.sendSuccess(`Producto ${pid} agregado al carrito ${cid}.`);
      } catch (error) {
        console.error(error);
        res.sendServerError("Error al agregar el producto al carrito.");
      }
    });
    
    
    this.put("/:cid/products/:pid", logRequest, async (req, res) => {
     
      const { cid, pid } = req.params;
      const { quantity } = req.body;
    
      try {
        const updatedCart = await CartManager1.UpadatesProductsToCart(
          cid,
          pid,
          quantity
        );
        if (updatedCart) {
          res.sendSuccess('se ha actualizado ${updatedCart}' );
        } else {
          res.sendUserError( `Product with ID ${pid} not found in cart ${cid}.` );
        }
      } catch (error) {
        console.error(error);
        res.sendServerError("Error updating product quantity." );
      }
    });
    
    
  }}

