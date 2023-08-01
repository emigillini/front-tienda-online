import { ProductManager } from "./ProductManager.js";

const prodman1 = new ProductManager()

export class ProductServiceFS {
  async getProdById(id) {
    try {
      const product = await prodman1.getProductById(id);
      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el producto por ID");
    }
  } 
  async getProducts(limit) {
    try {
        const products = await prodman1.getProducts();
        if (limit) {
            const firstProducts = products.slice(0, limit);
            return firstProducts}
        else {return products}
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

