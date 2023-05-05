
import fs from 'fs'
const path = "productos.json";
const utf = "utf-8";

class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = path;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    ProductManager.id++;
    const data = fs.readFileSync(path, utf);
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
    fs.writeFileSync(path, JSON.stringify(products));
    console.log(`Se agregó el producto "${title}" al archivo ${path}.`);
  }

  getProducts() {
    let mostarProd = fs.readFileSync(path, utf);
    let productos = JSON.parse(mostarProd);
    console.log(productos);
    return productos;
  }

  getProductById(id) {
    const data = fs.readFileSync(path, utf);
    const product = JSON.parse(data);
    const products = product.find((p) => p.id === id);
    if (products) {
      console.log("Este es su producto:", products);
      return products;
    } else {
      console.error(`Error: Producto con id ${id} no encontrado.`);
    }
  }

  deleteProd(id) {
    const data = fs.readFileSync(path, utf);
    const product = JSON.parse(data);
    let indexOf = product.findIndex((p) => p.id === id);
    product.splice(indexOf, 1);
    fs.writeFileSync(path, JSON.stringify(product));
    console.log(`Se eliminó el producto con id ${id}.`);
  }

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    const data = fs.readFileSync(path, utf);
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
      fs.writeFileSync(path, JSON.stringify(products));
      console.log(`Se actualizó ${prodUpd.title}`);
    } else {
      console.error(`Error: Producto con id ${id} no encontrado.`);
    }
  }
}

const productManager1 = new ProductManager();

productManager1.addProduct("lechuga", "muy fresca", 100, "www.imagen", 1, 1000);
productManager1.addProduct("tomate", "muy fresca", 100, "www.imagen", 2, 1000);
productManager1.addProduct("pepino", "muy fresca", 1000, "www.imagen", 3, 1000);
productManager1.addProduct("banana", "muy fresca", 500, "www.imagen", 4, 1000);
productManager1.addProduct("manzana", "muy fresca", 500, "www.imagen", 5, 1000);
productManager1.addProduct("apio", "muy fresca", 500, "www.imagen", 6, 1000);
productManager1.addProduct("pera", "muy fresca", 500, "www.imagen", 7, 1000);
productManager1.addProduct("cebolla", "muy fresca", 500, "www.imagen", 8, 1000);
productManager1.addProduct("remolacha", "muy fresca", 500, "www.imagen", 9, 1000);
productManager1.addProduct("naranja", "muy fresca", 500, "www.imagen", 10, 1000);
productManager1.addProduct("mandarina", "muy fresca", 500, "www.imagen", 11, 1000);
productManager1.addProduct("anana", "muy fresca", 500, "www.imagen", 12, 1000);
productManager1.updateProduct(
  3,
  "papa",
  "muy rica",
  1000,
  "www.imagen",
  3,
  10000
);
productManager1.updateProduct(
  3,
  "taca",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
);
productManager1.getProductById(3);
productManager1.deleteProd(1);
productManager1.deleteProd(2);
