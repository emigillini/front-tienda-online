import { productsModel } from "./models/products_model.js";



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
      console.error(error);
    }
  }
  async getProducts() {
    try {
      let products = await this.model.find()
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.model.findOne({id:id})
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
      
      const product = await productsModel.create( {
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
      console.log(`Se agregó el producto "${title}" a la base de datos`);
      return product
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProd(id) {
    try {
    await this.model.findOneAndDelete({id:id})
     
      return console.log(`Se eliminó el producto con id ${id}.`);
    } catch (error) {
      console.error(error);
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
      const productToUpdate = await this.model.findOne({id:id});
      if (!productToUpdate) {
        console.error(`Error: No se encontró el producto con id ${id}.`);
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
      await this.model.updateOne({id:id}, updatedProduct);
      console.log(`Se actualizó el producto con id ${id}.`);
    } catch (error) {
      console.error(error);
    }
  }
}
