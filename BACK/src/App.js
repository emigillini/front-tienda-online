import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import ProdRouter from "./routes/products.js";
import CartRouter from "./routes/cart.js";
import TicketRouter from "./routes/ticket.js";
import UserRouter from "./routes/user.js";
import { Server } from "socket.io";
import { ProductManagerFS } from "./DAO/managers/ProductManagerFS.js";
import { logRequest } from "./DAO/midleware/midleware.js";
import CookieRouter from "./routes/cookies.js";
import { MessageManagerBD } from "./DAO/managers/MessageManagerBD.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config/passport-config.js";
import JwtRouter from "./routes/jwt.js";
import SessionRouter from "./routes/sessions.js";
import ViewRouter from "./routes/views.router.js";
import config from "./config/config.js";
import MongoSingleton from "./utils.js";
import cors from "cors";
import MailRouter from "./routes/mail.js";
import nodemailer from "nodemailer"
import twilio from "twilio";
import SmsRouter from "./routes/sms.js";
import MockRouter from "./routes/mock.js";
import compression from "express-compression"
import { addLogger } from "./logger.js";
import { logger } from "./logger.js";
import swaggerJSdoc from "swagger-jsdoc"
import swaggerUiExpress from "swagger-ui-express"
import PaymentRouter from "./routes/payments.router.js"
const mongodbURl = config.mongoURL;
const mailcontra = config.gmailcontra;
const PORT = config.port;
const secret = config.secret;
const acountsid= config.sidtwillio;
const token= config.tokentwillio;
const num= config.numtwillio
const app = express();
const swaggerOptions ={
  definition:{
      openapi: "3.0.1",
      info:{
          title:"Tienda Online",
          description:"Tienda",
        
      }
  },
  apis:[`${__dirname}/**/*.yaml`]
}//C:\Users\emigi\Desktop\backend\mascota\RecursosBackend-Adoptme
const specs =swaggerJSdoc(swaggerOptions);
app.use(cors());
app.use("/apidocs",swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
app.use(addLogger)
app.use(compression({
  brotli:{enabled:true, zlib:{}}
}))

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreto"));
app.use(express.static(__dirname + "/public"));
app.use(logRequest);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongodbURl,
      mongoOptions: { useUnifiedTopology: true },
      ttl: 3600,
    }),
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      // Aquí configura las opciones de las cookies
      secure: false, // Configúralo como 'true' si estás utilizando HTTPS
      maxAge: 3600000, // Tiempo de vida de la cookie en milisegundos (1 hora en este caso)
    },
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
const mockRouter = new MockRouter();
app.use("/mockingproducts", mockRouter.getRouter())
const sessionRouter = new SessionRouter();
app.use("/session", sessionRouter.getRouter());
const smsRouter = new SmsRouter();
app.use("/sms", smsRouter.getRouter())
const mailRouter = new MailRouter()
app.use("/mail" ,mailRouter.getRouter()) 
const userRouter = new UserRouter();
app.use("/user", userRouter.getRouter());
const prodRouter = new ProdRouter();
app.use("/products", prodRouter.getRouter());
const ticketRouter = new TicketRouter();
app.use("/tickets", ticketRouter.getRouter());
const cartRouter = new CartRouter();
app.use("/cart", cartRouter.getRouter());
const cookieRouter = new CookieRouter();
app.use("/cookies", cookieRouter.getRouter());
const jwtRouter = new JwtRouter();
app.use("/jwt", jwtRouter.getRouter());
const viewRouter = new ViewRouter();
app.use("/", viewRouter.getRouter());

app.use('/api/payments', PaymentRouter)

const httpServer = app.listen(PORT, () => {
  logger.info("Servidor conectado");
});

const mang = new ProductManagerFS();

let messageChat = [];

process.on("uncaughtException", (err) => {
  logger.error("Se ha producido una excepción no capturada:");
  logger.error(err);
});

export const socketServer = new Server(httpServer);

socketServer.on("connect", (socket) => {
  logger.info("Nuevo cliente conectado");

  socket.on("message", (data) => {
    logger.http(data);
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

      logger.info("Mensaje guardado correctamente:", data);
    } catch (error) {
      logger.error("Error al guardar el mensaje:", error);
    }
  });
});

 export const transport = nodemailer.createTransport({
  service:"gmail",
  port:587,
  auth:{
    user:"emigillini@gmail.com",
    pass:mailcontra
  }
})

export const clients = twilio(acountsid,token,num)



export const connectToDatabase = async () => {
  try {
    await MongoSingleton.getInstance();

    logger.info("Conectado a la base de datos");
  } catch (error) {
    logger.fatal("No se puede acceder a la base de datos:", error);
    process.exit(1);
  }
};


app.get("/facil", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += i;
  }

  const response = {
    status: "success",
    payload: sum
  };

  res.json(response); 
});

app.get("/dificil", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 9e8; i++) {
    sum += i;
  }

  const response = {
    status: "success",
    payload: sum
  };

  res.json(response); 
});

app.get("/loggerTest", (req, res) => {
  req.logger.debug("Mensaje de depuración");
  req.logger.http("Mensaje de solicitud HTTP");
  req.logger.info("Mensaje de información");
  req.logger.warning("Mensaje de advertencia");
  req.logger.error("Mensaje de error");
  req.logger.fatal("Mensaje fatal");

  res.send("Prueba de logs realizada");
});
