import { ProductServiceFS } from "./ProductServiceFS.js";

const prodman1 = new ProductServiceFS();

export class ProductControllerFS {
  async getProdByid(req, res) {
    try {
      const product = await prodman1.getProdById(req.params.id);
      if (!product) {
        return res.sendUserError({
          id: req.params.id,
          message: `id ${req.params.id} no encontrado `,
        });
      }
      return res.sendSuccess(product);
    } catch (error) {
      console.error(error);
      res.sendUserError("Error id no encontrado");
    }
  }
  async getProducts(req, res) {
    try {
        const product= await prodman1.getProducts(req.query.limit);
      return res.sendSuccess(product);
    } catch (error) {
      res.sendServerError("Error interno del servidor");
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
      console.error(error);
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
      console.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }
  async deleteProd(req, res) {
    try {
      const prodId = req.params.id;
      const prod = await prodman1.getProdById(prodId);
      if (!prod) {
        return res
          .status(404)
          .send({ message: `Producto con ID ${prodId} no encontrado.` });
      }
      const deletedProd = await prodman1.deleteProd(prodId);
      res.sendSuccess({
        status: "Producto eliminado exitosamente.",
        payload: deletedProd,
      });
      //socketServer.emit("productDeleted", prodId);
    } catch (error) {
      console.error(error);
      res.sendServerError("Error interno del servidor");
    }
  }
}
