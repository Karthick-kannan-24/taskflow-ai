const { z } = require("zod");

const createTaskSchema = z.object({
  projectId: z.number(),
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
});

const updateTaskStatusSchema = z.object({
  status: z.enum(["todo", "in_progress", "done"]),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
};