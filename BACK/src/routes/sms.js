import CustomRouter from "./router.js";
import { clients } from "../App.js";
import config from "../config/config.js";

const number = config.numtwillio


export default class SmsRouter extends CustomRouter {
  init() {
    this.get("/", async (req, res) => {
      try {
        const { nombre, producto } = req.query;
        let result = await clients.messages.create({
            body:`lo recibis ${nombre}su ${producto} `,
            from: number,
            to :"+54 351 718 3512"  
        })
       console.log(result)
        res.send({status: "succes" ,result:"enviado"})
      } catch (error) {
        // Manejo del error
        console.error(error);
        res.status(500).send("Error en el servidor");
      }
    });
  }
}
