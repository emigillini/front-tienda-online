import {Router} from "express";

export const pubRouter = Router();

let nombres =[]

pubRouter.post('/', (req, res) => {
    const nombre = req.body;
    nombres.push(nombre);
    const ultimoNombre = nombres.length > 0 ? nombres[nombres.length - 1].nombre : '';
    console.log(`Se ha recibido el nombre: ${ultimoNombre}`);
    res.send(`Se ha recibido el nombre: ${ultimoNombre}`);
    console.log(nombres);       
});
