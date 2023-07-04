import { Router } from "express";
import cookieParser from "cookie-parser";

const cookieRouter= Router()
cookieRouter.use(cookieParser());


cookieRouter.get("/setCookies", (req, res) => {
    res.cookie("nombres", "Emiliano").send("Cookiessss");
  });
  
  cookieRouter.get("/setSignedCookies", (req, res) => {
    res.cookie("secreto", "lo que guarda",{signed:true}).send("secreta");
  });

  cookieRouter.get("/getSignedCookies", (req, res) => {
    res.send(req.signedCookies);
    console.log(req.signedCookies)
  });


  cookieRouter.get("/getCookies", (req, res) => {
    res.send(req.cookies);
    console.log(req.cookies)
  });

  cookieRouter.get("/deleteCookies/:name", (req, res) => {
    const { name } = req.params;
    res.clearCookie(name).send("Cookie borrada");
  });

  export default cookieRouter