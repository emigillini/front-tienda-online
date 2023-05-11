import fs from "fs";
const path = "productos.json";
const utf = "utf-8";

export class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    ProductManager.id++;
    try {
      const data = await fs.promises.readFile(path, utf);
      const products = JSON.parse(data);
      const productExists = products.some((p) => p.code === code);
      if (productExists) {
        console.error(`Error: El código ${code} ya existe.`);
        return;
      }
      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: ProductManager.id,
      };
      products.push(product);
      await fs.promises.writeFile(path, JSON.stringify(products));
      console.log(`Se agregó el producto "${title}" al archivo ${path}.`);
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts() {
    try {
      let mostarProd = await fs.promises.readFile(path, utf);
      let productos = JSON.parse(mostarProd);
      console.log(productos);
      return productos;
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(path, utf);
      const product = JSON.parse(data);
      const products = product.find((p) => p.id ===parseInt(id));
      if (products) {
        console.log("Este es su producto:", products);
        return products;
      } else {
        console.error(`Error: Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      console.error(error);
    
    }
  }

  async deleteProd(id) {
    try {
      const data = await fs.promises.readFile(path, utf);
      const product = JSON.parse(data);
      let indexOf = product.findIndex((p) => p.id === id);
      product.splice(indexOf, 1);
      await fs.promises.writeFile(path, JSON.stringify(product));
      return console.log(`Se eliminó el producto con id ${id}.`);
    } catch (error) {
      console.error(error);
      
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      const data = await fs.promises.readFile(path, utf);
      const products = JSON.parse(data);
      let product = products.find((p) => p.id === id);
      if (product) {
        const prodUpd = {
          title: title || product.title,
          description: description || product.description,
          price: price || product.price,
          thumbnail: thumbnail || product.thumbnail,
          code: code || product.code,
          stock: stock || product.stock,
          id: id,
        };
        let indexOf = products.findIndex((p) => p.id === id);
        products[indexOf] = prodUpd;
        await fs.promises.writeFile(path, JSON.stringify(products));
        console.log(`Se actualizó ${prodUpd.title}`);
      } else {
        console.error(`Error: Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      console.error(error);
      
    }
  }
}
  



