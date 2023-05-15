import express from "express";
import productsRouter from "./routes/products.js";
import { pubRouter } from "./routes/publica.js";
import cartRouter from "./routes/cart.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/publica", pubRouter);
app.use('/publica' , express.static('public'))



const server = app.listen(8080, () => console.log("conectado"));

