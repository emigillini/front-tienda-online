import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

describe("test Cart", () => {
  it("endpoint GET /cart obtiene todos los carritos existentes", async () => {
    const response = await requester.get("cart");

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("status", "success");

    expect(response.body).to.have.property("payload").that.is.an("array");

    expect(response.body.payload).to.have.lengthOf.at.least(1);
  });
  it("endpoint GET /cart/:id obtiene un carrito por ID", async () => {
    const existingCartId = 1;

    const response = await requester.get(`cart/${existingCartId}`);

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("status", "success");

    expect(response.body).to.have.property("payload").that.is.an("object");

    expect(response.body.payload).to.have.property("id", existingCartId);
  });
  it("debería obtener el último carrito por ID", async () => {
    const response = await requester.get("cart/lastCart");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("status", "success");

    expect(response.body).to.have.property("payload");

    expect(response.body.payload).to.be.an("object");

    expect(response.body.payload).to.have.property("id");
  });
});
