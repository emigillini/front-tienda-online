import { Router } from "express";
import { productsModel } from "../models/products_model.js";
import { upload } from "../midleware/midleware.js";
import { ProductManagerBD } from "../ProductManagerBD.js";

export const viewRouter = Router();

const x = new ProductManagerBD();
const prod = await x.getProducts();

viewRouter.get("/", async (req, res) => {
  const { limit = 3, page = 1, sort, category, stock } = req.query;
  const queryOptions = {};

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

  try {
    const result = await productsModel.paginate(queryOptions, options);

    const totalPages = result.totalPages;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const prevLink = hasPrevPage ? `/?page=${prevPage}` : null;
    const nextLink = hasNextPage ? `/?page=${nextPage}` : null;

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
      products: result.docs
    };

    console.log(response.products);

    res.render("index", {
      payload: response,
      style: "index.css",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


viewRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", { prod, style: "index.css" });
});

viewRouter.get("/chat", (req, res) => {
  res.render("chat", { prod, style: "chat.css" });
});

viewRouter.post("/src/public/uploads", upload.single("Archivo"), (req, res) => {
  let file = req.file;
  if (!file) {
    console.log("no existe archivo");
  }
  res.send(`Se ha recibido el adjunto: ${file.originalname}`);
});

export default viewRouter;
