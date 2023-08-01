import { CartServiceFS } from "../services/CartServiceFS.js";
import { CartManager} from "../DAO/CartManager.js";
import { ProductServiceFS } from "../services/ProductServiceFS.js";

const cartService = new CartServiceFS();
const CartManager1 = new CartManager();
const prodservice = new ProductServiceFS();
export default class CartControllerFS {
  async getCarts(req, res) {
    try {
      const carts = await cartService.getCarts(req.query.limit);
      res.sendSuccess(carts);
    } catch (error) {
      console.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }

  async lastCart(req, res) {
    try {
      const lastCartId = await cartService.lastCart();
      res.sendSuccess(lastCartId);
    } catch (error) {
      console.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }
  async getCartById(req, res) {
    try {
      const cart = await cartService.getCartById(req.params.id);

      if (!cart) {
        return res.sendUserError({
          id: req.params.id,
          message: `id ${req.params.id} no encontrado`,
        });
      }
      res.sendSuccess(cart);
    } catch (error) {
      console.error(error);
      res.sendUserError("Error id no encontrado");
    }
  }

  async deleteCartProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.getCartById(parseInt(cid));
      if (!cart) {
        return res.sendUserError(`Carrito con ID ${cid} no encontrado.`);
      }

      const product = await CartManager1.getProductInCart(
        parseInt(cid),
        parseInt(pid)
      );
      if (!product) {
        return res.sendUserError(
          `Producto con ID ${pid} no encontrado en el carrito ${cid}.`
        );
      }
      await cartService.deleteCardProduct(cid, pid);
      res.sendSuccess(`Producto ${pid} eliminado del carrito ${cid}.`);
    } catch (error) {
      console.error(error);
      res.sendServerError("Error al eliminar el producto del carrito.");
    }
  }
  async deleteCart(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartService.getCartById(parseInt(cid));
      if (!cart) {
        return res.sendUserError(`Carrito con ID ${cid} no encontrado.`);
      }
      await cartService.deleteCart(cid);
      res.sendSuccess(`Carrito ${cid} eliminado correctamente.`);
    } catch (error) {
      console.error(error);
      res.sendServerError("Error al eliminar el carrito.");
    }
  }
  async deleteAllCartProduct(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartService.getCartById(parseInt(cid));
      if (!cart) {
        return res.sendUserError(`Carrito con ID ${cid} no encontrado.`);
      }
      await cartService.deleteAllCartProduct(cid);
      res.sendSuccess(`Se eliminaron todos los productos del carrito ${cid}.`);
    } catch (error) {
      console.error(error);
      res.sendServerError("Error al eliminar los productos del carrito.");
    }
  }
  async addCart(req, res) {
    try {
      await cartService.addCart();
      res.sendSuccess("carro agregado");
    } catch (error) {
      console.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }
  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    const quantity = 1;
    try {
      const product = await prodservice.getProdById(pid);
      if (!product) {
        console.error(`Error: Producto con ID ${pid} no encontrado.`);
        return res.sendUserError(` Producto con ID ${pid} no encontrado.`);
      }
      const cart = await cartService.getCartById(parseInt(cid));
      if (!cart) {
        return res.sendUserError(`Carrito con ID ${cid} no encontrado.`);
      }
      await cartService.addProductToCart(cid, pid, parseInt(quantity));
      res.sendSuccess(`Producto ${pid} agregado al carrito ${cid}.`);
    } catch (error) {
      console.error(error);
      res.sendServerError("Error al agregar el producto al carrito.");
    }
  }
}
