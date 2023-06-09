import { cartsModel } from "./models/carts_model.js";


export class CartManagerBD {

  constructor() {
    this.model = cartsModel
  }

  async getNextId() {
    try {
      const carts = await this.model.find();
      const lastCart = carts[carts.length - 1];
      return lastCart ? lastCart.id + 1 : 1;
    } catch (error) {
      console.error(error);
    }
  }

  async getCarts() {
    try {
      let carts = await this.model.find()
      return carts;
    } catch (error) {
      console.error(error);
    }
  }
  async getCartById(id) {
    try {
        const cart = await this.model.findOne({id:id})
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
      const cart = await cartsModel.create({
        id: cartId,
        products: [],

      });
     
      console.log(`Se agregó el carrito "${cartId}" `);
      return cart
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.getCartById (cartId);
      const productIndex = cart.products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        const newProduct = { id: productId, quantity };
        cart.products.push(newProduct);
      }
      await cart.save();
      console.log(
        `Producto ${productId} agregado al carrito ${cartId} con éxito.`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
