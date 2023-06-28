import { Router } from "express";
import { ProductManagerBD } from "../ProductManagerBD.js";
import { logRequest, msg } from "../midleware/midleware.js";
import { productsModel } from "../models/products_model.js";

const ProductManager1 = new ProductManagerBD();

const prodBDRouter = Router();

prodBDRouter.use(msg);

prodBDRouter.get("/:id", logRequest, async (req, res) => {
  try {
    const prod = await ProductManager1.getProductById(req.params.id);
    if (!prod) {
      return res.send({ id: id, message: `id ${id} no encontrado ` });
    }
    res.send({ status: "succes", payload: prod });
  } catch (error) {
    console.error(error);
    res.status(404).send("Error id no encontrado");
  }
});

prodBDRouter.get("/:id", logRequest, async (req, res) => {
  try {
    const prod = await ProductManager1.getProductById(req.params.id);
    if (!prod) {
      return res.send({ id: id, message: `id ${id} no encontrado` });
    }
    res.send({ status: "success", payload: prod });
  } catch (error) {
    console.error(error);
    res.status(404).send("Error id no encontrado");
  }
});

prodBDRouter.get("/", logRequest, async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category, stock } = req.query;
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
      lean: true
    };

    const result = await productsModel.paginate(queryOptions, options);

    const totalPages = result.totalPages;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const prevLink = hasPrevPage ? `/productsBD?limit=${limit}&page=${prevPage}&sort=${sort}` : null;
    const nextLink = hasNextPage ? `/productsBD?limit=${limit}&page=${nextPage}&sort=${sort}` : null;

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
      payload: result.docs
    };

    res.send(response);
    console.log(result.docs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});


prodBDRouter.post("/", logRequest, async (req, res) => {
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
      res.status(400).send({
        message: "Faltan campos requeridos para agregar el producto.",
      });
      return;
    }

    const product = await ProductManager1.addProduct(
      title,
      description,
      code,
      price,
      true,
      stock,
      category,
      thumbnail
    );
    res.send({ status: "Producto agregado exitosamente.", payload: product });
    //socketServer.emit("productAdded", product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

prodBDRouter.put("/:id", logRequest, async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    const { id } = req.params;
    const prod = await ProductManager1.getProductById(id);
    if (!prod) {
      return res
        .status(404)
        .send({ message: `Producto con ID ${id} no encontrado.` });
    }
    await ProductManager1.updateProduct(
      id,
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails
    );
    res.send({ status: "Producto actualizado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

prodBDRouter.delete("/:id", logRequest, async (req, res) => {
  try {
    const prodId = req.params.id;
    const prod = await ProductManager1.getProductById(prodId);
    if (!prod) {
      return res
        .status(404)
        .send({ message: `Producto con ID ${prodId} no encontrado.` });
    }
    await ProductManager1.deleteProd(prodId);
    res.send({ status: "Producto Eliminado exitosamente." });
    //socketServer.emit("productDeleted", prodId);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

export default prodBDRouter;
