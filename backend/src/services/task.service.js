const taskRepository = require("../repositories/task.repository");

const createTask = async (data) => {
  return taskRepository.createTask(data);
};

const getTasks = async (queryParams) => {
  return taskRepository.getTasks({
    projectId: Number(queryParams.projectId),
    page: Number(queryParams.page) || 1,
    limit: Number(queryParams.limit) || 10,
    status: queryParams.status || null,
    priority: queryParams.priority || null,
    search: queryParams.search || "",
  });
};

const getTask = async (taskId, userId) => {
  const task = await taskRepository.getTaskById(taskId, userId);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const updateTask = async (taskId, userId, data) => {
  const task = await taskRepository.updateTask({
    taskId,
    ownerId: userId,
    ...data,
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const updateTaskStatus = async (taskId, userId, status) => {
  const task = await taskRepository.updateTaskStatus({
    taskId,
    ownerId: userId,
    status,
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await taskRepository.deleteTask(taskId, userId);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};