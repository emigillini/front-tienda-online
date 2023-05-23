import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import viewRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import { ProductManager } from "./datos/ProductManager.js";
import { logRequest } from "./midleware/midleware.js";



const app = express();
app.engine('handlebars',handlebars.engine())
app.set("views", __dirname+"/views")
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/", viewRouter);
app.use(express.static(__dirname + "/public"));
app.use(logRequest)


const httpServer = app.listen(8080, () => console.log("conectado"));


const mang = new ProductManager()


export const socketServer = new Server(httpServer);

socketServer.on('connect', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.on('getProducts', async () => {
    const products = await mang.getProducts();
    socket.emit('updateProducts', products);
  });

});
