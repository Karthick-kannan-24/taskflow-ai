const { z } = require("zod");
const { login } = require("../services/auth.service");

const registerSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
}).superRefine((data, ctx) => {
  // Name validation
  if (!data.name.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["name"],
      message: "Name is required",
    });
  } else if (data.name.trim().length < 3) {
    ctx.addIssue({
      code: "custom",
      path: ["name"],
      message: "Name must be at least 3 characters",
    });
  } else if (data.name.trim().length > 100) {
    ctx.addIssue({
      code: "custom",
      path: ["name"],
      message: "Name must not exceed 100 characters",
    });
  }

  // Email validation
  if (!data.email.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "Email is required",
    });
  } else if (!z.email().safeParse(data.email.trim()).success) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "Invalid email address",
    });
  }

  // Password validation
  if (!data.password.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "Password is required",
    });
  } else if (data.password.length < 6) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "Password must be at least 6 characters",
    });
  } else if (data.password.length > 50) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "Password must not exceed 50 characters",
    });
  }
});


const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
}).superRefine((data, ctx) => {
  // Email validation
  if (!data.email.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "Email is required",
    });
  } else if (!z.email().safeParse(data.email.trim()).success) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "Invalid email address",
    });
  }

  // Password validation
  if (!data.password.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "Password is required",
    });
  } else if (data.password.length < 6) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "Password must be at least 6 characters",
    });
  }
});

module.exports = {
  registerSchema,
  loginSchema,
};