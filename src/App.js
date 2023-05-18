import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import viewRouter from "./routes/views.router.js";
import { Server } from "socket.io";




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


const httpServer = app.listen(8080, () => console.log("conectado"));
const socketServer= new Server (httpServer)
socketServer.on('connect', socket=>{
    console.log('nuevo cliente conectado')
    socket.on('message', data=>{
        console.log(data)
    })
    socket.emit('evento individual', 'solo para vos')
    socket.broadcast.emit('evento todos menos yo', 'todos menos yo')
    socketServer.emit('evento todos', 'todos lo reciben')
})

