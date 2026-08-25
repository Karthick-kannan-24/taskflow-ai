const { z } = require("zod");
const { login } = require("../services/auth.service");

const registerSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.email(),
  password: z.string().min(6).max(50),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

module.exports = {
  registerSchema,
  loginSchema,
};