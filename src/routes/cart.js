import {Router} from "express";
import { CartManager } from "../CartManager.js";

const CartManager1 = new CartManager()

const cartRouter = Router();

cartRouter.use((req, res, next)=>{
  console.log("gracias")
  next()
})

const logRequest = (req, res, next) => {
  console.log(`Request recibida: ${new Date()}`);
  next();
}

cartRouter.get("/:id", logRequest,async (req, res) => {
    try {
      const cart = await CartManager1.geCartById(req.params.id);
      if (!cart) {
        return res.send({ id: id, message: `id ${id} no encontrado ` });
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

  cartRouter.post("/:id/product/:id", logRequest, async(req, res)=>{

  })
export default cartRouter