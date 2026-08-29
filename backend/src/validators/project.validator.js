const { z } = require("zod");

const projectSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.name.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Project name is required",
      });
    } else if (data.name.trim().length < 3) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Project name must be at least 3 characters",
      });
    } else if (data.name.trim().length > 150) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Project name must not exceed 150 characters",
      });
    }

    if (data.description && data.description.length > 1000) {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "Description must not exceed 1000 characters",
      });
    }
  });

const createProjectSchema = projectSchema;
const updateProjectSchema = projectSchema;


module.exports = { createProjectSchema, updateProjectSchema };