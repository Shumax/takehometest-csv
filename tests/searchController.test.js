import request from "supertest";
import app from "../src/server.js";

describe("Search Controller", () => {
  it("Should find a user", async () => {
    
    const response = await request(app).get("/api/users?q=John")

    expect(response.status).toBe(202);
    expect(response.body).toEqual([
      {
        Name: 'John',
        Age: '25',
        City: 'New York'
      }
    ]);
  });

  it("Should response empty when not found user", async () => {
    const response = await request(app).get("/api/users?q=Max")

    expect(response.status).toBe(202);
    expect(response.body).toEqual([]);
  });

  it("Should handle response error to empty query", async () => {
    const response = await request(app).get("/api/users?q=")

    expect(response.status).toBe(400);
    expect(response.body).toEqual('Error: Empty query!');
  });
});
