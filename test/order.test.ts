import request from "supertest";
import app from "../src/app";

describe("GET /order", () => {
  it("should return 200 OK", () => {
    return request(app).get("/order")
      .expect(200);
  });
});
