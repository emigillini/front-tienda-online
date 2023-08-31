import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import config from "./config/config.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"
import { logger } from "./logger.js";


const idValidator = /^[0-9]+$/;
const __filename = fileURLToPath(import.meta.url);



export default class MongoSingleton{
  static #instance
  constructor(){
    mongoose.connect(config.mongoURL,{})
  }
  static getInstance(){
    if (this.#instance){
      logger.info("already connected")
      return this.#instance
    }
  this.#instance = new MongoSingleton()
  logger.info("connected")
  return this.#instance
  }
}


export const __dirname = dirname(__filename);

export const createEmptyArray = (path, utf) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]", utf);
    logger.warning(`El archivo ${path} no existía, se ha creado un array vacío.`);
  }
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (result, password) => {
  return bcrypt.compareSync(password, result.password);
};

const Private_key = "paraEntregaTrabajo";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, Private_key, { expiresIn: "10m" });
  return token;
};

export const auth = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).send({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, Private_key);
  } catch {
    return res.status(403).send({ error: "Not valido" });
  }
  next();
};

export const generateCustomResponses = (req, res, next) => {
  res.sendSuccess = (payload) => res.send({ status: "success", payload });
  res.sendServerError = (error) =>
    res.status(500).send({ status: "error", error });
  res.sendUserError = (error) =>
    res.status(400).send({ status: "error", error });
  next();
};

export const validateParam = (paramName, req, res, next) => {
  if (!idValidator.test(req.params[paramName])) {
    return res
      .status(400)
      .send(`El ${paramName} debe ser un número entero positivo.`);
  }
  req.params[paramName] = parseInt(req.params[paramName], 10);
  next();
};


