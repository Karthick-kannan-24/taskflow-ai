import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getProjects } from "../api/project";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../api/task";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
};

const priorityMap = {
  low: { label: "Low", className: "low" },
  medium: { label: "Medium", className: "medium" },
  high: { label: "High", className: "high" },
};

const statusMap = {
  todo: { label: "To do", className: "todo" },
  in_progress: { label: "In progress", className: "in-progress" },
  done: { label: "Done", className: "done" },
};

const Tasks = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState({});

  const selectedProject = useMemo(
    () => projects.find((project) => String(project.id) === String(selectedProjectId)),
    [projects, selectedProjectId]
  );

  const loadProjects = async () => {
    try {
      const response = await getProjects({ search: "" });
      const projectList = response.data.data || [];
      setProjects(projectList);

      if (!selectedProjectId && projectList[0]) {
        setSelectedProjectId(String(projectList[0].id));
      }
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  };

  const loadTasks = async (projectId = selectedProjectId) => {
    if (!projectId) return;

    try {
      setLoading(true);
      const response = await getTasks({ projectId, search: "" });
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Failed to load tasks", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      loadTasks(selectedProjectId);
    }
  }, [selectedProjectId]);

  const openCreateModal = () => {
    setForm(initialForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(initialForm);
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();

    if (!selectedProjectId) {
      toast.error("Please select a project first.");
      return;
    }

    try {
      const created = await createTask({
        projectId: Number(selectedProjectId),
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
      });

      if (form.status && form.status !== "todo") {
        await updateTaskStatus(created.data.data.id, form.status);
      }

      toast.success("Task created successfully!");
      closeModal();
      await loadTasks(selectedProjectId);
    } catch (error) {
      console.error("Failed to create task", error);
      setError(error.response?.data?.errors);
      setTimeout(()=>{
        setError("");
      },5000);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
      await loadTasks(selectedProjectId);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete task error", error);
      toast.error("Failed to delete task.");
    }
  };

  const handleStatusChange = async (taskId, nextStatus) => {
    try {
      await updateTaskStatus(taskId, nextStatus);
      toast.success("Task status updated.");
      await loadTasks(selectedProjectId);
    } catch (error) {
      console.error("Status update failed", error);
      toast.error("Failed to update task status.");
    }
  };

  return (
    <main className="taskflow-dashboard">
      <Sidebar />

      <section className="taskflow-dashboard-main">
        <Header />

        <div className="taskflow-page-header">
          <div>
            <span className="taskflow-panel-kicker">WORKSPACE</span>
            <h1 className="taskflow-page-title">Tasks</h1>
          </div>

          <div className="taskflow-project-toolbar">
            <div className="taskflow-task-project-picker">
              <label htmlFor="task-project-select">Project</label>
              <select
                id="task-project-select"
                value={selectedProjectId}
                onChange={(event) => setSelectedProjectId(event.target.value)}
              >
                {projects.length === 0 ? (
                  <option value="">No projects</option>
                ) : (
                  projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              type="button"
              className="taskflow-create-button mt-3"
              onClick={openCreateModal}
              disabled={!selectedProjectId}
            >
              <span>+</span>
              New Task
            </button>
          </div>
        </div>

        <section className="taskflow-panel taskflow-projects-panel">
          <div className="taskflow-panel-header">
            <div>
              <span className="taskflow-panel-kicker">LIST</span>
              <h2>{selectedProject ? selectedProject.name : "Tasks"}</h2>
            </div>
            <button
              type="button"
              className="taskflow-panel-link-button"
              onClick={() => navigate("/dashboard")}
            >
              Back to dashboard
            </button>
          </div>

          <div className="taskflow-task-list-grid">
            {loading ? (
              <div className="taskflow-empty-state taskflow-empty-wide">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="taskflow-empty-state taskflow-empty-wide">
                No tasks for this project yet.
              </div>
            ) : (
              tasks.map((task) => (
                <article key={task.id} className="taskflow-task-card">
                  <div className="taskflow-task-card-top">
                    <span className={`task-priority ${priorityMap[task.priority]?.className || "medium"}`}>
                      {priorityMap[task.priority]?.label || task.priority}
                    </span>

                    <button
                      type="button"
                      className="taskflow-task-delete"
                      aria-label="Delete task"
                      onClick={() => setDeleteTarget(task)}
                    >
                      <i className="bi bi-trash3" />
                    </button>
                  </div>

                  <h3>{task.title}</h3>
                  <p>
                    {task.description || "No description provided for this task."}
                  </p>

                  <div className="taskflow-task-meta">
                    <span className={`taskflow-status-badge ${statusMap[task.status]?.className || "todo"}`}>
                      {statusMap[task.status]?.label || task.status}
                    </span>

                    {task.due_date && (
                      <span className="taskflow-task-date">
                        <i className="bi bi-calendar3" />
                        {new Date(task.due_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <div className="taskflow-task-status-actions">
                    {Object.entries(statusMap).map(([statusKey, statusData]) => (
                      <button
                        key={statusKey}
                        type="button"
                        className={`taskflow-status-option ${task.status === statusKey ? "active" : ""}`}
                        onClick={() => handleStatusChange(task.id, statusKey)}
                      >
                        {statusData.label}
                      </button>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>

      {modalOpen && (
        <div className="taskflow-project-modal-overlay" onClick={closeModal}>
          <div
            className="taskflow-project-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="taskflow-project-modal-header">
              <div>
                <span className="taskflow-panel-kicker">TASK</span>
                <h3>Create task</h3>
              </div>
              <button type="button" onClick={closeModal} aria-label="Close task modal">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="taskflow-project-form">
              <label>
                <span>Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  placeholder="Enter task title"
                />
                {error?.title?.[0] && (
                <p className="taskflow-field-error">
                  {error.title[0]}
                </p>
                )}
              </label>

              <label>
                <span>Description</span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                  placeholder="Add task details"
                  rows="4"
                />
                {error?.description?.[0] && (
                <p className="taskflow-field-error">
                  {error.description[0]}
                </p>
              )}
              </label>

              <div className="taskflow-task-form-row">
                <label>
                  <span>Priority</span>
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, priority: event.target.value }))
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <label>
                  <span>Status</span>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, status: event.target.value }))
                    }
                  >
                    <option value="todo">To do</option>
                    <option value="in_progress">In progress</option>
                    <option value="done">Done</option>
                  </select>
                </label>
              </div>

              <div className="taskflow-project-modal-actions">
                <button
                  type="button"
                  className="taskflow-secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="taskflow-create-button">
                  Create task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="taskflow-project-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div
            className="taskflow-project-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="taskflow-project-modal-header">
              <div>
                <span className="taskflow-panel-kicker">DELETE</span>
                <h3>Delete task</h3>
              </div>
              <button type="button" onClick={() => setDeleteTarget(null)} aria-label="Close delete modal">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className="taskflow-project-form">
              <p className="taskflow-delete-message">
                Are you sure you want to delete <strong>{deleteTarget.title}</strong>? This action cannot be undone.
              </p>

              <div className="taskflow-project-modal-actions">
                <button
                  type="button"
                  className="taskflow-secondary-button"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="taskflow-create-button"
                  onClick={() => handleDelete(deleteTarget.id)}
                >
                  Delete task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Tasks;