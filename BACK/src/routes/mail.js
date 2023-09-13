import CustomRouter from "./router.js";
import { transport } from "../App.js";
import { __dirname } from "../utils.js";


export default class MailRouter extends CustomRouter {
  init() {
    this.get("/resetPassword", async (req, res) => {
      try {
        
       const email= "emigillini@hotmail.com"
        
       const resetLink=`http://localhost:8080/session/restore-password?`
        let result = await transport.sendMail({
            from: "emigillini@gmail.com",
            to: email,
            subject:"Recuperacion",
            html:`<div><h1>Recuperar </h1>
            <div>Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}</div>
            </div>
            `,
            /*attachments:[
                {
                    filename :"imagen.jfif",
                    path:__dirname+"../BACK/src/public/imagen/imagen.jfif",
                    cid:"imagen"
                }
            ],*/
            
        })
        res.send(result)
      } catch (error) {
       
        console.error(error);
        res.status(500).send("Error en el servidor");
      }
    });
  }
}
