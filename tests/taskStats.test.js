// task-api/tests/taskStats.test.js
const request = require("supertest");
const app = require("../src/app");

beforeAll(async () => {
  await request(app).post("/tasks").send({ title: "Task 1", priority: "low" });
  await request(app)
    .post("/tasks")
    .send({ title: "Task 2", priority: "medium" });
});

describe("GET /tasks/stats", () => {
  it("should return counts by status", async () => {
    const res = await request(app).get("/tasks/stats");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("pending");
    expect(res.body).toHaveProperty("inProgress");
    expect(res.body).toHaveProperty("completed");
    expect(res.body).toHaveProperty("overdue");
  });
});
