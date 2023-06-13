import { Router } from "express";
import { logRequest, msg } from "../midleware/midleware.js";
import { CartManagerBD } from "../CartManagerBD.js";
import { ProductManagerBD } from "../ProductManagerBD.js";

const CartManager1 = new CartManagerBD();

const cartBDRouter = Router();

cartBDRouter.use(msg);

cartBDRouter.get("/", logRequest, async (req, res) => {
  try {
    const carts = await CartManager1.getCarts();
    const limit = parseInt(req.query.limit);
    if (limit) {
      const firstCarts = carts.slice(0, limit);
      res.send(firstCarts);
      console.log(firstCarts);
    } else {
      res.send({ status: "succes", payload: carts });
      console.log(carts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

cartBDRouter.get("/:id", logRequest, async (req, res) => {
  try {
    const cart = await CartManager1.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).send({
        id: req.params.id,
        message: `id ${req.params.id} no encontrado`,
      });
    }
    res.send({ status: "succes", payload: cart });
  } catch (error) {
    console.error(error);
    res.status(404).send("Error id no encontrado");
  }
});

cartBDRouter.post("/", logRequest, async (req, res) => {
  try {
    await CartManager1.addCart();
    res.send({ status: "carro agregado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

cartBDRouter.post("/:cid/product/:pid", logRequest, async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = 1;
  const cartManager = new CartManagerBD();
  const productManager = new ProductManagerBD();

  try {
    const product = await productManager.getProductById(pid);
    if (!product) {
      console.error(`Error: Producto con ID ${pid} no encontrado.`);
      return res
        .status(404)
        .send(`Error: Producto con ID ${pid} no encontrado.`);
    }

    await cartManager.addProductToCart(
      parseInt(cid),
      parseInt(pid),
      parseInt(quantity)
    );
    res.send(`Producto ${pid} agregado al carrito ${cid}.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar el producto al carrito.");
  }
});

export default cartBDRouter;
