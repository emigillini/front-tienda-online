import {Router} from "express";
import { upload } from "../utils/midleware.js";

export const pubRouter = Router();

let nombres =[]

pubRouter.post('/', (req, res) => {
    const nombre = req.body.nombre;
    nombres.push(nombre);
    console.log(`Se ha recibido el nombre: ${nombre}`);
    res.send(`Se ha recibido el nombre: ${nombre}`);
    console.log(nombres);       
});

pubRouter.post('/upload', upload.single("Archivo"), (req, res) => {
    let file= req.file;
    if(!file){console.log("no existe archivo");}
    res.send(`Se ha recibido el adjunto: ${file.originalname}`);      
});

export default pubRouter