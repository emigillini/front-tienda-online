import { Router } from "express";
import { auth } from "../midleware/midleware.js";

const sessionRouter = Router();

sessionRouter.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se visitó el sitio ${req.session.counter} veces`);
    console.log(`Se visitó el sitio ${req.session.counter} veces`)
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
});

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        res.send("logout");
      } else {
        res.send({ status: "error", body: err });
      }
    });
  });

  sessionRouter.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'pepe' || password !== 'pepepass') {
      return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
   })
   
   sessionRouter.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
   })
   

export default sessionRouter;
