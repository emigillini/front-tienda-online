import { ProductManagerBD } from "../src/DAO/managers/ProductManagerBD.js";
import mongoose from "mongoose";
import chai from "chai";

const expect = chai.expect;

mongoose.connect(
  "mongodb+srv://emigillini:Emiliano29782978@emigillini.agjop4k.mongodb.net/ecommerce"
);

describe("Testing Product Manager (MongoDB)", () => {
  let productManagerBD;

  before(() => {
    productManagerBD = new ProductManagerBD();
  });

  it("Debe obtener un producto por ID correctamente", async function () {
    this.timeout(10000);

    const addedProduct = await productManagerBD.addProduct(
      "Producto de Prueba",
      "Descripción de Prueba",
      "PR009",
      49.99,
      true,
      7,
      "Electrónica",
      "imagen9.jpg"
    );

    const retrievedProduct = await productManagerBD.getProductById(
      addedProduct.id
    );

    expect(retrievedProduct.id).to.equal(addedProduct.id);
    expect(retrievedProduct.title).to.equal(addedProduct.title);
    expect(retrievedProduct.description).to.equal(addedProduct.description);
    expect(retrievedProduct.code).to.equal(addedProduct.code);
    expect(retrievedProduct.price).to.equal(addedProduct.price);
    expect(retrievedProduct.status).to.equal(addedProduct.status);
    expect(retrievedProduct.stock).to.equal(addedProduct.stock);
    expect(retrievedProduct.category).to.equal(addedProduct.category);
  });

  it("Debe agregar un producto a la base de datos", async function () {
    this.timeout(10000);

    const productData = {
      title: "Producto de Prueba",
      description: "Descripción de Prueba",
      code: "PR009",
      price: 49.99,
      status: true,
      stock: 7,
      category: "Electrónica",
      thumbnail: "imagen9.jpg",
    };

    const addedProduct = await productManagerBD.addProduct(
      productData.title,
      productData.description,
      productData.code,
      productData.price,
      productData.status,
      productData.stock,
      productData.category,
      productData.thumbnail
    );

    expect(addedProduct).to.exist;
    expect(addedProduct.title).to.equal(productData.title);
    expect(addedProduct.description).to.equal(productData.description);
    expect(addedProduct.code).to.equal(productData.code);
    expect(addedProduct.price).to.equal(productData.price);
    expect(addedProduct.status).to.equal(productData.status);
    expect(addedProduct.stock).to.equal(productData.stock);
    expect(addedProduct.category).to.equal(productData.category);
  });

  it("Debe actualizar un producto de la base de datos", async function () {
    this.timeout(10000);

    const initialProductData = {
      title: "Producto de Prueba",
      description: "Descripción de Prueba",
      code: "PR010",
      price: 59.99,
      status: true,
      stock: 5,
      category: "Electrónica",
      thumbnail: "imagen10.jpg",
    };

    const addedProduct = await productManagerBD.addProduct(
      initialProductData.title,
      initialProductData.description,
      initialProductData.code,
      initialProductData.price,
      initialProductData.status,
      initialProductData.stock,
      initialProductData.category,
      initialProductData.thumbnail
    );

    let updatedProductId = addedProduct.id;

    const updatedProductData = {
      title: "Producto Actualizado",
      description: "Descripción Actualizada",
      price: 69.99,
      stock: 10,
      category: "Ropa",
      thumbnail: "imagen11.jpg",
    };

    await productManagerBD.updateProduct(
      updatedProductId,
      updatedProductData.title,
      updatedProductData.description,
      initialProductData.code,
      updatedProductData.price,
      updatedProductData.stock,
      updatedProductData.category,
      updatedProductData.thumbnail
    );

    const updatedProduct = await productManagerBD.getProductById(
      updatedProductId
    );

    expect(updatedProduct.title).to.equal(updatedProductData.title);
    expect(updatedProduct.description).to.equal(updatedProductData.description);
    expect(updatedProduct.price).to.equal(updatedProductData.price);
    expect(updatedProduct.stock).to.equal(updatedProductData.stock);
    expect(updatedProduct.category).to.equal(updatedProductData.category);
  });
});
