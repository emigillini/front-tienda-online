import fs from "fs";
import { createEmptyArray } from "../../utils.js";
import { logger } from "../../logger.js";
const path = "carts.json";
const utf = "utf-8";


createEmptyArray(path, utf);

export  class CartManagerFS {
  static id = 0;

  constructor() {
    this.carts = [];
    this.path = path;
  }

  async getNextId() {
    try {
      const carts = await this.getCarts();
      const lastCart = carts[carts.length - 1];
      return lastCart ? lastCart.id + 1 : 1;
    } catch (error) {
      logger.error (error);
    }
  }

  async getCarts() {
    try {
      let data = await fs.promises.readFile(path, utf);
      let carts = JSON.parse(data);
      return carts;
    } catch (error) {
      logger.error (error);
    }
  }
  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((p) => p.id === parseInt(id));
      if (cart) {
        logger.info("Este es su cart:", cart);
        return cart;
      } else {
        logger.error (`Error: Cart con id ${id} no encontrado.`);
      }
    } catch (error) {
      logger.error (error);
    }
  }

  async addCart() {
    let cartId = await this.getNextId();
    try {
      const carts = await this.getCarts();
      const newCart = {
        id: cartId,
        products: [],
      };
      carts.push(newCart);
      await fs.promises.writeFile(path, JSON.stringify(carts));
      logger.info(`Se agregó el carrito "${cartId}" al archivo ${path}.`);
    } catch (error) {
      logger.error (error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id === cartId);
      if (cartIndex === -1) {
        logger.error (`Error: Carrito con ID ${cartId} no encontrado.`);
        return;
      }
      const cart = carts[cartIndex];
      const productIndex = cart.products.findIndex((p) => p.id === productId);
      if (productIndex === -1) {
        const newProduct = { id: productId, quantity };
        cart.products.push(newProduct);
      } else {
        cart.products[productIndex].quantity += quantity;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      logger.info(
        `Producto ${productId} agregado al carrito ${cartId} con éxito.`
      );
    } catch (error) {
      logger.error (error);
    }
  }
  async deleteCart(cartId) {
    try {
      const carts = await this.getCarts();
      const updatedCarts = carts.filter((cart) => cart.id !== cartId);
      await fs.promises.writeFile(path, JSON.stringify(updatedCarts));
      logger.info(`Carrito ${cartId} eliminado con éxito.`);
    } catch (error) {
      logger.error (error);
    }
  }
  async deleteCartProduct(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id === cartId);
      if (cartIndex === -1) {
        console.error(`Error: Carrito con ID ${cartId} no encontrado.`);
        return;
      }
      const cart = carts[cartIndex];
      const updatedProducts = cart.products.filter(
        (product) => product.id !== productId
      );
      cart.products = updatedProducts;
      await fs.promises.writeFile(path, JSON.stringify(carts));
      logger.info(
        `Producto ${productId} eliminado del carrito ${cartId} con éxito.`
      );
    } catch (error) {
      logger.error (error);
    }
  }

  async deleteAllCartProduct(cartId) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id === cartId);
      if (cartIndex === -1) {
        console.error(`Error: Carrito con ID ${cartId} no encontrado.`);
        return;
      }
      const cart = carts[cartIndex];
      cart.products = [];
      await fs.promises.writeFile(path, JSON.stringify(carts));
      logger.info(`Productos del carrito ${cartId} eliminados con éxito.`);
    } catch (error) {
      logger.error (error);
    }
  }

}
