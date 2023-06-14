import request from "supertest";
import app from "../src/server.js";

describe("Server Test", () => {

  it("Should find a user", async () => {
    
    const response = await request(app).get("/api")

    expect(response.status).toBe(404);
    expect(response.body).toEqual('Error: Not found!');
  });

});