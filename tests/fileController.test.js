import request from "supertest";
import app from "../src/server.js";

describe("File Controller", () => {
  it("Should handle file upload successfully", async () => {
    const csvData = Buffer.from(
      "Content-Type: text/csv\n" +
        "Name,Age,City\n" +
        "John,25,New York\n" +
        "Jane,30,San Francisco\n"
    );

    const response = await request(app)
      .post("/api/files")
      .set("Content-Type", "text/csv")
      .send(csvData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      msg: "Success: uploaded!",
      filename: expect.any(String),
    });
  });

  it("Should handle response error to file empty", async () => {
    const csvData = "";

    const response = await request(app)
      .post("/api/files")
      .set("Content-Type", "multipart/form-data")
      .send(csvData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Error: Empty request!");
  });

  it("Should handle response error to file type", async () => {
    const csvData = 'Name,Age,City\nJohn,25,New York\nJane,30,San Francisco\n';

    const response = await request(app)
      .post("/api/files")
      .set("Content-Type", "multipart/form-data")
      .send(csvData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Error: Type file!");
  });
});
