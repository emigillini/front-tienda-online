import { Router } from "express";
import cookieParser from "cookie-parser";

const cookieRouter= Router()
cookieRouter.use(cookieParser());

cookieRouter.get("/setCookies", (req, res) => {
    res.cookie("nombressss", "lo que guarda").send("Cookiessss");
  });
  
  cookieRouter.get("/getCookies", (req, res) => {
    res.send(req.cookies);
  });

  cookieRouter.get("/deleteCookies/:name", (req, res) => {
    const { name } = req.params;
    res.clearCookie(name).send("Cookie borrada");
  });

  export default cookieRouter