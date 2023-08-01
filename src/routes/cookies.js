import CustomRouter from "./router.js";
import { Cookiecontroller } from "../controllers/CookieController.js";


const CookieController1 = new Cookiecontroller()

export default class CookieRouter extends CustomRouter {
  init() {
    this.get("/setCookies", CookieController1.setCookies);
    
    this.get("/setSignedCookies", CookieController1.setSignedCookies);
  
    this.get("/getSignedCookies", CookieController1.getSignedCookies);
  
    this.get("/getCookies", CookieController1.getCookies);
  
    this.get("/deleteCookies/:name", CookieController1.deleteCookies
    );
  

  }}
