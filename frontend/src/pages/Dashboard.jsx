import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { getDashboardStats } from "../api/dashboard";

const Icon = ({ children }) => (
  <span className="taskflow-nav-icon">{children}</span>
);


const Dashboard = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    overdue: 0,
  });

  const now = new Date();

  const hour = now.getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const load = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };

    load();
  }, []);

  return (
   <main className="taskflow-dashboard">

      <Sidebar/>

      <section className="taskflow-dashboard-main">

        <Header/>

          <div className="mb-4">
            <span className="taskflow-topbar-date">
              {formattedDate}
            </span>

            <h1>
              {greeting}, {user?.name} 👋
            </h1>
          </div>

        <div className="taskflow-dashboard-content">

          <section className="taskflow-overview-grid">

            <div className="taskflow-stat-card">
              <div className="taskflow-stat-top">
                <div className="taskflow-stat-icon blue">
                  <Icon><i className="bi bi-folder2-open" /></Icon>
                </div>
                <span className="taskflow-stat-change positive">Live</span>
              </div>
              <span className="taskflow-stat-label">Projects</span>
              <strong className="taskflow-stat-value">{stats.projects}</strong>
              <small>Across all workspaces</small>
            </div>

            <div className="taskflow-stat-card">
              <div className="taskflow-stat-top">
                <div className="taskflow-stat-icon purple">
                  <Icon><i className="bi bi-list-task" /></Icon>
                </div>
                <span className="taskflow-stat-change positive">Total</span>
              </div>
              <span className="taskflow-stat-label">Tasks</span>
              <strong className="taskflow-stat-value">{stats.tasks}</strong>
              <small>Assigned and active</small>
            </div>

            <div className="taskflow-stat-card">
              <div className="taskflow-stat-top">
                <div className="taskflow-stat-icon green">
                  <Icon><i className="bi bi-check-circle-fill" /></Icon>
                </div>
                <span className="taskflow-stat-change positive">Done</span>
              </div>
              <span className="taskflow-stat-label">Completed</span>
              <strong className="taskflow-stat-value">{stats.completed}</strong>
              <small>Successfully finished</small>
            </div>

            <div className="taskflow-stat-card">
              <div className="taskflow-stat-top">
                <div className="taskflow-stat-icon cyan">
                  <Icon><i className="bi bi-alarm" /></Icon>
                </div>
                <span className="taskflow-stat-change">Needs action</span>
              </div>
              <span className="taskflow-stat-label">Overdue</span>
              <strong className="taskflow-stat-value">{stats.overdue}</strong>
              <small>Past due deadlines</small>
            </div>

          </section>

          <section className="taskflow-dashboard-grid">


            {/* TODAY'S TASKS */}

            <div className="taskflow-panel taskflow-tasks-panel">

              <div className="taskflow-panel-header">

                <div>
                  <span className="taskflow-panel-kicker">
                    TODAY
                  </span>

                  <h2>
                    My tasks
                  </h2>
                </div>

                <Link to="/tasks">
                  View all
                </Link>

              </div>


              <div className="taskflow-dashboard-task-list">

                {/* Task 1 */}
                <div className="taskflow-dashboard-task completed">

                  <button
                    type="button"
                    className="task-check checked"
                  >
                    ✓
                  </button>

                  <div className="task-content">

                    <strong>
                      Review project requirements
                    </strong>

                    <span>
                      Taskflow website
                    </span>

                  </div>

                  <span className="task-priority low">
                    Low
                  </span>

                </div>


                {/* Task 2 */}
                <div className="taskflow-dashboard-task">

                  <button
                    type="button"
                    className="task-check"
                  >
                    <span />
                  </button>

                  <div className="task-content">

                    <strong>
                      Build dashboard interface
                    </strong>

                    <span>
                      Taskflow website
                    </span>

                  </div>

                  <span className="task-priority high">
                    High
                  </span>

                </div>


                {/* Task 3 */}
                <div className="taskflow-dashboard-task">

                  <button
                    type="button"
                    className="task-check current"
                  >
                    <span />
                  </button>

                  <div className="task-content">

                    <strong>
                      Connect authentication API
                    </strong>

                    <span>
                      Backend integration
                    </span>

                  </div>

                  <span className="task-priority medium">
                    Medium
                  </span>

                </div>


                {/* Task 4 */}
                <div className="taskflow-dashboard-task">

                  <button
                    type="button"
                    className="task-check"
                  >
                    <span />
                  </button>

                  <div className="task-content">

                    <strong>
                      Write landing page content
                    </strong>

                    <span>
                      Marketing
                    </span>

                  </div>

                  <span className="task-priority medium">
                    Medium
                  </span>

                </div>


                {/* Task 5 */}
                <div className="taskflow-dashboard-task">

                  <button
                    type="button"
                    className="task-check"
                  >
                    <span />
                  </button>

                  <div className="task-content">

                    <strong>
                      Plan tomorrow's sprint
                    </strong>

                    <span>
                      Planning
                    </span>

                  </div>

                  <span className="task-priority low">
                    Low
                  </span>

                </div>

              </div>


              <button
                type="button"
                className="taskflow-add-task"
              >
                <span>+</span>
                Add a task
              </button>

            </div>

            <div className="taskflow-panel taskflow-ai-panel">

              <div className="taskflow-ai-panel-glow" />

              <div className="taskflow-ai-header">

                <div className="taskflow-ai-title">

                  <div className="taskflow-ai-big-icon">
                    ✦
                  </div>

                  <div>
                    <span>TASKFLOW AI</span>

                    <h2>
                      Your productivity copilot
                    </h2>
                  </div>

                </div>

                <span className="taskflow-ai-online">
                  <i />
                  Online
                </span>

              </div>


              <div className="taskflow-ai-message">

                <p>
                  You're making great progress today.
                  You completed <strong>6 tasks</strong>
                  and your productivity is up
                  <strong>24%</strong> this week.
                </p>

              </div>


              <div className="taskflow-ai-suggestions">

                <button type="button">
                  <span>✦</span>
                  What should I focus on?
                </button>

                <button type="button">
                  <span>↗</span>
                  Analyze my productivity
                </button>

                <button type="button">
                  <span>+</span>
                  Help me plan my day
                </button>

              </div>


              <div className="taskflow-ai-input">

                <input
                  type="text"
                  placeholder="Ask Taskflow AI anything..."
                />

                <button
                  type="button"
                  aria-label="Send message"
                >
                  ↑
                </button>

              </div>

            </div>

          </section>

          <section className="taskflow-panel taskflow-projects-panel">

            <div className="taskflow-panel-header">

              <div>

                <span className="taskflow-panel-kicker">
                  WORKSPACE
                </span>

                <h2>
                  Your projects
                </h2>

              </div>

              <Link to="/projects">
                View all
              </Link>

            </div>


            <div className="taskflow-project-grid">


              {/* Project 1 */}

              <div className="taskflow-project-card">

                <div className="taskflow-project-card-top">

                  <div className="taskflow-project-icon blue">
                    TF
                  </div>

                  <button type="button">
                    ⋮
                  </button>

                </div>

                <h3>
                  Taskflow Website
                </h3>

                <p>
                  Build the main Taskflow AI
                  productivity platform.
                </p>

                <div className="taskflow-project-progress">

                  <div>
                    <span>Progress</span>
                    <strong>74%</strong>
                  </div>

                  <div className="project-progress-track">
                    <span style={{ width: "74%" }} />
                  </div>

                </div>

                <div className="taskflow-project-footer">

                  <span>
                    18 / 24 tasks
                  </span>

                  <span className="project-date">
                    Due Sep 02
                  </span>

                </div>

              </div>


              {/* Project 2 */}

              <div className="taskflow-project-card">

                <div className="taskflow-project-card-top">

                  <div className="taskflow-project-icon purple">
                    AI
                  </div>

                  <button type="button">
                    ⋮
                  </button>

                </div>

                <h3>
                  AI Assistant
                </h3>

                <p>
                  Build intelligent productivity
                  recommendations.
                </p>

                <div className="taskflow-project-progress">

                  <div>
                    <span>Progress</span>
                    <strong>48%</strong>
                  </div>

                  <div className="project-progress-track">
                    <span
                      className="purple"
                      style={{ width: "48%" }}
                    />
                  </div>

                </div>

                <div className="taskflow-project-footer">

                  <span>
                    12 / 25 tasks
                  </span>

                  <span className="project-date">
                    Due Sep 10
                  </span>

                </div>

              </div>


              {/* Project 3 */}

              <div className="taskflow-project-card">

                <div className="taskflow-project-card-top">

                  <div className="taskflow-project-icon green">
                    AP
                  </div>

                  <button type="button">
                    ⋮
                  </button>

                </div>

                <h3>
                  API Integration
                </h3>

                <p>
                  Connect frontend with backend
                  services.
                </p>

                <div className="taskflow-project-progress">

                  <div>
                    <span>Progress</span>
                    <strong>61%</strong>
                  </div>

                  <div className="project-progress-track">
                    <span
                      className="green"
                      style={{ width: "61%" }}
                    />
                  </div>

                </div>

                <div className="taskflow-project-footer">

                  <span>
                    11 / 18 tasks
                  </span>

                  <span className="project-date">
                    Due Sep 06
                  </span>

                </div>

              </div>


              {/* New Project */}

              <button
                type="button"
                className="taskflow-new-project-card"
              >

                <div>+</div>

                <strong>
                  Create new project
                </strong>

                <span>
                  Start something new
                </span>

              </button>

            </div>

          </section>

          <section className="taskflow-bottom-grid">


            {/* Recent Activity */}

            <div className="taskflow-panel">

              <div className="taskflow-panel-header">

                <div>

                  <span className="taskflow-panel-kicker">
                    ACTIVITY
                  </span>

                  <h2>
                    Recent activity
                  </h2>

                </div>

                <button
                  type="button"
                  className="taskflow-text-button"
                >
                  See all
                </button>

              </div>


              <div className="taskflow-activity-list">

                <div className="taskflow-activity">

                  <div className="activity-avatar blue">
                    JD
                  </div>

                  <div>

                    <p>
                      You completed{" "}
                      <strong>
                        Review project requirements
                      </strong>
                    </p>

                    <span>
                      12 minutes ago
                    </span>

                  </div>

                </div>


                <div className="taskflow-activity">

                  <div className="activity-icon purple">
                    ✦
                  </div>

                  <div>

                    <p>
                      AI generated{" "}
                      <strong>
                        5 task suggestions
                      </strong>
                    </p>

                    <span>
                      34 minutes ago
                    </span>

                  </div>

                </div>


                <div className="taskflow-activity">

                  <div className="activity-icon green">
                    ✓
                  </div>

                  <div>

                    <p>
                      You completed{" "}
                      <strong>
                        Connect authentication flow
                      </strong>
                    </p>

                    <span>
                      1 hour ago
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* Weekly Productivity */}

            <div className="taskflow-panel taskflow-chart-panel">

              <div className="taskflow-panel-header">

                <div>

                  <span className="taskflow-panel-kicker">
                    PERFORMANCE
                  </span>

                  <h2>
                    Weekly productivity
                  </h2>

                </div>

                <span className="taskflow-chart-value">
                  +24%
                </span>

              </div>


              <div className="taskflow-chart">

                <div className="chart-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>


                <div className="chart-bars">

                  <div>
                    <span style={{ height: "42%" }} />
                    <small>Mon</small>
                  </div>

                  <div>
                    <span style={{ height: "58%" }} />
                    <small>Tue</small>
                  </div>

                  <div>
                    <span style={{ height: "48%" }} />
                    <small>Wed</small>
                  </div>

                  <div>
                    <span style={{ height: "76%" }} />
                    <small>Thu</small>
                  </div>

                  <div>
                    <span style={{ height: "68%" }} />
                    <small>Fri</small>
                  </div>

                  <div>
                    <span style={{ height: "88%" }} />
                    <small>Sat</small>
                  </div>

                  <div>
                    <span
                      className="today"
                      style={{ height: "82%" }}
                    />
                    <small>Sun</small>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </section>

    </main>
  );
};

export default Dashboard;
