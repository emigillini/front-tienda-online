import fs from "fs";
const path = "carts.json";
const utf = "utf-8";

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, "[]", utf);
  console.log(`El archivo ${path} no existía, se ha creado un array vacío.`);
}

export class CartManager {
    static id = 0;
  
    constructor() {
      this.carts = [];
      this.path = path;
    }

    async addCart() {
      CartManager.id++;
      try {
        const data = await fs.promises.readFile(path, utf);
        const carts = JSON.parse(data);
        const cartExists = carts.some((p) => p.id === CartManager.id);
        if (cartExists) {
          console.error(`Error: El código ${CartManager.id} ya existe.`);
          return;
        }
        const newCart = {
          id: CartManager.id,
          products: []
        }
        carts.push(newCart);
        await fs.promises.writeFile(path, JSON.stringify(carts));
        console.log(`Se agregó el carrito "${CartManager.id}" al archivo ${path}.`);
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
          const data = await fs.promises.readFile(path, utf);
          const carts = JSON.parse(data);
          const cart = carts.find((p) => p.id ===parseInt(id));
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

      async addProductToCart(cartId, productId, quantity) {
        try {
          const data = await fs.promises.readFile(this.path, utf);
          const carts = JSON.parse(data);
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
          console.log(`Producto ${productId} agregado al carrito ${cartId} con éxito.`);
        } catch (error) {
          console.error(error);
        }
      }


}
