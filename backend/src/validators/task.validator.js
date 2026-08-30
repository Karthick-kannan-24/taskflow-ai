const { z } = require("zod");

const taskValidation = (data, ctx) => {
  // Title
  if (!data.title.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["title"],
      message: "Title is required",
    });
  } else if (data.title.trim().length < 3) {
    ctx.addIssue({
      code: "custom",
      path: ["title"],
      message: "Title must be at least 3 characters",
    });
  } else if (data.title.trim().length > 200) {
    ctx.addIssue({
      code: "custom",
      path: ["title"],
      message: "Title must not exceed 200 characters",
    });
  }

  // Description
  if (data.description && data.description.length > 1000) {
    ctx.addIssue({
      code: "custom",
      path: ["description"],
      message: "Description must not exceed 1000 characters",
    });
  }

  // Due date
  if (data.dueDate) {
    const dueDate = new Date(data.dueDate);

    if (isNaN(dueDate.getTime())) {
      ctx.addIssue({
        code: "custom",
        path: ["dueDate"],
        message: "Invalid due date",
      });
    }
  }
};

const createTaskSchema = z
  .object({
    projectId: z.number(),
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
    dueDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Project ID
    if (!data.projectId) {
      ctx.addIssue({
        code: "custom",
        path: ["projectId"],
        message: "Project ID is required",
      });
    } else if (data.projectId <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["projectId"],
        message: "Project ID must be greater than 0",
      });
    }

    taskValidation(data, ctx);
  });

const updateTaskSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    dueDate: z.string().optional(),
  })
  .superRefine(taskValidation);

const updateTaskStatusSchema = z
  .object({
    status: z.enum(["todo", "in_progress", "done"]),
  })
  .superRefine((data, ctx) => {
    if (!data.status) {
      ctx.addIssue({
        code: "custom",
        path: ["status"],
        message: "Status is required",
      });
    }
  });

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
};