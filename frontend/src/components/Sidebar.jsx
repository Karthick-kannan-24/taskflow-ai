import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Icon = ({ children }) => (
  <span className="taskflow-nav-icon">{children}</span>
);

const Sidebar = () =>{

    return (
        <div>
            <aside className="taskflow-sidebar">

                {/* Brand */}
                <div className="taskflow-dashboard-brand">
                <div className="taskflow-brand-icon"><i className="bi bi-stars" /></div>
                <span>Taskflow AI</span>
                </div>

                {/* Navigation */}
                <nav className="taskflow-sidebar-nav">

                <p className="taskflow-nav-label">WORKSPACE</p>

                <Link
                    to="/dashboard"
                    className="taskflow-nav-item active"
                >
                    <Icon><i className="bi bi-house-door-fill" /></Icon>
                    <span>Dashboard</span>
                </Link>

                <Link
                    to="/projects"
                    className="taskflow-nav-item"
                >
                    <Icon><i className="bi bi-folder2-open" /></Icon>
                    <span>Projects</span>
                </Link>

                <Link
                    to="/tasks"
                    className="taskflow-nav-item"
                >
                    <Icon><i className="bi bi-check2-square" /></Icon>
                    <span>My Tasks</span>
                    <span className="taskflow-nav-count">8</span>
                </Link>               

                </nav>

            </aside>
        </div>
    );
};
export default Sidebar;