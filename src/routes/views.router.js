import {Router} from "express";

import { upload } from "../midleware/midleware.js";

export const viewRouter = Router();

viewRouter.get('/', (req, res)=>{
let testUser= {name:"pedro" ,lastName:"jota", rol:"user"}
res.render('index', {testUser, style:"index.css"})
})


viewRouter.post('/src/public/uploads', upload.single("Archivo"), (req, res) => {
    let file= req.file;
    if(!file){console.log("no existe archivo");}
    res.send(`Se ha recibido el adjunto: ${file.originalname}`);      
});

export default viewRouter