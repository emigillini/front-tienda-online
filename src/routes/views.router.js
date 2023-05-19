import {Router} from "express";

import { upload } from "../midleware/midleware.js";
import { ProductManager } from "../datos/ProductManager.js";


export const viewRouter = Router();

const x = new ProductManager()
const prod =await  x.getProducts()
console.log(prod)

viewRouter.get('/', (req, res)=>{
res.render('index', {prod, style:"index.css"})
})


viewRouter.post('/src/public/uploads', upload.single("Archivo"), (req, res) => {
    let file= req.file;
    if(!file){console.log("no existe archivo");}
    res.send(`Se ha recibido el adjunto: ${file.originalname}`);      
});

export default viewRouter