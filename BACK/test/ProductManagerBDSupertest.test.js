import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

describe("test Cart", () => {
  it("endpoint GET /products obtiene todos los productos existentes", async () => {
    const response = await requester.get("products");

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("status", "success");
  });
  it("debería obtener un producto por ID válido", async () => {
    const existingProductId = 2;

    const response = await requester.get(`products/${existingProductId}`);

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("status", "success");

    expect(response.body).to.have.property("payload").that.is.an("object");

    expect(response.body.payload).to.have.property("id", existingProductId);
  });
  it("debería agregar un nuevo producto", async () => {
    const newProductData = {
      title: "Nuevo Producto",
      description: "Descripción del nuevo producto",
      code: "NP001",
      price: 99.99,
      stock: 10,
      category: "Categoría del nuevo producto",
      thumbnail: "URL del thumbnail del nuevo producto",
    };

    const response = await requester.post("products").send(newProductData);

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("status", "success");

    expect(response.body).to.have.property("payload").that.is.an("object");
  });
});
