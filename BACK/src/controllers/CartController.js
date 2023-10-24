import { CartService } from "../services/CartService.js";
import { CartManagerPromise } from "../DAO/factory.js";
import { ProductService } from "../services/ProductService.js";
import { TicketService } from "../services/Ticketservice.js";
import { logger } from "../logger.js";

const cartService = new CartService();
const CartManager1 = await CartManagerPromise;
const prodservice = new ProductService();
const tickserv = new TicketService();

export default class CartController {
  async getCarts(req, res) {
    try {
      const carts = await cartService.getCarts(req.query.limit);

      res.sendSuccess(carts);
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }

  async lastCart(req, res) {
    try {
      const lastCartId = await cartService.lastCart();
      res.json(lastCartId);
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
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
      logger.error(error);
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
      logger.error(error);
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
      logger.error(error);
      res.sendServerError("Error al eliminar los productos del carrito.");
    }
  }
  async addCart(req, res) {
    try {
      const { email } = req.body;
      await cartService.addCart(email);
      res.json({ message: "Carro agregado" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
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
      logger.error(error);
      res.sendServerError("Error al agregar el producto al carrito.");
    }
  }
  async purchaseCart(req, res) {
    const cartId = req.params.cid;

    try {
      const cart = await cartService.getCartById(cartId);

      if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }

      const productsProcessed = [];
      const productsNotProcessed = [];
      let totalAmount = 0;

      for (const cartProduct of cart.products) {
        const productId = cartProduct.id;
        const quantity = cartProduct.quantity;

        const product = await prodservice.getProdById(productId);

        if (!product || product.stock < quantity) {
          productsNotProcessed.push({
            id: productId,
            productData: product,
            requestedQuantity: quantity,
          });
        } else {
          const updatedProduct = await prodservice.updateProductStock(
            productId,
            product.stock - quantity
          );
          productsProcessed.push({
            updatedProduct,
            purchasedQuantity: quantity,
          });

          totalAmount += updatedProduct.price * quantity;
        }
      }

      const ticket = {
        productsProcessed,
        productsNotProcessed,
        amount: totalAmount,
        cart: cart._id,
        purchaser: cart.email,
      };
      await tickserv.createTicket(ticket);

      await cartService.updateCartProducts(cartId, productsNotProcessed);

      return res.json({
        message: "Compra finalizada exitosamente",
        ticket,
        amount: totalAmount,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: "Error al finalizar la compra" });
    }
  }
}
