import {Router} from "express";
import { ProductManager } from "../entregable.js";

const ProductManager1 = new ProductManager();
const products = await ProductManager1.getProducts();
const prodRouter = Router();

prodRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const prod = products.find((prod) => prod.id === parseInt(id));
    if (!prod) {
      return res.send({ id: id, message: `id ${id} no encontrado ` });
    }
    res.send(prod);
  } catch (error) {
    console.error(error);
    res.status(404).send("Error id no encontrado");
  }
});

prodRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    if (limit) {
      const firstProducts = products.slice(0, limit);
      res.send(firstProducts);
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

export default prodRouter;
