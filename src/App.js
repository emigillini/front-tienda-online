import express from "express";
import fs from "fs/promises";

const path = "productos.json";
const utf = "utf-8";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(path, utf);
    const products = JSON.parse(data);
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/products", async (req, res) => {
  try {
    const data = await fs.readFile(path, utf);
    const products = JSON.parse(data);
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

app.get("/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(path, utf);
    const products = JSON.parse(data);
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

const server = app.listen(8080, () => console.log("conectado"));
