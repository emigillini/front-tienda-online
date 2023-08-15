import CustomRouter from "./router.js";
import { authMiddleware, upload, userRole } from "../DAO/midleware/midleware.js";
import { viewsController } from "../controllers/viewsController.js";

const viewsController1 = new viewsController()

export default class ViewRouter extends CustomRouter{
  init(){

    this.get("/", viewsController1.login)
    this.get("/index", authMiddleware, viewsController1.getProducts)
    this.get("/realtimeproducts",authMiddleware, viewsController1.realTimeProducts)
    this.get("/chat",userRole, viewsController1.chat)
    this.get("/error", viewsController1.error)

    this.post("/src/public/uploads", upload.single("Archivo"),viewsController1.uploadFile)
    
    
  }}


