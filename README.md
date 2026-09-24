# TaskFlow

A production-oriented role-based task management application built to understand and implement real-world backend and full-stack engineering concepts.

TaskFlow started as a backend-focused project and is being developed into a complete full-stack application with a React frontend and a Node.js/Express backend.

The project focuses on understanding **how real applications are designed, structured, secured, connected, and developed feature by feature**, rather than simply building a collection of APIs.

---

## Project Goal

The primary goal of TaskFlow is to build a complete task management system while learning and implementing practical software engineering concepts.

The project covers:

* Backend architecture
* REST API design
* Authentication and authorization
* Role-Based Access Control (RBAC)
* Database design
* Business logic separation
* Frontend-backend integration
* JWT-based authentication
* Form handling and validation
* API communication
* Scalable project structure
* Error handling
* Security fundamentals
* Production-oriented development practices

The project is intentionally developed incrementally, with each feature being implemented, tested, and integrated before moving to the next one.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* REST API
* CORS

## Frontend

* React
* TypeScript
* Vite
* Axios
* React Router
* CSS

## Development Tools

* Git
* GitHub
* MongoDB Compass
* Postman

---

# Architecture

The backend follows a layered architecture to separate responsibilities and keep business logic independent from HTTP and database concerns.

```text
Client
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```

### Route

Responsible for:

* Defining API endpoints
* Connecting middleware
* Applying authorization rules

### Controller

Responsible for:

* Receiving HTTP requests
* Extracting request data
* Calling services
* Sending HTTP responses

### Service

Contains application and business logic.

The service layer is responsible for:

* Business rules
* Validation related to business operations
* Authentication logic
* Authorization-related decisions
* Coordinating repository operations

### Repository

Responsible for database operations.

The repository layer communicates with MongoDB through Mongoose.

This keeps database-specific logic separate from the service layer.

---

# Authentication & Authorization

TaskFlow uses JWT-based authentication.

The authentication flow is:

```text
User Login
    ↓
Frontend
    ↓
POST /users/login
    ↓
Backend validates credentials
    ↓
Password verification
    ↓
JWT generated
    ↓
Frontend receives JWT
    ↓
JWT stored in browser
    ↓
JWT used for protected API requests
```

## Authentication Features

Implemented:

* User login
* Password validation
* bcrypt password verification
* JWT generation
* JWT verification
* Protected routes
* Authentication middleware
* User existence verification
* Request-level user identification

The backend authentication middleware verifies the JWT and validates that the authenticated user still exists in the database.

---

# Role-Based Access Control

TaskFlow uses three roles:

```text
Admin
Manager
Employee
```

Different roles have different permissions.

### Admin

Can:

* Create users
* Manage users
* Create tasks
* View tasks
* Delete tasks
* Change task priority
* Perform administrative operations

### Manager

Can:

* Create tasks
* Assign tasks to employees
* View tasks
* Change task priority
* Manage tasks according to assigned permissions

### Employee

Can:

* View assigned tasks
* Update task status
* Access their own task information

The authorization layer ensures that users cannot perform operations outside their assigned role.

---

# User Management

TaskFlow includes user management functionality for controlled account creation and administration.

Implemented functionality includes:

* User creation
* User login
* User retrieval
* User update
* Password change
* Password validation
* Role management
* User activation/deactivation support
* Authentication
* Authorization

User registration is intentionally controlled rather than allowing unrestricted public signup.

---

# Task Management

TaskFlow provides role-based task management.

Implemented task operations include:

* Task creation
* Task retrieval
* Task assignment
* Task updates
* Task deletion
* Task status management
* Task priority management
* Role-based task permissions
* Employee-specific task retrieval

Example permission model:

```text
Admin
 ├── Create Task
 ├── View Tasks
 ├── Update Tasks
 ├── Delete Tasks
 └── Change Priority

Manager
 ├── Create Task
 ├── View Tasks
 ├── Update Tasks
 ├── Assign Tasks
 └── Change Priority

Employee
 ├── View Assigned Tasks
 └── Update Status
```

---

# Frontend

The frontend is being developed as a React + TypeScript application connected directly to the TaskFlow backend.

The frontend development follows the same incremental approach as the backend.

## Current Frontend Features

### Login UI

Implemented:

* Responsive login interface
* Email input
* Password input
* Browser-level form validation
* Password show/hide functionality
* Login form submission
* API integration using Axios
* Error handling for API requests

### Frontend Authentication Flow

```text
Login Form
    ↓
React Form Handling
    ↓
Axios
    ↓
POST /users/login
    ↓
Backend Authentication
    ↓
JWT Response
    ↓
Frontend receives JWT
    ↓
JWT stored in localStorage
```

