import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);

const server = app.listen(8080, () => console.log("conectado"));
