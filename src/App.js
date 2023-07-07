import express from "express";
import session from "express-session";
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
import cookieRouter from "./DAO/routes/cookies.js";
import { MessageManagerBD } from "./DAO/MessageManagerBD.js";
import cookieParser from "cookie-parser";
import sessionRouter from "./DAO/routes/sessions.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config.js/passport-config.js";

const app = express();  
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreto"))
app.use(express.static(__dirname + "/public"));
app.use(logRequest);


app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://emigillini:Emiliano29782978@emigillini.agjop4k.mongodb.net/ecommerce",
    mongoOptions:{ useUnifiedTopology:true},
    ttl:3600
  }),
  secret:"secreto",
  resave:true,
  saveUninitialized:true
}))
app.use("/session", sessionRouter);
app.use("/products", prodRouter);
app.use("/productsBD", prodBDRouter);
app.use("/cartBD", cartBDRouter);
app.use("/cart", cartRouter);
app.use("/cookies", cookieRouter);
app.use("/", viewRouter);
initializePassport();
app.use(passport.initialize());
app.use(passport.session())

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
