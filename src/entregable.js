import fs from "fs";
const path = "productos.json";
const utf = "utf-8";

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, "[]", utf);
  console.log(`El archivo ${path} no existía, se ha creado un array vacío.`);
}

export class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = path;
  }

  async addProduct(title, description, code, price, status = true, stock, category, thumbnail) {
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
        id: ProductManager.id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
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
      return productos;
    } catch (error) {
      console.error(error);
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
  async updateProduct(id, title, description, code, price, stock, category, thumbnails) {
    try {
      const data = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(data);
      const productIndex = products.findIndex((p) => p.id === parseInt(id));
      if (productIndex === -1) {
        console.error(`Error: No se encontró el producto con id ${id}.`);
        return;
      }
      const updatedProduct = {
        id: parseInt(id),
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
      };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(path, JSON.stringify(products));
      console.log(`Se actualizó el producto con id ${id}.`);
    } catch (error) {
      console.error(error);
    }
  }
}