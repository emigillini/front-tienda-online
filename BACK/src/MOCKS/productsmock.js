import {faker} from "@faker-js/faker"

const generarProductoSimulado = () => {
    return {
      
        id: faker.database.mongodbObjectId(),
        code: faker.string.alphanumeric(),
      nombre: faker.commerce.productName(),
      descripcion: faker.commerce.productDescription(),
      stock: 10,
      price:faker.commerce.price({ min: 100 }) 

   
    };
  };
  
  
  export const generarProductosSimulados = (cantidad) => {
    const productos = [];
    for (let i = 0; i < cantidad; i++) {
      productos.push(generarProductoSimulado());
    }
    return productos;
  };
  
