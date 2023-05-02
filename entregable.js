const fs =require('fs')
const path="productos.json";
const utf ="utf-8"

 class ProductManager {
    static id = 0;
      
    constructor() {
      this.products = [];
      this.path=path
    }

  
      addProduct(title, description, price, thumbnail, code, stock) {
      ProductManager.id++;
      const productExists = this.products.some((p) => p.code === code);
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
      this.products.push(product);
     
      fs.writeFileSync(path, JSON.stringify(this.products));
    console.log(`Se agregó el producto "${title}" al archivo ${path}.`);
  
    }

  
     getProducts() {

      let mostarProd = fs.readFileSync(path, utf);
      let productos =  JSON.parse(mostarProd)
      console.log(productos)
    
    }


    getProductById(id) {
      const data =  fs.readFileSync(path, utf)
      const product= JSON.parse(data)
      const products = product.find((p) => p.id === id);
      if (products) {
         console.log("Este es su producto:", products);
      } else {
        console.error(`Error: Producto con id ${id} no encontrado.`);
        
      }
      
    }

     deleteProd(id){
      const data =  fs.readFileSync(path, utf)
      const product=  JSON.parse(data)
      let indexOf =  product.findIndex ((p) => p.id === id)
      product.splice(indexOf, 1)
       fs.writeFileSync(path, JSON.stringify(product));
      console.log(`Se eliminó el producto con id ${id}.`)


    }


    async updateProduct(id,title,description,price,thumbnail,code,stock){
      const data = fs.readFileSync(path, utf)
      const product= JSON.parse(data)
      let indexOf = product.findIndex ((p) => p.id === id)
      const prodUpd ={
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: id
      }

      product[indexOf] = prodUpd;
      fs.writeFileSync(path, JSON.stringify(product));
      console.log(`Se actualizo ${prodUpd.title}`);
  
    }
  }
  
  
const productManager1 = new ProductManager();
  
  productManager1.addProduct("lechuga", "muy fresca", 100, "www.imagen", 1, 1000);
  productManager1.addProduct("tomate", "muy fresca", 100, "www.imagen", 2, 1000);
  productManager1.addProduct("pepino", "muy fresca", 1000, "www.imagen", 3, 1000);


  productManager1.updateProduct(3,"papa", "muy rica", 1000, "www.imagen", 3, 10000 )

  productManager1.getProductById(3)
  productManager1.deleteProd(1)
  productManager1.deleteProd(2)




  










 
  
 



