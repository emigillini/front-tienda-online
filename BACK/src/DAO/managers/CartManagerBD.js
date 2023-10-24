import { logger } from "../../logger.js";
import { cartsModel } from "../models/carts_model.js";
import { ProductManagerBD } from "./ProductManagerBD.js";

const man1 = new ProductManagerBD();

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
      logger.error(error);
    }
  }

  async getCarts() {
    try {
      let carts = await this.model.find();
      return carts;
    } catch (error) {
      logger.error(error);
    }
  }
  async getLastCartId() {
    try {
      const carts = await this.model.find().sort({ id: -1 }).limit(1);
      if (carts.length > 0) {
        const lastCart = carts[0];
        return lastCart;
      } else {
        logger.info("No se encontraron carritos.");
        return null;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.model.findOne({ id: id });
      if (cart) {
        logger.info("Este es su cart:", cart);
        return cart;
      } else {
        logger.error(`Error: Cart con id ${id} no encontrado.`);
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(useremail) {
    let cartId = await this.getNextId();
    try {
      const cart = await cartsModel.create({
        id: cartId,
        products: [],
        email: useremail,
      });

      logger.info(`Se agregó el carrito${cart}" `);
      return cartId;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(cartId) {
    try {
      const cart = await this.getCartById(cartId);
      await this.model.findOneAndDelete({ _id: cart._id });
      logger.info(`Carrito ${cartId} eliminado con éxito.`);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCartProduct(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      const productIndex = cart.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        if (cart.products[productIndex].quantity > 1) {
          cart.products[productIndex].quantity -= 1;
        } else {
          cart.products.splice(productIndex, 1);
        }
        const updateCart = await this.model.findOneAndUpdate(
          { _id: cart._id },
          { products: cart.products },
          { new: true }
        );

        if (updateCart) {
          logger.info(
            `Producto ${productId} eliminado del carrito ${cartId} con éxito.`
          );
        } else {
          logger.warning(
            `Producto con id=${productId} no encontrado en el carrito ${cartId}`
          );
        }
      } else {
        logger.warning(
          `Producto con id=${productId} no encontrado en el carrito ${cartId}`
        );
      }
    } catch (error) {
      logger.error(error);
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
        logger.info(`Productos ${cartId} con éxito.`);
      } else {
        logger.warning(
          `Producto con id=${productId} no encontrado en el carrito ${cartId}`
        );
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.getCartById(cartId);
      const product = await man1.getProductById(productId);

      const productToAdd = await this.model.findOneAndUpdate(
        { _id: cart._id, "products.id": productId },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );

      if (productToAdd) {
        logger.info(
          `Producto ${productId} actualizado en el carrito ${cartId}.`
        );
        return cart;
      } else {
        const newProduct = {
          id: productId,
          quantity,
          title: product.title,
          price: product.price,
          category: product.category,
          stock: product.stock,
          thumbnail: product.thumbnail,
        };
        cart.products.push(newProduct);
      }
      await cart.save();
      logger.info(
        `Producto ${productId} agregado al carrito ${cartId} con éxito.`
      );
      return cart;
    } catch (error) {
      logger.error(error);
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
        logger.info(
          `Cantidad del producto ${productId} actualizada en el carrito ${cartId} con éxito.`
        );
        return update;
      } else {
        logger.warning(`Producto ${productId} no existe en carrito ${cartId}`);
      }
    } catch (error) {
      logger.error("Error updating product quantity.");
    }
  }
}
