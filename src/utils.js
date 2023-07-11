import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createEmptyArray = (path, utf) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]", utf);
    console.log(`El archivo ${path} no existía, se ha creado un array vacío.`);
  }
};

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword =(result, password)=>{
  return bcrypt.compareSync(password, result.password)
}

const Private_key = "paraEntregaTrabajo"

export const generateToken=(user)=>{
  const token= jwt.sign({user}, Private_key,{expiresIn:"10m"})
  return token
}

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization ? req.headers.authorization: req.headers.Authorization   ;
  if(!authHeader) return res.status(401).send({ error: 'Not authenticated'})
  const token = authHeader.split(' ')[1];
  jwt.verify(token, Private_key, (error, credentials) => {
      if(error) return res.status(403).send({ error: 'Not authorized'})
      req.user = credentials.user;
      next()
  })
}
