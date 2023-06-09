import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import prodRouter from "./DAO/routes/products.js";
import cartRouter from "./DAO/routes/cart.js";
import viewRouter from "./DAO/routes/views.router.js";
import { Server } from "socket.io";
import { ProductManager } from "./DAO/ProductManager.js";
import { logRequest } from "./DAO/midleware/midleware.js";

const app = express();
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", prodRouter);
app.use("/cart", cartRouter);
app.use("/", viewRouter);
app.use(express.static(__dirname + "/public"));
app.use(logRequest);

const httpServer = app.listen(8080, () => console.log("conectado"));

const mang = new ProductManager();
let messageChat=[];


export const socketServer = new Server(httpServer);

socketServer.on("connect", socket => {
  console.log("Nuevo cliente conectado");


  socket.on("message", data => {
    console.log(data);
  });
  socket.on("newUser", (data) => {
    const { user } = data;
    socket.broadcast.emit("userConnected", { username: user }); // Emite el nombre del usuario al evento "userConnected"
  });
  socket.on("getProducts", async () => {
    const products = await mang.getProducts();
    socket.emit("updateProducts", products);
  });
  socket.on("messageChat", (data) => {
    messageChat.push(data);
    socketServer.emit("messageLogs", messageChat);
  })
});
