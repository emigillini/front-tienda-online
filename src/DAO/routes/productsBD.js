import CustomRouter from "./router.js";
import { ProductManagerBD } from "../ProductManagerBD.js";
import { logRequest, msg } from "../midleware/midleware.js";
import { productsModel } from "../models/products_model.js";

const ProductManager1 = new ProductManagerBD();

const idValidator = /^[0-9]+$/;

export default class ProdBDRouter extends CustomRouter{
  init(){
    
    this.param("id", (req, res, next, value) => {
      if (!idValidator.test(value)) {
        return res.status(400).send("El id debe ser un número entero positivo.");
      }
      req.params.id = parseInt(value, 10);
      next();
    });
  
  this.get("/:id",  async (req, res) => {
    const product = await ProductManager1.getProductById(req.params.id);
    if (!product) {
      return res.sendUserError({ id: req.params.id, message: `id ${req.params.id} no encontrado ` });
    }
    return res.sendSuccess( product);
});

  this.get("/", logRequest, async (req, res) => {
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
      lean: false
    };
    const result = await productsModel.paginate(queryOptions, options);
    const transformedDocs = result.docs.map((doc) => ({
      _id: doc._id,
      id:doc.id,
      title: doc.title,
      description: doc.description,
      code:doc.code,
      price:doc.price,
      status:doc.status,
      stock:doc.stock,
      category:doc.category,
      thumbnail:doc.thumbnail
      
    }));
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
      payload: transformedDocs,
      
    };
  res.send(response);
    console.log(result.docs);
    
  } catch (error) {
    console.error(error);
    res.sendServerError("Error interno del servidor");
  }
});

  this.post("/", logRequest, async (req, res) => {
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
    ) 
    {
      res.sendUserError(
        "Faltan campos requeridos para agregar el producto.",
      );
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
    res.sendSuccess({ status: "Producto agregado exitosamente.", payload: product });
    //socketServer.emit("productAdded", product);
  } catch (error) {
    console.error(error);
    res.sendServerError("Error interno del servidor");
  }
});

  this.put("/:id", logRequest, async (req, res) => {
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
    res.sendSuccess("Producto actualizado exitosamente." );
  } catch (error) {
    console.error(error);
    res.sendServerError("Error interno del servidor");
  }
});

  this.delete("/:id", logRequest, async (req, res) => {
    try {
      const prodId = req.params.id;
      const prod = await ProductManager1.getProductById(prodId);
    if (!prod) {
      return res
        .status(404)
        .send({ message: `Producto con ID ${prodId} no encontrado.` });
    }
    await ProductManager1.deleteProd(prodId);
    res.sendSuccess( "Producto Eliminado exitosamente." );
    //socketServer.emit("productDeleted", prodId);
  } catch (error) {
    console.error(error);
    res.sendServerError("Error interno del servidor");
  }
})
}}
