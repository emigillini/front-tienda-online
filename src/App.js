import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import prodRouter from "./DAO/routes/products.js";
import cartRouter from "./DAO/routes/cart.js";
import viewRouter from "./DAO/routes/views.router.js";
import prodBDRouter from "./DAO/routes/productsBD.js";
import { Server } from "socket.io";
import { ProductManager } from "./DAO/ProductManager.js";
import { logRequest } from "./DAO/midleware/midleware.js";
import mongoose from "mongoose";
import cartBDRouter from "./DAO/routes/cartsBD.js";
import { MessageManagerBD } from "./DAO/MessageManagerBD.js";

const app = express();
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", prodRouter);
app.use("/productsBD", prodBDRouter);
app.use("/cartBD", cartBDRouter);
app.use("/cart", cartRouter);
app.use("/", viewRouter);

app.use(express.static(__dirname + "/public"));
app.use(logRequest);

const httpServer = app.listen(8080, () => console.log("conectado"));

const mang = new ProductManager();

let messageChat = [];

export const socketServer = new Server(httpServer);

socketServer.on("connect", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("message", (data) => {
    console.log(data);
  });
  socket.on("newUser", (data) => {
    const { user } = data;
    socket.broadcast.emit("userConnected", { username: user });
  });
  socket.on("getProducts", async () => {
    const products = await mang.getProducts();
    socket.emit("updateProducts", products);
  });
  socket.on("messageChat", (data) => {
    messageChat.push(data);
    socketServer.emit("messageLogs", messageChat);
  });
  socket.on("messageChat", async (data) => {
    const { user, messageChat } = data;

    try {
      const messageManager = new MessageManagerBD();
      await messageManager.addMessages({ user, message: messageChat });

      console.log("Mensaje guardado correctamente:", data);
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  });
});

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://emigillini:Emiliano29782978@emigillini.agjop4k.mongodb.net/ecommerce"
    );

    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("No se puede acceder a la base de datos:", error);
    process.exit(1);
  }
};

connectToDatabase();
