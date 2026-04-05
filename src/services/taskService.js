const { v4: uuidv4 } = require("uuid");

let tasks = [];

const getAll = () => [...tasks];

const findById = (id) => tasks.find((t) => t.id === id);

const getByStatus = (status) => tasks.filter((t) => t.status === status);

const getPaginated = (page = 0, limit = 10) => {
  const offset = page * limit;
  return tasks.slice(offset, offset + limit);
};

const getStats = () => {
  const now = new Date();

  const stats = {
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  };

  tasks.forEach((t) => {
    if (t.status === "pending") stats.pending++;

    if (t.status === "in-progress") stats.inProgress++;

    if (t.status === "completed") stats.completed++;

    if (t.dueDate && t.status !== "completed" && new Date(t.dueDate) < now) {
      stats.overdue++;
    }
  });

  return stats;
};

const create = ({
  title,
  description = "",
  status = "pending",
  priority = "medium",
  dueDate = null,
}) => {
  const task = {
    id: uuidv4(),
    title,
    description,
    status,
    priority,
    dueDate,
    assignedTo: null,
    completedAt: null,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);

  return task;
};

const update = (id, fields) => {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...fields,
  };

  return tasks[index];
};

const assignTask = (id, userId) => {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  tasks[index].assignedTo = userId;

  return tasks[index];
};

const remove = (id) => {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return false;

  tasks.splice(index, 1);

  return true;
};

const completeTask = (id) => {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    status: "completed",
    completedAt: new Date().toISOString(),
  };

  return tasks[index];
};

const _reset = () => {
  tasks = [];
};

module.exports = {
  getAll,
  findById,
  getByStatus,
  getPaginated,
  getStats,
  create,
  update,
  assignTask,
  remove,
  completeTask,
  _reset,
};
