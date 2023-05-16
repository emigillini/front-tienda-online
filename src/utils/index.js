import fs from "fs";

export const createEmptyArray=(path, utf ) =>{
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "[]", utf);
      console.log(`El archivo ${path} no existía, se ha creado un array vacío.`);
    }
  }