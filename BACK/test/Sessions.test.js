import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

describe("Test Sessions", () => {
  let cookie;

  it("should register a user via POST /session/register", async () => {
    const newUser = {
      first_name: "pepea",
      last_name: "poposa",
      password: "123456",
      email: "testa@example.com",
      age: 25,
    };

    const response = await requester.post("session/register").send(newUser);

    console.log(response.status);

    expect(response.body).to.be.an("object");
    expect(response.status).to.equal(200);
  });
  it("debe loguear usuario y devolver cookie", async () => {
    const User = {
      password: "123456",
      email: "ch@mail.com",
    };

    const response = await requester.post("session/login").send(User);
    const cookieRes = response.header["set-cookie"][0];
    expect(cookieRes).to.be.ok;
    cookie = {
      name: cookieRes.split("=")[0],
      value: cookieRes.split("=")[1],
    };
    expect(cookie.value).to.be.ok;
    expect(cookie.name).to.be.ok;
  });
  it("debe enviar cookie que contiene usuario", async () => {
    const response = await requester
      .get("session/current")
      .set("Cookie", [`${cookie.name} =${cookie.value}`]);
    expect(response).to.be.ok;
  });
});
