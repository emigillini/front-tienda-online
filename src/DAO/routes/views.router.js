import { Router } from "express";
import { productsModel } from "../models/products_model.js";
import { upload } from "../midleware/midleware.js";
import { ProductManagerBD } from "../ProductManagerBD.js";

export const viewRouter = Router();

const x = new ProductManagerBD();
const prod = await x.getProducts();

viewRouter.get("/", async (req, res) => {
  const limit = req.query.limit || 3;
  const page = req.query.page || 1;
  const category = req.query.category || null;
  const price = req.query.price || null;
  const stock = req.query.stock || null;

  const sort = req.query.sort || null;

  try {
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

    const result = await productsModel.paginate(query, {
      page,
      limit,
      sort: sortOptions,
      lean: true,
      leanWithId: false
    });

    const totalPages = result.totalPages;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const prevLink = hasPrevPage ? `/?page=${prevPage}` : null;
    const nextLink = hasNextPage ? `/?page=${nextPage}` : null;

    const payload = {
      status: "succes",
      products: result.docs,
      hasPrevPage,
      prevPage,
      hasNextPage,
      page,
      nextPage,
      totalPages,
      prevLink,
      nextLink,
    };

    console.log(payload);

    res.render("index", {
      payload,
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
