// task-api/tests/taskAssign.test.js
const request = require("supertest");
const app = require("../src/app");

let taskId;

beforeAll(async () => {
  const res = await request(app)
    .post("/tasks")
    .send({ title: "Assign Test Task", priority: "high" });
  taskId = res.body.id;
});

describe("PATCH /tasks/:id/assign", () => {
  it("should assign a user to a task", async () => {
    const res = await request(app)
      .patch(`/tasks/${taskId}/assign`)
      .send({ userId: "user123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.assignedTo).toBe("user123");
  });

  it("should return 400 if userId missing", async () => {
    const res = await request(app).patch(`/tasks/${taskId}/assign`).send({});
    expect(res.statusCode).toBe(400);
  });

  it("should return 404 for invalid task id", async () => {
    const res = await request(app)
      .patch("/tasks/invalidId/assign")
      .send({ userId: "user123" });
    expect(res.statusCode).toBe(404);
  });
});
