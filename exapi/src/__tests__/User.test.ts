import request from 'supertest'
import { getConnection } from 'typeorm';
import { app } from '../app'
import createConnection  from "../database"



describe("Users", () =>{
  beforeAll(async () =>{
    const connection = await createConnection()
    await connection.runMigrations()
  });

  afterAll(async () =>{
    const connection = await getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

    it("Should be able to create a User", async () =>{
      const response = await request(app).post('/users').send({
        name: "example",
        email:"example@example.com"
    });

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    });

    it("Should be able to create if email already exists", async () =>{
      const response = await request(app).post('/users').send({
        name: "example",
        email:"example@example.com"
    });

    expect(response.status).toBe(400) //Why not?
    });
});