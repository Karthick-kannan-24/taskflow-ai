import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const submittingRef = useRef(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;

    submittingRef.current = true;

    try {
      setLoading(true);
      setError("");
      setErrorMessage({});

      const response = await api.post("/auth/login", form);

      const { user, token } = response.data.data;

      login(user, token);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error?.message);

      setErrorMessage(
        err.response?.data?.errors || {}
      );

      setTimeout(() => {
        setError("");
        setErrorMessage({});
      }, 5000);
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

        <div className="taskflow-login-hero">

          <span className="taskflow-badge">
            ✦ AI-Powered Productivity
          </span>

          <h2>
            Welcome
            <br />
            <span>
              back.
            </span>
          </h2>

          <p>
            Pick up where you left off. Manage your
            projects, organize your tasks, and let AI
            help you stay productive.
          </p>

        </div>

        <div className="taskflow-login-scene">

          <div className="taskflow-login-dashboard">

            {/* Dashboard Header */}

            <div className="login-dashboard-header">

              <div>

                <span>
                  YOUR WORKSPACE
                </span>

                <h3>
                  Welcome back 👋
                </h3>

              </div>

              <div className="login-ai-icon">
                ✦
              </div>

            </div>

            <div className="login-progress">

              <div className="login-progress-top">

                <span>
                  Today's productivity
                </span>

                <strong>
                  82%
                </strong>

              </div>

              <div className="login-progress-track">

                <div />

              </div>

            </div>

            <div className="login-task-list">

              {/* Completed Task */}

              <div className="login-task completed">

                <span className="login-check">
                  ✓
                </span>

                <div>

                  <strong>
                    Review project tasks
                  </strong>

                  <small>
                    Completed
                  </small>

                </div>

              </div>


              {/* Current Task */}

              <div className="login-task current">

                <span className="login-dot" />

                <div>

                  <strong>
                    Continue authentication flow
                  </strong>

                  <small>
                    In progress
                  </small>

                </div>

              </div>


              {/* Upcoming Task */}

              <div className="login-task">

                <span className="login-dot" />

                <div>

                  <strong>
                    Plan tomorrow's tasks
                  </strong>

                  <small>
                    Upcoming
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
                +24% this week
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
              Welcome back
            </h1>

            <p>
              Sign in to continue managing your
              projects and tasks.
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
            onClick={() => {
              console.log("Google login clicked");
            }}
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

              <div className="taskflow-password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="taskflow-forgot-button"
                  onClick={() => {
                    console.log(
                      "Forgot password clicked"
                    );
                  }}
                >
                  Forgot password?
                </button>

              </div>


              <div className="taskflow-password-wrapper">

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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
                ? "Signing in..."
                : "Sign In"}

            </button>

          </form>

          <p className="taskflow-register-text">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="taskflow-register-link"
            >
              Sign Up
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

export default Login;
