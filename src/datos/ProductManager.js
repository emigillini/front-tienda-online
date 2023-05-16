import fs from "fs";
import { createEmptyArray } from "../utils/index.js";
const path = "productos.json";
const utf = "utf-8";

createEmptyArray(path,utf)

export class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = path;
  }

  async getNextId (){
    try {
      const products= await this.getProducts()
      const lastProduct = products[products.length - 1];
      return lastProduct ? lastProduct.id + 1 : 1;
      
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
      const products = await this.getProducts()
      const product = products.find((p) => p.id ===parseInt(id));
      if (product) {
        console.log("Este es su producto:", product);
        return product;
      } else {
        console.error(`Error: Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      console.error(error);
    
    }
  }

  async addProduct(title, description, code, price, status = true, stock, category, thumbnail) {
    const prodId = await this.getNextId()
    try {
      
      const products = await this.getProducts()
      const productExists = products.some((p) => p.code === code);
      if (productExists) {
        console.error(`Error: El código ${code} ya existe.`);
        return;
      }
      const product = {
        id: prodId,
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

  async deleteProd(id) {
    try {
     
      const product = await this.getProducts()
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
      const products = await this.getProducts()
      const productIndex = products.findIndex((p) => p.id === parseInt(id));
      if (productIndex === -1) {
        console.error(`Error: No se encontró el producto con id ${id}.`);
        return;
      }
      const productToUpdate = products[productIndex];
      const updatedProduct = {
        id: parseInt(id),
        title: title || productToUpdate.title,
        description: description || productToUpdate.description,
        code: code || productToUpdate.code,
        price: price || productToUpdate.price,
        stock: stock || productToUpdate.stock,
        category: category || productToUpdate.category,
        thumbnails: thumbnails || productToUpdate.thumbnails,
      };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(path, JSON.stringify(products));
      console.log(`Se actualizó el producto con id ${id}.`);
    } catch (error) {
      console.error(error);
    }
  }
}  