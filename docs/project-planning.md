# Project Planning

## Project Name

TaskFlow API

### Goal

Build a production-style backend application to learn authorization, task management, file uploads, search, filtering, pagination, and scalable backend architecture

### Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

### Architecture
Route
↓
Controller
↓
Service
↓
Repository
↓
Database

## User Roles

### Admin
- Create Managers
- Create Employees
- Create Tasks
- Assign Tasks
- Delete Tasks
- Manage Users

### Manager

- Create Employees
- Create Tasks
- Assign Tasks
- View Team Tasks

### Employee

- View Assigned Tasks
- Update Task Status
- Change Password

## Collections

### User

- Fields:
1. name
2. email
3. password
4. role
5. profileImage
6. createdAt
7. updatedAt

### Task

- Fields:
title
1. description
2. status
3. priority
4. assignedTo
5. createdBy
6. createdAt
7. updatedAt

## Status Workflow
Pending
↓
In Progress
↓
Completed

`Employees cannot skip directly from Pending to Completed`

## Business Rules
- Only Admin can create Managers.
- Admin and Manager can create Employees.
- Admin and Manager can create Tasks.
- Admin and Manager can assign Tasks.
- Only Admin can delete Tasks.
- Only Admin and Manager can change Task Priority.
- Employees can update Task Status.
- A task can exist without assignment.
- Version 1 supports one assignee per task.

## Learning Goals
- RBAC
- Authorization
- Pagination
- Search & Filtering
- File Uploads
- Cloudinary Integration
- Advanced Validation
- Production-Style Backend Architecture