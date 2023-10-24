import { ViewService } from "../services/viewsService.js";
import { ProductService } from "../services/ProductService.js";
import { logger } from "../logger.js";

const x = new ProductService();
const prod = x.getProducts();

const viewsService1 = new ViewService();

export class viewsController {
  async login(req, res) {
    res.render("login", {});
  }
  async getProducts(req, res) {
    const limit = req.query.limit || 3;
    const page = req.query.page || 1;
    const category = req.query.category || null;
    const price = req.query.price || null;
    const stock = req.query.stock || null;
    const sort = req.query.sort || null;

    try {
      const products = await viewsService1.getProducts(
        limit,
        page,
        category,
        price,
        stock,
        sort
      );

      const totalPages = products.totalPages;
      const hasPrevPage = products.hasPrevPage;
      const hasNextPage = products.hasNextPage;
      const prevPage = products.prevPage;
      const nextPage = products.nextPage;
      const prevLink = hasPrevPage ? `/index?page=${prevPage}` : null;
      const nextLink = hasNextPage ? `/index?page=${nextPage}` : null;

      const payload = {
        status: "success",
        products: products.docs,
        hasPrevPage,
        prevPage,
        hasNextPage,
        page,
        nextPage,
        totalPages,
        prevLink,
        nextLink,
      };

      res.render("index", {
        payload,
        style: "index.css",
        user: req.session.user,
      });
    } catch (error) {
      logger.error(error);
      res.sendServerError("Internal Server Error");
    }
  }

  async chat(req, res) {
    res.render("chat", { prod, style: "chat.css" });
  }
  async error(req, res) {
    res.render("error", {});
  }
  async uploadFile(req, res) {
    try {
      const file = await viewsService1.uploadFile(req.file);
      res.sendSuccess(`Se ha recibido el adjunto: ${file.originalname}`);
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error al subir el archivo");
    }
  }
}
