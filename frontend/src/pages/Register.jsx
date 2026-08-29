import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "../App.css";
import { toast } from "react-toastify";

function EyeIcon({ open }) {
  return open ? (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  ) : (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M10.6 5.2C11.05 5.07 11.52 5 12 5c6.5 0 10 7 10 7a18.2 18.2 0 0 1-3.1 3.8M6.6 6.6C3.7 8.5 2 12 2 12s3.5 7 10 7c1.5 0 2.85-.35 4.05-.88"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");

    setErrorMessage((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setErrorMessage({});

      const response = await api.post("/auth/register", form);

      const { user, token } = response.data.data;

      login(user, token);

      toast.success("Registration successful!");

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error?.message);

      setErrorMessage(
        err.response?.data?.errors || {}
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <main className="taskflow-login-page">

      <div className="taskflow-login-background">

        <div className="taskflow-login-stars" />

        <div className="taskflow-login-glow taskflow-login-glow-one" />

        <div className="taskflow-login-glow taskflow-login-glow-two" />

        <div className="taskflow-login-grid" />

      </div>

      <section className="taskflow-login-visual">

        {/* Brand */}

        <div className="taskflow-brand">

          <div className="taskflow-brand-icon">
            ✦
          </div>

          <span>
            Taskflow AI
          </span>

        </div>


        {/* Hero */}

        <div className="taskflow-login-hero">

          <span className="taskflow-badge">
            ✦ AI-Powered Productivity
          </span>

          <h2>

            Build better
            <br />

            <span>workflows.</span>

          </h2>

          <p>
            Create your workspace, organize your tasks,
            and let AI help you turn your ideas into
            productive workflows.
          </p>

        </div>

        <div className="taskflow-login-scene">

          {/* Main dashboard */}

          <div className="taskflow-login-dashboard">

            {/* Dashboard Header */}

            <div className="login-dashboard-header">

              <div>

                <span>
                  YOUR WORKSPACE
                </span>

                <h3>
                  Start creating 🚀
                </h3>

              </div>

              <div className="login-ai-icon">
                ✦
              </div>

            </div>


            {/* Progress */}

            <div className="login-progress">

              <div className="login-progress-top">

                <span>
                  Workspace setup
                </span>

                <strong>
                  68%
                </strong>

              </div>

              <div className="login-progress-track">

                <div
                  style={{
                    width: "68%",
                  }}
                />

              </div>

            </div>


            {/* Tasks */}

            <div className="login-task-list">

              {/* Completed */}

              <div className="login-task completed">

                <span className="login-check">
                  ✓
                </span>

                <div>

                  <strong>
                    Create your workspace
                  </strong>

                  <small>
                    Completed
                  </small>

                </div>

              </div>


              {/* Current */}

              <div className="login-task current">

                <span className="login-dot" />

                <div>

                  <strong>
                    Add your first project
                  </strong>

                  <small>
                    In progress
                  </small>

                </div>

              </div>


              {/* Upcoming */}

              <div className="login-task">

                <span className="login-dot" />

                <div>

                  <strong>
                    Let AI organize your tasks
                  </strong>

                  <small>
                    Coming next
                  </small>

                </div>

              </div>

            </div>

          </div>

          <div className="taskflow-login-floating login-ai-card">

            <div className="login-floating-icon">
              ✦
            </div>

            <div>

              <strong>
                AI Assistant
              </strong>

              <small>
                Ready to help
              </small>

            </div>

          </div>

          <div className="taskflow-login-floating login-productivity-card">

            <div className="login-floating-icon productivity">
              ↗
            </div>

            <div>

              <strong>
                Productivity
              </strong>

              <small>
                Start your journey
              </small>

            </div>

          </div>

        </div>

      </section>

      <section className="taskflow-login-section">

        <div className="taskflow-login-card">

          <div className="taskflow-mobile-brand">

            <div className="taskflow-brand-icon">
              ✦
            </div>

            <span>
              Taskflow AI
            </span>

          </div>

          <div className="taskflow-login-header">

            <h1>
              Create your account
            </h1>

            <p>
              Join Taskflow AI and start organizing
              your work smarter.
            </p>

          </div>

          {error && (
            <div className="taskflow-login-alert">
              {error}
            </div>
          )}

          <button
            type="button"
            className="taskflow-google-button"
          >

            <span className="taskflow-google-icon">
              G
            </span>

            <span>
              Continue with Google
            </span>

          </button>

          <div className="taskflow-login-divider">

            <span />

            <p>
              Or, continue with email
            </p>

            <span />

          </div>

          <form onSubmit={handleSubmit}>

            <div className="taskflow-field">

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                placeholder="Enter your name"
                onChange={handleChange}
                autoComplete="name"
              />

              {errorMessage?.name?.[0] && (
                <p className="taskflow-field-error">
                  {errorMessage.name[0]}
                </p>
              )}

            </div>

            <div className="taskflow-field">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
                autoComplete="email"
              />

              {errorMessage?.email?.[0] && (
                <p className="taskflow-field-error">
                  {errorMessage.email[0]}
                </p>
              )}

            </div>

            <div className="taskflow-field">

              <label htmlFor="password">
                Password
              </label>


              <div className="taskflow-password-wrapper">

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />


                <button
                  type="button"
                  className="taskflow-eye-button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  <EyeIcon
                    open={showPassword}
                  />

                </button>

              </div>


              {errorMessage?.password?.[0] && (
                <p className="taskflow-field-error">
                  {errorMessage.password[0]}
                </p>
              )}

            </div>

            <button
              disabled={loading}
              className="taskflow-login-button"
              type="submit"
            >

              {loading
                ? "Signing Up..."
                : "Sign Up"}

            </button>

          </form>

          <p className="taskflow-register-text">

            Already have an account?{" "}

            <Link
              to="/login"
              className="taskflow-register-link"
            >
              Sign In
            </Link>

          </p>

          <div className="taskflow-login-footer">

            <span>
              Secure authentication
            </span>

            <span>
              •
            </span>

            <span>
              AI-powered productivity
            </span>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Register;
