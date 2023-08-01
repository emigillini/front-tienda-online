import { generateToken } from "../utils.js";
import { UserManagerBD } from "../DAO/UserManagerBD.js";
import { createHash } from "../utils.js";

const userman1 = new UserManagerBD();

export class JwtController {
  async register(req, res) {
    const { name, email, password } = req.body;
    const newUser = {
      name,
      email,
      password,
    };
    newUser.password = createHash(password);
    try {
      let userFound = await userman1.getByEmail(newUser.email);
      if (userFound) {
        return res.status(400).send({ status: 'error', error: 'User already exists' });
      }
      let result = await userman1.createUser(newUser);
      console.log(result);
      res.send({ status: 'success', msg: 'User registered successfully' });
    } catch (error) {
      console.log(error);
      res.send({ status: 'error', msg: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      let userFound = await userman1.getByEmail(email);
      if (!userFound) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
      }

      const access_token = generateToken(userFound);
      res.cookie('auth', access_token, { maxAge: 60 * 60 * 1000, httpOnly: true });
      res.send({ message: "Logged in successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'error', error: error.message });
    }
  }

  async datos(req, res) {
    res.send({ status: 'success', payload: req.user });
  }

  async current(req, res) {
    res.send("Something");
  }
}
