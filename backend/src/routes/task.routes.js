const express = require("express");

const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const { createTaskSchema, updateTaskSchema, updateTaskStatusSchema } = require("../validators/task.validator");
const controller = require("../controllers/task.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(createTaskSchema),
  controller.createTask
);

router.get("/", authenticate, controller.getTasks);

router.get("/:id", authenticate, controller.getTask);

router.put(
  "/:id",
  authenticate,
  validate(updateTaskSchema),
  controller.updateTask
);

router.patch(
  "/:id/status",
  authenticate,
  validate(updateTaskStatusSchema),
  controller.updateTaskStatus
);

router.delete(
  "/:id",
  authenticate,
  controller.deleteTask
);

module.exports = router;