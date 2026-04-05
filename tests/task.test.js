// task-api/tests/task.test.js
const request = require("supertest");
const app = require("../src/app");

let taskId;

describe("Tasks API", () => {
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", priority: "high" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Task");
    taskId = res.body.id; // store for later tests
  });

  it("should list all tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should delete a task", async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(204);
  });

  it("should return 404 for deleted task", async () => {
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(404);
  });
});
