const projectRepository = require("../repositories/project.repository");

const createProject = async (data, userId) => {
  return projectRepository.createProject({
    ...data,
    ownerId: userId,
  });
};

const getMyProjects = async (userId, queryParams) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const search = queryParams.search || "";

  return projectRepository.getProjectsByOwner({
    ownerId: userId,
    page,
    limit,
    search,
  });
};

const getProject = async (projectId, userId) => {
  const project = await projectRepository.getProjectById(
    projectId,
    userId
  );

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

const updateProject = async (projectId, userId, data) => {
  const project = await projectRepository.updateProject({
    id: projectId,
    ownerId: userId,
    ...data,
  });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

const deleteProject = async (projectId, userId) => {
  const project = await projectRepository.deleteProject(
    projectId,
    userId
  );

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return;
};

module.exports = { createProject, getMyProjects, getProject, updateProject, deleteProject };