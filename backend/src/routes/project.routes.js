const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const { createProjectSchema, updateProjectSchema } = require("../validators/project.validator");
const controller = require("../controllers/project.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(createProjectSchema),
  controller.createProject
);

router.get("/", authenticate, controller.getMyProjects);

router.get("/:id", authenticate, controller.getProject);

router.put(
  "/:id",
  authenticate,
  validate(updateProjectSchema),
  controller.updateProject
);

router.delete(
  "/:id",
  authenticate,
  controller.deleteProject
);

module.exports = router;