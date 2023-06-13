import { Router } from "express";
import { CartManager } from "../CartManager.js";
import { ProductManager } from "../ProductManager.js";
import { logRequest, msg } from "../midleware/midleware.js";

const CartManager1 = new CartManager();

const cartRouter = Router();

cartRouter.use(msg);

cartRouter.get("/:id", logRequest, async (req, res) => {
  try {
    const cart = await CartManager1.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).send({
        id: req.params.id,
        message: `id ${req.params.id} no encontrado`,
      });
    }
    res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(404).send("Error id no encontrado");
  }
});

cartRouter.post("/", logRequest, async (req, res) => {
  try {
    await CartManager1.addCart();
    res.send({ message: "Cart agregado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

cartRouter.post("/:cid/product/:pid", logRequest, async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = 1;
  const cartManager = new CartManager();
  const productManager = new ProductManager();

  try {
    const product = await productManager.getProductById(pid);
    if (!product) {
      console.error(`Error: Producto con ID ${pid} no encontrado.`);
      return res
        .status(404)
        .send(`Error: Producto con ID ${pid} no encontrado.`);
    }

    await cartManager.addProductToCart(parseInt(cid), parseInt(pid), quantity);
    res.send(`Producto ${pid} agregado al carrito ${cid}.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar el producto al carrito.");
  }
});

export default cartRouter;
