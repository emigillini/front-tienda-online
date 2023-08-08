import { ProductManagerBD } from "../DAO/managers/ProductManagerBD.js";
import { productsModel } from "../DAO/models/products_model.js";

const prodman1 = new ProductManagerBD();

export class ProductService {
  async getProdById(id) {
    try {
      const product = await prodman1.getProductById(id);
      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el producto por ID");
    }
  }
  async getProducts(limit, page, sort, category, stock) {
    try {
      const response = await prodman1.getProducts(limit, page,sort, category,stock)
      return response
    } catch (error) {
      console.error(error);
      throw new Error("Error ");
    }
  }
  
  async addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail
  ) {
    try {
      const product = await prodman1.addProduct(
        title,
        description,
        code,
        price,
        true,
        stock,
        category,
        thumbnail
      );
      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Error ");
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
      const product = await prodman1.updateProduct(
        id,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
      );
      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar productos ");
    }
  }
  async deleteProd(id) {
    try {
      const product = await prodman1.deleteProd(id);
      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar productos ");
    }
  }
}
