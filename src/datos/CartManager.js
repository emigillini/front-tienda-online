import fs from "fs";
import { createEmptyArray } from "../utils.js";
const path = "carts.json";
const utf = "utf-8";

createEmptyArray(path, utf);

export class CartManager {
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
      console.error(error);
    }
  }

  async getCarts() {
    try {
      let data = await fs.promises.readFile(path, utf);
      let carts = JSON.parse(data);
      return carts;
    } catch (error) {
      console.error(error);
    }
  }
  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((p) => p.id === parseInt(id));
      if (cart) {
        console.log("Este es su cart:", cart);
        return cart;
      } else {
        console.error(`Error: Cart con id ${id} no encontrado.`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addCart() {
    let cartId = await this.getNextId();
    try {
      const carts = await this.getCarts();
      const cartExists = carts.some((p) => p.id === CartManager.id);
      if (cartExists) {
        console.error(`Error: El código ${cartId} ya existe.`);
        return;
      }
      const newCart = {
        id: cartId,
        products: [],
      };
      carts.push(newCart);
      await fs.promises.writeFile(path, JSON.stringify(carts));
      console.log(`Se agregó el carrito "${cartId}" al archivo ${path}.`);
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id === cartId);
      if (cartIndex === -1) {
        console.error(`Error: Carrito con ID ${cartId} no encontrado.`);
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
      console.log(
        `Producto ${productId} agregado al carrito ${cartId} con éxito.`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
