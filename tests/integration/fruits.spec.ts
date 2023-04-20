import supertest from "supertest";
import app from "../../src/index";
import { cleanDb, createFruit } from "../factories/fruit-factory";
import fruits from "data/fruits";

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe("GET /fruits", () => {
  it("should respond with status 200 with fruits list", async () => {
    const fruit = await createFruit();
    const response = await server.get("/fruits");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: fruit[0].id,
        name: fruit[0].name,
        price: fruit[0].price,
      },
    ]);
  });
});

describe("GET /fruits/:id", () => {
  it("should respond with status 404 if id does not exist", async () => {
    const response = await server.get(`/fruits/1`);

    expect(response.status).toBe(404);
  });

  it("should respond with status 200 with fruit", async () => {
    const fruit = await createFruit();
    const response = await server.get(`/fruits/${fruit[0].id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: fruit[0].id,
      name: fruit[0].name,
      price: fruit[0].price,
    });
  });
});

describe("POST /fruits", () => {
  it("should respond with status 422 if body is invalid", async () => {
    const response = await server.post("/fruits");

    expect(response.status).toBe(422);
  });

  it("should respond with status 201", async () => {
    const body = { name: "tomate", price: 10 };
    const response = await server.post("/fruits").send(body);

    expect(response.status).toBe(201);
  });

  it("should respond with status 409 if fruit already exist", async () => {
    const body = { name: "tomate", price: 10 };
    await server.post("/fruits").send(body);
    const response = await server.post("/fruits").send(body);

    expect(response.status).toBe(409);
  });
});
