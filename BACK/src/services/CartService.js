import { CartManagerPromise } from "../DAO/factory.js";
import { cartsModel } from "../DAO/models/carts_model.js";
import { logger } from "../logger.js";

const CartManager1 = await CartManagerPromise;

export class CartService {
  async getCarts(limit) {
    try {
      const carts = await CartManager1.getCarts();
      if (limit) {
        return carts.slice(0, parseInt(limit));
      } else {
        return carts;
      }
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener los carritos");
    }
  }
  async lastCart() {
    try {
      const lastCartId = await CartManager1.getLastCartId();
      return lastCartId;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener ultimo carrito");
    }
  }
  async getCartById(id) {
    try {
      const cart = await CartManager1.getCartById(id);
      return cart;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener el carrito por ID");
    }
  }
  async deleteCardProduct(cid, pid) {
    try {
      await CartManager1.deleteCartProduct(cid, pid);
    } catch (error) {
      logger.error(error);
      throw new Error("Error al borrar producto");
    }
  }
  async deleteCart(cid) {
    try {
      await CartManager1.deleteCart(cid);
    } catch (error) {
      logger.error(error);
      throw new Error("Error al borrar producto");
    }
  }
  async deleteAllCartProduct(cid) {
    try {
      await CartManager1.deleteAllCartProduct(cid);
    } catch (error) {
      logger.error(error);
      throw new Error("Error al borrar productos");
    }
  }
  async addCart(useremail) {
    try {
      await CartManager1.addCart(useremail);
    } catch (error) {
      logger.error(error);
      throw new Error("Error al agregar Cart");
    }
  }
  async addProductToCart(cid, pid, quantity) {
    try {
      await CartManager1.addProductToCart(cid, pid, quantity);
    } catch (error) {
      logger.error(error);
      throw new Error("Error al agregar producto al Cart");
    }
  }
  async updateCartProducts(cartId, productsNotProcessed) {
    try {
      const cart = await cartsModel.findOneAndUpdate(
        { id: cartId },
        { products: productsNotProcessed },
        { new: true }
      );
      return cart;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al actualizar productos del carrito");
    }
  }
}
