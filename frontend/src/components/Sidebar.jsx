import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Icon = ({ children }) => (
  <span className="taskflow-nav-icon">{children}</span>
);

const Sidebar = () => {
  return (
    <div>
      <aside className="taskflow-sidebar">
        {/* Brand */}
        <div className="taskflow-dashboard-brand">
          <div className="taskflow-brand-icon">
            <i className="bi bi-stars" />
          </div>
          <span>Taskflow AI</span>
        </div>

        {/* Navigation */}
        <nav className="taskflow-sidebar-nav">
          <p className="taskflow-nav-label">WORKSPACE</p>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `taskflow-nav-item ${isActive ? "active" : ""}`
            }
          >
            <Icon>
              <i className="bi bi-house-door-fill" />
            </Icon>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `taskflow-nav-item ${isActive ? "active" : ""}`
            }
          >
            <Icon>
              <i className="bi bi-folder2-open" />
            </Icon>
            <span>Projects</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `taskflow-nav-item ${isActive ? "active" : ""}`
            }
          >
            <Icon>
              <i className="bi bi-check2-square" />
            </Icon>
            <span>My Tasks</span>
            <span className="taskflow-nav-count">8</span>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;