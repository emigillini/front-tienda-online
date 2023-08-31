import fs from "fs";
import { createEmptyArray } from "../../utils.js";
import { logger } from "../../logger.js";
const path = "productos.json";
const utf = "utf-8";

createEmptyArray(path, utf);

export class ProductManagerFS {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = path;
  }

  async getNextId() {
    try {
      const products = await this.getProducts();
      const lastProduct = products.payload[products.payload.length - 1];
      return lastProduct ? lastProduct.id + 1 : 1;
    } catch (error) {
      logger.error (error);
    }
  }
  async getProducts(limit, page, sort, category, stock) {
    try {
      let mostarProd = await fs.promises.readFile(path, utf);
      let products = JSON.parse(mostarProd);
      let queryOptions = {};
      if (category) {
        queryOptions.category = category;
      }
      if (stock) {
        queryOptions.stock = stock;
      }
      let sortOptions = {};
      if (sort === "asc") {
        sortOptions.price = 1;
      } else if (sort === "desc") {
        sortOptions.price = -1;
      }
      const options = {
        page: page,
        limit: limit,
        sort: sortOptions,
        lean: false,
      };
      const transformedDocs = products.payload.map((doc) => ({
        _id: doc._id,
        id: doc.id,
        title: doc.title,
        description: doc.description,
        code: doc.code,
        price: doc.price,
        status: doc.status,
        stock: doc.stock,
        category: doc.category,
        thumbnail: doc.thumbnail,
      }));
      const response = {
        status: "success",
        limit: limit,
        page: page,
        payload: transformedDocs,
      };
      
      return response;
    } catch (error) {
      logger.error (error);
    }
  }
 
  
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.payload.find((p) => p.id === parseInt(id));
      if (product) {
        logger.info("Este es su producto:", product);
        return product;
      } else {
        logger.error (`Error: Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      logger.error (error);
    }
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail
  ) {
    const prodId = await this.getNextId();
    try {
      const products = await this.getProducts();
      const productExists = products.payload.some((p) => p.code === code);
      if (productExists) {
        logger.warning(`Error: El código ${code} ya existe.`);
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
        thumbnail,
      };
      products. payload.push(product);
      await fs.promises.writeFile(path, JSON.stringify(products));
      logger.info(`Se agregó el producto "${title}" al archivo ${path}.`);
    } catch (error) {
      logger.error (error);
    }
  }

  async deleteProd(id) {
    try {
      const product = await this.getProducts();
      let indexOf = product.payload.findIndex((p) => p.id === id);
      product.payload.splice(indexOf, 1);
      await fs.promises.writeFile(path, JSON.stringify(product));
      return logger.info(`Se eliminó el producto con id ${id}.`);
    } catch (error) {
      logger.error (error);
    }
  }
  async updateProduct(
    id,
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  ) {
    try {
      const products = await this.getProducts();
      const productIndex = products.payload.findIndex((p) => p.id === parseInt(id));
      if (productIndex === -1) {
        logger.error (`Error: No se encontró el producto con id ${id}.`);
        return;
      }
      const productToUpdate = products.payload[productIndex];
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
      products.payload[productIndex] = updatedProduct;
      await fs.promises.writeFile(path, JSON.stringify(products));
      logger.info(`Se actualizó el producto con id ${id}.`);
    } catch (error) {
      logger.error (error);
    }
  }
}
