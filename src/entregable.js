import fs from "fs";
const path = "productos.json";
const utf = "utf-8";

class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    ProductManager.id++;
    try {
      const data = await fs.promises.readFile(path, utf);
      const products = JSON.parse(data);
      const productExists = products.some((p) => p.code === code);
      if (productExists) {
        console.error(`Error: El código ${code} ya existe.`);
        return;
      }
      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: ProductManager.id,
      };
      products.push(product);
      await fs.promises.writeFile(path, JSON.stringify(products));
      console.log(`Se agregó el producto "${title}" al archivo ${path}.`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async getProducts() {
    try {
      let mostarProd = await fs.promises.readFile(path, utf);
      let productos = JSON.parse(mostarProd);
      console.log(productos);
      return productos;
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(path, utf);
      const product = JSON.parse(data);
      const products = product.find((p) => p.id === id);
      if (products) {
        console.log("Este es su producto:", products);
        return products;
      } else {
        console.error(`Error: Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async deleteProd(id) {
    try {
      const data = await fs.promises.readFile(path, utf);
      const product = JSON.parse(data);
      let indexOf = product.findIndex((p) => p.id === id);
      product.splice(indexOf, 1);
      await fs.promises.writeFile(path, JSON.stringify(product));
      console.log(`Se eliminó el producto con id ${id}.`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      const data = await fs.promises.readFile(path, utf);
      const products = JSON.parse(data);
      let product = products.find((p) => p.id === id);
      if (product) {
        const prodUpd = {
          title: title || product.title,
          description: description || product.description,
          price: price || product.price,
          thumbnail: thumbnail || product.thumbnail,
          code: code || product.code,
          stock: stock || product.stock,
          id: id,
        };
        let indexOf = products.findIndex((p) => p.id === id);
        products[indexOf] = prodUpd;
        await fs.promises.writeFile(path, JSON.stringify(products));
        console.log(`Se actualizó ${prodUpd.title}`);
      } else {
        console.error(`Error: Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

const productManager1 = new ProductManager();

await productManager1.addProduct(
  "lechuga",
  "muy fresca",
  100,
  "www.imagen",
  1,
  1000
);
await productManager1.addProduct(
  "pepino",
  "muy fresca",
  1000,
  "www.imagen",
  3,
  1000
);
await productManager1.addProduct(
  "banana",
  "muy fresca",
  500,
  "www.imagen",
  4,
  1000
);
await productManager1.addProduct(
  "manzana",
  "muy fresca",
  500,
  "www.imagen",
  5,
  1000
);
await productManager1.addProduct(
  "tomate",
  "muy fresca",
  100,
  "www.imagen",
  2,
  1000
);
await productManager1.addProduct(
  "apio",
  "muy fresca",
  500,
  "www.imagen",
  6,
  1000
);
await productManager1.addProduct(
  "pera",
  "muy fresca",
  500,
  "www.imagen",
  7,
  1000
);
await productManager1.addProduct(
  "cebolla",
  "muy fresca",
  500,
  "www.imagen",
  8,
  1000
);
await productManager1.addProduct(
  "remolacha",
  "muy fresca",
  500,
  "www.imagen",
  9,
  1000
);
await productManager1.addProduct(
  "naranja",
  "muy fresca",
  500,
  "www.imagen",
  10,
  1000
);
await productManager1.addProduct(
  "mandarina",
  "muy fresca",
  500,
  "www.imagen",
  11,
  1000
);
await productManager1.addProduct(
  "anana",
  "muy fresca",
  500,
  "www.imagen",
  12,
  1000
);
await productManager1.updateProduct(
  3,
  "papa",
  "muy rica",
  1000,
  "www.imagen",
  3,
  10000
);
await productManager1.updateProduct(
  3,
  "taca",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
);
await productManager1.getProductById(3);
await productManager1.deleteProd(1);
await productManager1.deleteProd(2);
