import fs from "fs";
const path = "carts.json";
const utf = "utf-8";

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
        this.carts.push(newCart);
        await fs.promises.writeFile(path, JSON.stringify(this.carts));
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
    
      async geCartById(id) {
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



}
