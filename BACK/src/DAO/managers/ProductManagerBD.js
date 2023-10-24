import { logger } from "../../logger.js";
import { productsModel } from "../models/products_model.js";

export class ProductManagerBD {
  constructor() {
    this.model = productsModel;
  }

  async getNextId() {
    try {
      const products = await this.model.find();
      const lastProduct = products[products.length - 1];
      return lastProduct ? lastProduct.id + 1 : 1;
    } catch (error) {
      logger.error(error);
    }
  }

  async getProducts(limit, page, sort, category, stock) {
    try {
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
      const result = await productsModel.paginate(queryOptions, options);
      const transformedDocs = result.docs.map((doc) => ({
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
      const totalPages = result.totalPages;
      const hasPrevPage = result.hasPrevPage;
      const hasNextPage = result.hasNextPage;
      const prevPage = result.prevPage;
      const nextPage = result.nextPage;
      const prevLink = hasPrevPage
        ? `/productsBD?limit=${limit}&page=${prevPage}&sort=${sort}`
        : null;
      const nextLink = hasNextPage
        ? `/productsBD?limit=${limit}&page=${nextPage}&sort=${sort}`
        : null;

      const response = {
        status: "success",
        limit: limit,
        page: page,
        prevPage: prevPage,
        nextPage: nextPage,
        totalProducts: result.totalDocs,
        totalPages: totalPages,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink,
        payload: transformedDocs,
      };

      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.model.findOne({ id: id });
      if (product) {
        logger.info("Este es su producto:", product._doc);
        return product;
      } else {
        logger.error(`Error: Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      logger.error(error);
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
      const product = await productsModel.create({
        id: prodId,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      });
      logger.info(`Se agregó el producto "${title}" a la base de datos`);
      return product;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteProd(id) {
    try {
      await this.model.findOneAndDelete({ id: id });

      return logger.info(`Se eliminó el producto con id ${id}.`);
    } catch (error) {
      logger.error(error);
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
    thumbnail
  ) {
    try {
      const productToUpdate = await this.model.findOne({ id: id });
      if (!productToUpdate) {
        logger.warning(`Error: No se encontró el producto con id ${id}.`);
        return;
      }
      const updatedProduct = {
        title: title || productToUpdate.title,
        description: description || productToUpdate.description,
        code: code || productToUpdate.code,
        price: price || productToUpdate.price,
        stock: stock || productToUpdate.stock,
        category: category || productToUpdate.category,
        thumbnail: thumbnail || productToUpdate.thumbnail,
      };
      await this.model.updateOne({ id: id }, updatedProduct);
      logger.info(`Se actualizó el producto con id ${id}.`);
    } catch (error) {
      logger.error(error);
    }
  }
}
