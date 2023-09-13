import CustomRouter from "./router.js";
import { transport } from "../App.js";
import { __dirname } from "../utils.js";
import {  generateResetToken, verifyResetToken } from "../utils.js";


export default class MailRouter extends CustomRouter {
  init() {
    this.get("/resetPassword", async (req, res) => {
      try {
        
       const email= req.session.user.email
        const resetToken = generateResetToken(email)
        const resetLink = `http://localhost:8080/mail/reset-password?token=${resetToken}`
        let result = await transport.sendMail({
            from: "emigillini@gmail.com",
            to: email,
            subject:"Recuperacion",
            html:`<div><h1>Recuperar </h1>
            <div>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">${resetLink}</a></div>
            </div>
            `
           
            
        })
        res.send(result)
      } catch (error) {
       
        console.error(error);
        res.status(500).send("Error en el servidor");
      }
    });

    this.get("/reset-password", async (req, res) => {
      try {
        const { token } = req.query;

        // Verificar si el token ha expirado
        if (!verifyResetToken(token)) {
          // Redirigir a una vista que permita generar un nuevo correo de restablecimiento
          res.redirect("/resetPassword");
          return;
        }

        // Renderizar la página de restablecimiento de contraseña
        // Aquí puedes mostrar un formulario para que el usuario ingrese una nueva contraseña
        // y manejar la lógica para evitar que se use la misma contraseña
        res.render("restore-password", {token});
      } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
      }
    });
  }
  
}
