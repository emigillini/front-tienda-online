import { Router } from "express";
import { generateToken } from "../../utils.js";
import passport from "passport";

export const jwtRouter = Router();

const users = [];

jwtRouter.post('/register', (req, res) => {
    const {name, email, password } = req.body;
    const user = users.find(user => user.email === email);
    if(user) return res.status(400).send({ status: 'error', error: 'User already exists'});
    const newUser = {
        name,
        email,
        password
    };
    users.push(newUser)
    console.log(users)
    res.send({ status: 'success', msg: 'User registered succesfully'})
})

jwtRouter.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if(!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials'});
    const access_token = generateToken(user);
    res.cookie('auth', access_token,{ maxAge:60*60*1000, httpOnly:true}).send({message:"logueado" })
})

jwtRouter.get('/datos', passport.authenticate('jwt',{ session:false})  ,(req, res) => {
    res.send({status: 'success', payload: req.user})
})

jwtRouter.get('/current', passport.authenticate('jwt',{ session:false}) ,(req, res) => {
    res.send("algo")
})

{ }