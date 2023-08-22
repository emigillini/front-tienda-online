import CustomRouter from "./router.js";
import { generarProductosSimulados } from "../MOCKS/productsmock.js";


export default class MockRouter extends CustomRouter {
  init() {
    this.get("/",async(req, res)=>{
        try {
            const prodsim = await generarProductosSimulados(1005)
            res.send(prodsim)
        } catch (error) {
            console.error(error);
            res.status(500).send("Error en el servidor"); 
        }

    });
    
  }
}
