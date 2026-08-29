import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../api/project";
import {toast} from 'react-toastify';

const initialForm = {
  name: "",
  description: "",
};

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});

  const fetchProjects = async (query = "") => {
    try {
      setLoading(true);
      const response = await getProjects({ search: query });
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingId(project.id);
    setForm({
      name: project.name,
      description: project.description || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      setError("");

      if (editingId) {
        await updateProject(editingId, {
          name: form.name.trim(),
          description: form.description.trim(),
        });
        toast.success("Project updated successfully!");
      } else {
        await createProject({
          name: form.name.trim(),
          description: form.description.trim(),
        });
        toast.success("Project created successfully!");
      }

      closeModal();
      await fetchProjects(search);
    } catch (error) {
      console.error("Project save failed", error);
      setError(error.response?.data?.errors);
      setTimeout(()=>{
        setError("");
      },5000);
    }
  };

  const handleDelete = async (project) => {
    setDeleteTarget(project);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteProject(deleteTarget.id);
      toast.success("Project deleted successfully!");
      setDeleteTarget(null);
      await fetchProjects(search);
    } catch (error) {
      console.error("Project delete failed", error);
      toast.error("Failed to delete project.");
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
            <h1 className="taskflow-page-title">Projects</h1>
          </div>

          <div className="taskflow-project-toolbar">
            <div className="taskflow-search-box">
              <i className="bi bi-search" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects"
                aria-label="Search projects"
              />
            </div>

            <button
              type="button"
              className="taskflow-create-button"
              onClick={openCreateModal}
            >
              <span>+</span>
              New Project
            </button>
          </div>
        </div>

        <section className="taskflow-panel taskflow-projects-panel">
          <div className="taskflow-panel-header">
            <div>
              <span className="taskflow-panel-kicker">OVERVIEW</span>
              <h2>All projects</h2>
            </div>
            <button
              type="button"
              className="taskflow-panel-link-button"
              onClick={() => navigate("/dashboard")}
            >
              Back to dashboard
            </button>
          </div>

          <div className="taskflow-project-grid">
            {loading ? (
              <div className="taskflow-empty-state taskflow-empty-wide">
                Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="taskflow-empty-state taskflow-empty-wide">
                No projects found.
              </div>
            ) : (
              projects.map((project, index) => {
                const progress = [65, 72, 80, 58, 90][index % 5];
                const accent = ["blue", "purple", "green", "cyan"][index % 4];

                return (
                  <article key={project.id} className="taskflow-project-card">
                    <div className="taskflow-project-card-top">
                      <div className={`taskflow-project-icon ${accent}`}>
                        <i className="bi bi-folder2-open" />
                      </div>

                      <div className="taskflow-project-card-actions">
                        <button
                          type="button"
                          aria-label="Edit project"
                          onClick={() => openEditModal(project)}
                        >
                          <i className="bi bi-pencil-square" />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete project"
                          onClick={() => handleDelete(project)}
                        >
                          <i className="bi bi-trash3" />
                        </button>
                      </div>
                    </div>

                    <h3>{project.name}</h3>
                    <p>
                      {project.description || "No description provided for this project yet."}
                    </p>

                    <div className="taskflow-project-progress">
                      <div>
                        <span>Progress</span>
                        <strong>{progress}%</strong>
                      </div>

                      <div className="project-progress-track">
                        <span className={accent} style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    <div className="taskflow-project-footer">
                      <span className="project-date">
                        {new Date(project.updated_at || project.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>{index % 2 === 0 ? "Active" : "Planning"}</span>
                    </div>
                  </article>
                );
              })
            )}

            <button
              type="button"
              className="taskflow-new-project-card"
              onClick={openCreateModal}
            >
              <div>
                <i className="bi bi-plus-lg" />
              </div>
              <strong>New Project</strong>
              <span>Create a fresh workspace</span>
            </button>
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
                <span className="taskflow-panel-kicker">PROJECT</span>
                <h3>{editingId ? "Edit project" : "Create project"}</h3>
              </div>
              <button type="button" onClick={closeModal} aria-label="Close modal">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="taskflow-project-form">
              <label>
                <span>Project name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Enter project name"
                />
                {error?.name?.[0] && (
                <p className="taskflow-field-error">
                  {error.name[0]}
                </p>
              )}
              </label>

              <label>
                <span>Description (Optional)</span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                  placeholder="Add a short project description"
                  rows="4"
                />
                {error?.description?.[0] && (
                <p className="taskflow-field-error">
                  {error.description[0]}
                </p>
              )}
              </label>

              <div className="taskflow-project-modal-actions">
                <button
                  type="button"
                  className="taskflow-secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="taskflow-create-button">
                  {editingId ? "Save changes" : "Create project"}
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
                <h3>Delete project</h3>
              </div>
              <button type="button" onClick={() => setDeleteTarget(null)} aria-label="Close delete modal">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className="taskflow-project-form">
              <p className="taskflow-delete-message">
                Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
              </p>

              <div className="taskflow-project-modal-actions">
                <button
                  type="button"
                  className="taskflow-secondary-button"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button type="button" className="taskflow-create-button" onClick={confirmDelete}>
                  Delete project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;