const { z } = require("zod");

const createProjectSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().max(1000).optional(),
});

const updateProjectSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().max(1000).optional(),
});

module.exports = { createProjectSchema, updateProjectSchema };