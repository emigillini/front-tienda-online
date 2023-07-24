import { Router } from "express";
import { generateToken } from "../../utils.js";
import passport from "passport";
import { UserManagerBD } from "../UserManagerBD.js";
import { createHash } from "../../utils.js";

export const jwtRouter = Router();
const userman1 = new UserManagerBD()



jwtRouter.post('/register', async (req, res) => {
  const {name, email, password } = req.body;
  const newUser = {
    name,
    email,
    password
  };
  newUser.password = createHash(password);
  try {
    let userFound = await userman1.getByEmail( newUser.email);
    if (userFound) {
        return res.status(400).send({ status: 'error', error: 'ya existe usuario' });
    }
    let result =  await userman1.createUser(newUser);
    console.log(result)
    res.send({ status: 'success', msg: 'User registered succesfully'})
  } catch (error) {
    console.log(error);
    res.send({ status: 'error', msg: error.message });
  }
});

jwtRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        let userFound = await userman1.getByEmail(email);
        if (!userFound) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
    }

    const access_token = generateToken(userFound);
      res.cookie('auth', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true });
      res.send({ message: "Logueado" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'error', error: error.message });
    }
  });
jwtRouter.get('/datos', passport.authenticate('jwt',{ session:false})  ,(req, res) => {
    res.send({status: 'success', payload: req.user})
})

jwtRouter.get('/current', passport.authenticate('jwt',{ session:false}) ,(req, res) => {
    res.send("algo")
})

