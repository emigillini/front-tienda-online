import {Router} from "express";

export const pubRouter = Router();

let nombres =[]

pubRouter.post('/', (req, res) => {
    const nombre = req.body.nombre;
    nombres.push(nombre);
    console.log(`Se ha recibido el nombre: ${nombre}`);
    res.send(`Se ha recibido el nombre: ${nombre}`);
    console.log(nombres);       
});
