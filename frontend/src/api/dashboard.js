import api from "./axios";

export const getDashboardStats = async () => {
  const projects = await api.get("/projects");
  const projectList = projects.data.data;

  let allTasks = [];

  for (const project of projectList) {
    const tasks = await api.get(`/tasks?projectId=${project.id}`);
    allTasks.push(...tasks.data.data);
  }

  const completed = allTasks.filter(
    (task) => task.status === "done"
  ).length;

  const overdue = allTasks.filter((task) => {
    if (!task.due_date) return false;

    return (
      task.status !== "done" &&
      new Date(task.due_date) < new Date()
    );
  }).length;

  return {
    projects: projectList.length,
    tasks: allTasks.length,
    completed,
    overdue,
  };
};