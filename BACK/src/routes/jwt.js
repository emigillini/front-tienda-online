import CustomRouter from "./router.js";
import passport from "passport";
import { JwtController } from "../controllers/JwtController.js";

const jwtController1 = new JwtController();

export default class JwtRouter extends CustomRouter{
  init(){
  this.post('/register', jwtController1.register);
  this.post('/login', jwtController1.login);
  this.get('/datos', passport.authenticate('jwt', { session: false }), jwtController1.datos);
  this.get('/current', passport.authenticate('jwt', { session: false }), jwtController1.current);
  }}
  