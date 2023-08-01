import { ProductManagerBD } from "./ProductManagerBD.js";
import { productsModel } from "./models/products_model.js";

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