The frontend and backend are now successfully connected through the login flow.

---

# API Communication

Axios is used on the frontend for communication with the backend API.

A centralized Axios instance is used so that the API base URL can be configured through environment variables.

Example configuration:

```env
VITE_API_URL=http://localhost:5000
```

The frontend communicates with backend endpoints through HTTP requests rather than directly accessing the database.

---

# Environment Variables

Environment-specific configuration is kept outside the source code.

Example:

```env
VITE_API_URL=http://localhost:5000
```

Sensitive backend configuration such as:

* MongoDB connection strings
* JWT secrets
* credentials
* private API keys

is kept outside the repository.

An `.env.example` file can be used to document required environment variables without exposing actual secrets.

---

# Security Fundamentals

The project incorporates several fundamental security practices:

* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Role-based authorization
* Input validation
* Controlled user creation
* Environment variables for secrets
* CORS configuration
* Authentication middleware
* User existence verification after JWT validation

Security features are implemented according to the scope of the project and will be expanded as the application evolves.

---

# Error Handling

The backend uses centralized error handling to keep error responses consistent across the application.

The project follows the principle:

```text
Controller
    ↓
Service
    ↓
Error
    ↓
Central Error Handler
    ↓
HTTP Response
```

This prevents every controller from having to independently implement the complete error-response logic.

---

# Database

MongoDB is used as the primary database.

Mongoose is used as the ODM layer.

The project focuses on understanding:

* Schema design
* Models
* CRUD operations
* Relationships through references
* Query design
* Validation
* Indexing
* Database performance
* Aggregation
* Transactions
* Query optimization

Advanced database concepts will be introduced as they become relevant to actual application requirements.

---

# Planned Features

The project is still under active development.

Planned backend features include:

* Pagination
* Search
* Filtering
* Sorting
* Advanced validation
* File uploads
* Cloud storage
* Email notifications
* Logging
* Rate limiting
* Caching
* Redis
* Background jobs
* API documentation
* Unit testing
* Integration testing
* Deployment
* CI/CD fundamentals

Planned frontend features include:

* Protected routes
* Authentication state management
* Logout
* Authenticated API requests
* Axios request configuration
* Role-based UI
* Task dashboard
* Task creation interface
* Task assignment interface
* Task management UI
* Search and filtering UI
* Pagination UI
* Loading states
* Error states
* Reusable components
* Responsive layouts
* Improved user experience

Features will be added based on actual application requirements rather than adding technologies only for the sake of increasing the tech stack.

---

# Development Approach

TaskFlow is being developed incrementally.

Instead of implementing the entire application at once, development follows this process:

```text
Understand Requirement
        ↓
Design the Flow
        ↓
Implement Backend
        ↓
Test API
        ↓
Build Frontend
        ↓
Connect Frontend + Backend
        ↓
Test End-to-End
        ↓
Refactor / Polish
        ↓
Commit Feature
```

This approach helps understand not only how individual technologies work, but also how they work together in a complete application.

---

# Project Structure

The repository is organized into separate backend and frontend applications.

```text
Task-Flow-api/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── ...
│   │
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── ...
│   │
│   └── ...
│
├── docs/
│
├── .gitignore
└── README.md
```

The exact structure may evolve as the application grows.

---

# Current Project Status

🚧 **Actively Developing**

### Backend

Core backend foundation and authentication/authorization functionality have been implemented.

### Frontend

Frontend development is currently in progress.

The first complete frontend authentication flow has been implemented:

```text
React Login UI
      ↓
Axios
      ↓
Node.js / Express API
      ↓
Authentication
      ↓
JWT
      ↓
Frontend
      ↓
localStorage
```

The next stage is to use the stored JWT for authenticated requests and continue building the application around the existing backend APIs.

---

# Learning Outcomes

Through TaskFlow, the goal is to gain practical experience with:

* Designing backend systems
* Structuring production-style APIs
* Separating application responsibilities
* Implementing authentication
* Implementing authorization
* Designing role-based systems
* Working with databases
* Building React applications
* Connecting frontend and backend
* Handling asynchronous operations
* Designing reusable components
* Understanding security fundamentals
* Testing APIs and applications
* Debugging real application problems
* Using Git and GitHub effectively
* Developing features incrementally
* Making engineering decisions based on requirements

---

# Project Philosophy

TaskFlow is not intended to be a simple CRUD tutorial project.

The goal is to understand **why a feature is designed a certain way, how the frontend and backend interact, where business logic belongs, how data flows through the system, and what changes when the application grows**.

The project will continue to evolve from a backend-focused API into a complete full-stack application while maintaining a strong focus on fundamentals, clean architecture, security, database design, and practical engineering.
