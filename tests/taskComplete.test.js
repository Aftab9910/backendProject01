// task-api/tests/taskComplete.test.js
const request = require("supertest");
const app = require("../src/app");

let taskId;

beforeAll(async () => {
  const res = await request(app)
    .post("/tasks")
    .send({ title: "Complete Test Task", priority: "medium" });
  taskId = res.body.id;
});

describe("PATCH /tasks/:id/complete", () => {
  it("should mark task as complete", async () => {
    const res = await request(app).patch(`/tasks/${taskId}/complete`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("completed");
    expect(res.body.completedAt).toBeTruthy();
  });

  it("should return 404 for invalid task id", async () => {
    const res = await request(app).patch("/tasks/invalidId/complete");
    expect(res.statusCode).toBe(404);
  });
});
