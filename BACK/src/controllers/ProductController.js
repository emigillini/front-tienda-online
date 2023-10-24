import { ProductService } from "../services/ProductService.js";
import CustomError from "../services/errors/CustomError.js";
import { EErrors } from "../services/errors/Enums.js";
import { generateProductErrorInfo } from "../services/errors/Info.js";
import { logger } from "../logger.js";
import { transport } from "../App.js";

const prodman1 = new ProductService();

export class ProductController {
  async getProdByid(req, res) {
    try {
      const product = await prodman1.getProdById(req.params.id);

      if (!product) {
        logger.warning(`Producto no encontrado para el id: ${req.params.id}`);
        const user = await req.session.user.role;
        return res.sendUserError({
          id: req.params.id,
          message: `id ${req.params.id} no encontrado `,
          rol: user,
        });
      }

      return res.sendSuccess(product);
    } catch (error) {
      logger.error(error);
      res.sendUserError("Error id no encontrado");
    }
  }
  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, category, stock } = req.query;
      const response = await prodman1.getProducts(
        limit,
        page,
        sort,
        category,
        stock
      );
      logger.info(`Productos encontrados `);
      return res.json(response);
    } catch (error) {
      res.status(404).json({ error: "Error interno del servidor" });
    }
  }

  async addProduct(req, res) {
    try {
      let { title, description, code, price, stock, category, thumbnail } =
        req.body;

      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !stock ||
        !category ||
        !thumbnail
      ) {
        CustomError.createError({
          name: "Error al agregar producto",
          cause: generateProductErrorInfo({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail,
          }),
          message: "Error al intentar agregar producto",
          code: EErrors.INVALID_TYPES,
        });
        res.sendUserError("Faltan campos requeridos para agregar el producto.");
      }

      //socketServer.emit("productAdded", product);
      const product = await prodman1.addProduct(
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail
      );
      res.sendSuccess({
        status: "Producto agregado exitosamente.",
        payload: product,
      });
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }
  async updateProduct(req, res) {
    try {
      const { title, description, code, price, stock, category, thumbnail } =
        req.body;
      const { id } = req.params;
      const prod = await prodman1.getProdById(id);
      if (!prod) {
        return res
          .status(404)
          .send({ message: `Producto con ID ${id} no encontrado.` });
      }
      const updatedProduct = await prodman1.updateProduct(
        id,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail
      );
      res.sendSuccess({
        status: "Producto actualizado exitosamente.",
        payload: updatedProduct,
      });
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }
  async deleteProd(req, res) {
    try {
      const prodId = req.params.id;
      const prod = await prodman1.getProdById(prodId);

      if (!prod) {
        return res.sendUserError({
          message: `Producto con ID ${prodId} no encontrado.`,
        });
      }

      const currentUserRole = await req.session.user.role;

      if (
        currentUserRole === "admin" ||
        (currentUserRole === "premium" && req.session.user.email === prod.owner)
      ) {
        await prodman1.deleteProd(prodId);
        res.sendSuccess({
          status: "Producto eliminado exitosamente.",
        });
        if (currentUserRole === "premium") {
          const mailOptions = {
            from: "emigillini@gmail.com", // Remitente
            to: req.session.user.email, // Dirección de correo del usuario premium
            subject: "Producto eliminado",
            text: `Tu producto con ID ${prodId} ha sido eliminado. Si tienes alguna pregunta, por favor, contacta al soporte.`,
          };
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(
                "Error al enviar el correo al usuario premium:",
                error
              );
            } else {
              console.log("Correo enviado al usuario premium:", info.response);
            }
          });
        }
      } else {
        res.status(403).json({ message: "Acceso denegado" });
      }

      //socketServer.emit("productDeleted", prodId);
    } catch (error) {
      logger.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }
}
