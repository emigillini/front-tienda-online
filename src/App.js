import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import ProdRouter from "./DAO/routes/products.js";
import CartRouter from "./DAO/routes/cart.js";
import { Server } from "socket.io";
import { ProductManager } from "./DAO/ProductManager.js";
import { logRequest } from "./DAO/midleware/midleware.js";
import mongoose from "mongoose";
import CookieRouter from "./DAO/routes/cookies.js";
import { MessageManagerBD } from "./DAO/MessageManagerBD.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config/passport-config.js";
import JwtRouter from "./DAO/routes/jwt.js";
import ProdBDRouter from "./DAO/routes/productsBD.js";
import CartBDRouter from "./DAO/routes/cartsBD.js";
import SessionRouter from "./DAO/routes/sessions.js";
import ViewRouter from "./DAO/routes/views.router.js"
import config from "./config/config.js";
const mongodbURl = config.mongoURL
const PORT = config.port
const secret = config.secret
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
    mongoUrl: mongodbURl,
    mongoOptions:{ useUnifiedTopology:true},
    ttl:3600
  }),
  secret:secret,
  resave:true,
  saveUninitialized:true
}))
const sessionRouter = new SessionRouter()
app.use("/session", sessionRouter.getRouter());
const prodRouter = new ProdRouter()
app.use("/products", prodRouter.getRouter());
const prodBDRouter = new ProdBDRouter()
app.use("/productsBD", prodBDRouter.getRouter());
const cartBDRouter = new CartBDRouter()
app.use("/cartBD", cartBDRouter.getRouter());
const cartRouter = new CartRouter()
app.use("/cart", cartRouter.getRouter());
const cookieRouter = new CookieRouter()
app.use("/cookies", cookieRouter.getRouter());
const jwtRouter = new JwtRouter()
app.use("/jwt", jwtRouter.getRouter());
const viewRouter = new ViewRouter()
app.use("/", viewRouter.getRouter());
initializePassport();
app.use(passport.initialize());
app.use(passport.session())



const httpServer = app.listen(PORT, () => console.log("conectado"));

const mang = new ProductManager();



let messageChat = [];

process.on('uncaughtException', (err) => {
  console.log('Se ha producido una excepción no capturada:');
  console.log(err);
});


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
      mongodbURl
    );

    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("No se puede acceder a la base de datos:", error);
    process.exit(1);
  }
};

connectToDatabase();

/*Owned by: @emigillini

App ID: 359008

Client ID: Iv1.6feaa2bc46883067

client secret:ed9cf008bd382819dc251189d080c9e0444d63d9
*/