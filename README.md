🚀 Task Management Backend API

A production-ready REST API built with Node.js, Express, Sequelize, and MySQL, featuring JWT authentication, task CRUD, filtering, sorting, pagination, and cloud deployment support.

This project is part of the Node.js Backend Practical Test.

📌 Features Overview
🔐 Authentication

Register new user

Login existing user

Password hashing using bcrypt

JWT-based authentication

Protected task routes

📋 Task Management

Create task

Get all tasks of logged-in user

Get a single task

Update task

Delete task

🔎 Filtering, Sorting & Pagination

Filter by status or priority

Sort by priority or createdAt

Paginate using page & limit

🧪 Input Validation

Implemented using Joi

Validations for register, login, task create, and task update

🧠 Additional Business Rule (Custom Feature)

A user cannot have more than one task in In Progress status.
If user tries to update another task to "In Progress":

"You already have a task in progress. Complete it before starting another one."

🗂️ Tech Stack

Node.js, Express.js

MySQL with Sequelize ORM

JWT Authentication

Bcrypt Password Hashing

Joi Validation

Postman Collection Included

📁 Project Structure
/project-root
│── controllers/
│── middleware/
│── models/
│── routes/
│── services/
│── validations/
│── config/
│── schema.sql
│── app.js
│── package.json
│── README.md

🛠️ Getting Started
1️⃣ Clone the Repository
git clone <your-github-repo-url>
cd task-manager-backend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

PORT=4007

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

DB_HOST=your_db_host
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

4️⃣ Import Database Schema

If using Railway or local MySQL:

mysql -h <HOST> -P <PORT> -u <USER> -p <DB_NAME> < schema.sql

5️⃣ Run the Server
npm start


Your server runs at:

👉 http://localhost:4007

🔐 Authentication Endpoints
Register User

POST /users/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}

Login User

POST /users/login

Response:

{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}

📋 Task Endpoints (Protected)
Add header:
Authorization: Bearer <token>

Create Task

POST /tasks

{
  "title": "Call HR",
  "description": "Regarding job application"
}

Get All Tasks

GET /tasks?page=1&limit=10&status=Pending&priority=High&sortBy=createdAt&order=DESC

Supports:

Filters

Sorting

Pagination

Get Single Task

GET /tasks/:id

Update Task

PUT /tasks/:id

✔ Includes custom rule preventing more than one "In Progress" task.

Delete Task

DELETE /tasks/:id

⚙️ Business Rules Implemented
✔ Unique Email Check During Registration
✔ JWT Authentication for Task Routes
✔ A User Can Have Only One “In Progress” Task
✔ Users Can Access Only Their Own Tasks
✔ Server-side Joi Validation for All Inputs
✔ Tasks are Always Created with Default "Pending" Status
📦 Postman Collection

The Postman collection is included in the project root:

Task_Management_BackEnd.postman_collection.json


You can import it directly in Postman.

☁️ Deployment

You can deploy this project on:

Railway (Recommended for MySQL)

Render

Vercel + External MySQL

AWS / GCP / Azure

Required Environment Variables on Cloud
JWT_SECRET=
JWT_EXPIRES_IN=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=


After deployment, your live API URL will look like:

https://your-domain.com/api

🧪 Bonus (Optional Enhancements)

You may extend the project with:

Unit Tests (Jest + Supertest)

Docker Containerization

GitHub Actions CI/CD

📘 Conclusion

This Task Management API includes:

✔ Full Authentication
✔ Task CRUD
✔ Pagination, Filtering, Sorting
✔ MySQL + Sequelize ORM
✔ Joi Validation
✔ Cloud-ready Environment
✔ Clean Modular Architecture
✔ Additional Business Logic (In-Progress Task Constraint)

This codebase is suitable for production use and fulfills the full assignment criteria with enhancements.