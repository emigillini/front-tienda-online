import { productsModel } from "../DAO/models/products_model.js";
import { logger } from "../logger.js";



export class ViewService{
    async  getProducts (limit, page, category, price, stock, sort){
        let query = {};

    if (category) {
      query.category = category;
    }
    if (price) {
      query.price = price;
    }
    if (stock) {
      query.stock = stock;
    }

    let sortOptions = {};

    if (sort) {
      if (sort === "asc") {
        sortOptions = { price: 1 };
      } else if (sort === "desc") {
        sortOptions = { price: -1 };
      }
    }
    try {
        const result = await productsModel.paginate(query, {
          page,
          limit,
          sort: sortOptions,
          lean: true,
          leanWithId: false,
        });
  
        return result;
     } catch (error) {
        logger.error (error);
        throw new Error("Internal Server Error");  
        }
    }
    async uploadFile (file){
        if (!file) {
            throw new Error("No se encontró el archivo");
          }
          return file;
    }
}




