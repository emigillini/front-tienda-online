import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename=fileURLToPath(import.meta.url)
export const __dirname= dirname(__filename)


export const createEmptyArray=(path, utf ) =>{
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "[]", utf);
      console.log(`El archivo ${path} no existía, se ha creado un array vacío.`);
    }
  }

