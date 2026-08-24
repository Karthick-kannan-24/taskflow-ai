# TaskFlow AI 🤖

## Description

TaskFlow AI is a full-stack project and task management platform that helps users
create projects, manage tasks, track progress, and improve productivity with a
small AI-powered task assistant.

## Features

- User registration and login
- JWT-based authentication
- Project management
- Task management
- Task assignment
- Task priority and status
- Project dashboard
- AI-powered task assistant
- Docker containerization
- CI/CD with GitHub Actions

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT, bcrypt
- **AI:** AI API
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions
- **Version Control:** Git, GitHub

## Project Flow Diagram

```text
              ┌─────────────────┐
              │    React.js     │
              │    Frontend     │
              └────────┬────────┘
                       │
                    REST API
                       │
                       ▼
              ┌─────────────────┐
              │ Node.js         │
              │ Express.js      │
              └───────┬─────────┘
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
      ┌─────────────┐   ┌─────────────┐
      │ PostgreSQL  │   │   AI API    │
      │  Database   │   │ AI Assistant│
      └─────────────┘   └─────────────┘

                Docker / Compose
                       │
                       ▼
                GitHub Actions
                    CI/CD
````

## Prerequisites

Before running the project, install:

* Node.js
* npm
* Docker Desktop
* Git
* GitHub account

## Frontend

The frontend is built with React.js and provides the user interface for:

* Authentication
* Dashboard
* Projects
* Tasks
* AI Assistant

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

## Backend

The backend is built with Node.js and Express.js and provides REST APIs for:

* Authentication
* Projects
* Tasks
* Users
* AI Assistant

Run the backend:

```bash
cd backend
npm install
npm run dev
```

## Database

PostgreSQL is used as the primary database.

Start PostgreSQL using Docker:

```bash
docker compose up -d postgres
```

Check the database container:

```bash
docker compose ps
```

## Docker Instructions

Build and start the application:

```bash
docker compose up -d
```

Stop the containers:

```bash
docker compose down
```

Check running containers:

```bash
docker compose ps
```

## Third-Party API

TaskFlow AI uses an AI API to provide intelligent task assistance.

Configure the API key using environment variables:

```env
AI_API_KEY=your_api_key
```

Never commit API keys or other secrets to GitHub.

## AI Assistant Flow

```text
User enters requirement
          │
          ▼
     React Frontend
          │
          ▼
     Express Backend
          │
          ▼
        AI API
          │
          ▼
   Structured AI Result
          │
          ▼
     React Dashboard
```

Example:

```text
Input:
"Build a login system with Google authentication and password reset."

AI Output:
1. Create users table
2. Implement registration
3. Implement login
4. Add JWT authentication
5. Add Google OAuth
6. Implement password reset
```

## Security

* Passwords are hashed using bcrypt
* JWT is used for authentication
* Protected API routes
* Environment variables for sensitive configuration
* Parameterized PostgreSQL queries
* API keys are not stored in source code

## Project Goal

The goal of TaskFlow AI is to demonstrate practical full-stack development
skills by combining:

* Frontend development
* Backend API development
* Database design
* Authentication
* AI integration
* Docker containerization
* CI/CD automation

## Author

**Sayee**

## Future Improvements

* AI task priority suggestions
* AI-generated task descriptions
* AI project progress summaries
* Role-based access control
* Real-time notifications
* Advanced project analytics
* Production deployment
* Automated testing

## License

This project is licensed under the **MIT License**.

```
```
