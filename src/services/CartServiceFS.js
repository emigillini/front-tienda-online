import { CartManager } from "../DAO/managers/CartManager.js";

const CartManager1 = new CartManager();

export class CartServiceFS {
  async getCarts(limit) {
    try {
      const carts = await CartManager1.getCarts();
      if (limit) {
        return carts.slice(0, parseInt(limit));
      } else {
        return carts;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los carritos");
    }
  }
  async lastCart() {
    try {
      const lastCartId = await CartManager1.getLastCartId();
      return lastCartId;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener ultimo carrito");
    }
  }
  async getCartById(id) {
    try {
      const cart = await CartManager1.getCartById(id);
      return cart;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el carrito por ID");
    }
  }
  async deleteCardProduct(cid, pid) {
    try {
      await CartManager1.deleteCartProduct(cid, pid);
    } catch (error) {
      console.error(error);
      throw new Error("Error al borrar producto");
    }
  }
  async deleteCart(cid) {
    try {
      await CartManager1.deleteCart(cid);
    } catch (error) {
      console.error(error);
      throw new Error("Error al borrar producto");
    }
  }
  async deleteAllCartProduct(cid) {
    try {
      await CartManager1.deleteAllCartProduct(cid);
    } catch (error) {
      console.error(error);
      throw new Error("Error al borrar productos");
    }
  }
  async addCart() {
    try {
      await CartManager1.addCart();
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar Cart");
    }
  }
  async addProductToCart(cid, pid, quantity) {
    try {
      await CartManager1.addProductToCart(cid, pid, quantity);
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar producto al Cart");
    }
  }
}
