const projectService = require("../services/project.service");

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProjects = async (req, res, next) => {
  try {
    const result = await projectService.getMyProjects(
      req.user.id,
      req.query
    );

    res.json({
      success: true,
      data: result.projects,
      pagination: {
        total: result.total,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProject(
      req.params.id,
      req.user.id
    );

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(
      req.params.id,
      req.user.id
    );

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, getMyProjects, getProject, updateProject, deleteProject };