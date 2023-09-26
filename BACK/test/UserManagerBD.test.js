import { UserManagerBD } from "../src/DAO/managers/UserManagerBD.js";
import assert from "assert";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://emigillini:Emiliano29782978@emigillini.agjop4k.mongodb.net/ecommerce"
);

describe("Testing user Manager", () => {
  let userManagerBD;

  before(() => {
    userManagerBD = new UserManagerBD();
  });

  beforeEach(function () {
    mongoose.connection.collections.users.drop();
  });
  it("Debe encontrar un usuario por su correo electrónico", async function () {
    this.timeout(10000);
    const user = {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@mail.com",
      password: "password123",
    };

    const result = await userManagerBD.createUser(user);
    const foundUser = await userManagerBD.getByEmail(user.email);
    assert.ok(foundUser._id);
    assert.strictEqual(user.email, foundUser.email);
  });

  it("El Manager debe devolver usuarios en array", async function () {
    this.timeout(10000);

    const result = await userManagerBD.getAll();
    assert.strictEqual(Array.isArray(result), true);
  });
  it("El dao debe agregar un usuario a la db", async function () {
    this.timeout(10000);
    let User = {
      first_name: "Coder",
      last_name: "House",
      email: "ch@mail.com",
      password: "123456",
    };

    const result = await userManagerBD.createUser(User);
    assert.ok(result._id);
  });
});
