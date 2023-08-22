import CustomRouter from "./router.js";
import { transport } from "../App.js";
import { ProductService } from "../services/ProductService.js";

const produ = new ProductService()

export default class MailRouter extends CustomRouter {
  init() {
    this.get("/", async (req, res) => {
      try {
        const prd = await produ.getProdById(1)
        console.log(prd)
        let result = await transport.sendMail({
            from: "emigillini@gmail.com",
            to: "emigillini@hotmail.com",
            subject:"prueba",
            html:`<div><h1>Prueba gato${prd}</h1>
            <img src="cid:imagen"/>   
            </div>
            `,
            attachments:[
                {
                    filename :"imagen.jfif",
                    path:"../BACK/src/public/imagen/imagen.jfif",
                    cid:"imagen"
                }
            ],
            
        })
        res.send(result)
      } catch (error) {
        // Manejo del error
        console.error(error);
        res.status(500).send("Error en el servidor");
      }
    });
  }
}
