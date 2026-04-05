// task-api/tests/taskUpdate.test.js
const request = require("supertest");
const app = require("../src/app");

let taskId;

beforeAll(async () => {
  const res = await request(app)
    .post("/tasks")
    .send({ title: "Update Test", priority: "low" });
  taskId = res.body.id;
});

describe("PUT /tasks/:id", () => {
  it("should update a task fully", async () => {
    const res = await request(app).put(`/tasks/${taskId}`).send({
      title: "Updated Title",
      description: "Updated description",
      priority: "high",
      status: "in-progress",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
    expect(res.body.status).toBe("in-progress");
  });

  it("should return 404 for invalid task id", async () => {
    const res = await request(app)
      .put("/tasks/invalidId")
      .send({ title: "New Title", priority: "low", status: "pending" });
    expect(res.statusCode).toBe(404);
  });
});
