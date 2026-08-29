import { useEffect, useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="taskflow-dashboard-topbar">
          <div className="taskflow-topbar-actions">
            <button
              type="button"
              className="taskflow-icon-button"
              aria-label="Notifications"
            >
              🔔
              <span className="taskflow-notification-dot" />
            </button>

            <div className="taskflow-sidebar-user-wrapper" ref={menuRef}>
                <button
                    type="button"
                    className="taskflow-sidebar-user"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-expanded={open}
                    aria-haspopup="menu"
                >
                    <img
                        className="taskflow-user-avatar"
                        src="/src/assets/profile-avatar.png"
                        alt="User profile"
                    />

                    <div className="taskflow-user-info">
                        <strong>{user?.name}</strong>
                    </div>

                    <span className="taskflow-user-caret" aria-hidden="true">
                        <i className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"}`} />
                    </span>
                </button>

                {open && (
                    <div className="taskflow-user-dropdown" role="menu">
                        <button type="button" className="taskflow-user-dropdown-item" role="menuitem">
                            <span className="taskflow-user-dropdown-icon"><i className="bi bi-person-circle" /></span>
                            <span>Profile</span>
                        </button>
                        <button type="button" className="taskflow-user-dropdown-item" role="menuitem">
                            <span className="taskflow-user-dropdown-icon"><i className="bi bi-gear" /></span>
                            <span>Settings</span>
                        </button>
                        <button type="button" onClick={handleLogout} className="taskflow-user-dropdown-item" role="menuitem">
                            <span className="taskflow-user-dropdown-icon"><i className="bi bi-box-arrow-right" /></span>
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
          </div>
        </header>
    );
};

export default Header;