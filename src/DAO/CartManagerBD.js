import { cartsModel } from "./models/carts_model.js";

export class CartManagerBD {
  constructor() {
    this.model = cartsModel;
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
  async getLastCartId() {
    try {
      const carts = await this.model.find().sort({ id: -1 }).limit(1);
      if (carts.length > 0) {
        const lastCart = carts[0];
        return lastCart
      } else {
        console.log("No se encontraron carritos.");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.model.findOne({ id: id });
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

      console.log(`Se agregó el carrito${cart}" `);
      return cartId;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCart(cartId) {
    try {
      const cart = await this.getCartById(cartId);
      await this.model.findOneAndDelete({ _id: cart._id });
      console.log(`Carrito ${cartId} eliminado con éxito.`);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCartProduct(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      const updateCart = await this.model.findOneAndUpdate(
        { _id: cart._id, "products.id": productId },
        { $pull: { products: { id: productId } } },
        { new: true }
      );

      if (updateCart) {
        console.log(
          `Producto ${productId} eliminado del carrito ${cartId} con éxito.`
        );
      } else {
        console.log(
          `Producto con id=${productId} no encontrado en el carrito ${cartId}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  async deleteAllCartProduct(cartId) {
    try {
      const cart = await this.getCartById(cartId);
      const updateCart = await this.model.findOneAndUpdate(
        { _id: cart._id },
        { $set: { products: [] } },
        { new: true }
      );

      if (updateCart) {
        console.log(`Productos ${cartId} con éxito.`);
      } else {
        console.log(
          `Producto con id=${productId} no encontrado en el carrito ${cartId}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.getCartById(cartId);
      const productToAdd = await this.model.findOneAndUpdate(
        { _id: cart._id, "products.id": productId },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );

      if (productToAdd) {
        console.log(`Producto ${productId} actualizado en el carrito ${cartId}.`);
        return cart;
      } else {
        const newProduct = { id: productId, quantity };
        cart.products.push(newProduct);
      }
      await cart.save();
      console.log(
        `Producto ${productId} agregado al carrito ${cartId} con éxito.`
      );
      return cart
    } catch (error) {
      console.error(error);
    }
  }

  async getProductInCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (cart) {
      const product = cart.products.find((p) => p.id === productId);
      return product;
    }
    return null;
  }

  async UpadatesProductsToCart(cartId, productId, quantity) {
    try {
      const cart = await this.getCartById(cartId);
      const update = await this.model.findOneAndUpdate(
        { _id: cart._id, "products.id": parseInt(productId) },
        { $inc: { "products.$.quantity": parseInt(quantity) } },
        { new: true }
      );

      if (update) {
        console.log(
          `Cantidad del producto ${productId} actualizada en el carrito ${cartId} con éxito.`
        );
        return update;
      } else {
        console.log(`Producto ${productId} no existe en carrito ${cartId}`);
      }
    } catch (error) {
      console.log("Error updating product quantity.");
    }
  }
}

