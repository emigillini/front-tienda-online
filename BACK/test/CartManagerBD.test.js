import { CartManagerBD } from "../src/DAO/managers/CartManagerBD.js";
import mongoose from "mongoose";
import chai from "chai";

const expect = chai.expect;

mongoose.connect(
  "mongodb+srv://emigillini:Emiliano29782978@emigillini.agjop4k.mongodb.net/ecommerce"
);

describe("Testing Cart Manager", () => {
  let cartManagerBD;

  before(() => {
    cartManagerBD = new CartManagerBD();
  });

  it("Debe obtener todos los carritos existentes", async function () {
    this.timeout(10000);
    const user1Email = "user1@example.com";
    const user2Email = "user2@example.com";
    await cartManagerBD.addCart(user1Email);
    await cartManagerBD.addCart(user2Email);

    const carts = await cartManagerBD.getCarts();
    expect(carts).to.be.an("array");
  });

  it("Debe obtener el último carrito por ID", async function () {
    this.timeout(10000);
    const user1Email = "user1@example.com";
    const user2Email = "user2@example.com";
    const cartId1 = await cartManagerBD.addCart(user1Email);
    const cartId2 = await cartManagerBD.addCart(user2Email);

    const lastCart = await cartManagerBD.getLastCartId();
    expect(lastCart).to.exist;
    expect(lastCart.id).to.equal(cartId2);
  });

  it("Debe agregar un carrito correctamente", async function () {
    this.timeout(10000);
    const userEmail = "user@example.com";

    const cartId = await cartManagerBD.addCart(userEmail);
    expect(cartId).to.exist;
    expect(cartId).to.be.a("number");
  });
});
