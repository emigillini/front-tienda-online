import CustomRouter from "./router.js";
import { authMiddleware, upload } from "../midleware/midleware.js";
import { viewsController } from "../viewsController.js";

const viewsController1 = new viewsController()

export default class ViewRouter extends CustomRouter{
  init(){

    this.get("/", viewsController1.login)
    this.get("/index", authMiddleware, viewsController1.getProducts)
    this.get("/realtimeproducts",authMiddleware, viewsController1.realTimeProducts)
    this.get("/chat", viewsController1.chat)
    this.post("/src/public/uploads", upload.single("Archivo"),viewsController1.uploadFile)
    
    
  }}


