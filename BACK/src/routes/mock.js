import CustomRouter from "./router.js";
import { generarProductosSimulados } from "../MOCKS/productsmock.js";
import {faker} from "@faker-js/faker"



export default class MockRouter extends CustomRouter {
  init() {
    this.get("/",async(req, res)=>{
        try {
            const prodsim = await generarProductosSimulados(1005)
            res.send(prodsim)
        } catch (error) {
            console.error(error);
            res.status(500).send("Error en el servidor"); 
        }

    });
    this.get("/user",(req, res)=>{
      try {
        let first_name = faker.person.firstName();
        let last_name= faker.person.lastName();
      let email= faker.internet.email();
      let password= faker.internet.password();
      let age =20;
      let role = "usuario"
      res.send({first_name,last_name,email,password,age,role})
      } catch (error) {
        console.error(error);
            res.status(500).send("Error en el servidor"); 
        }
      }
   

  
    
  
    )}}