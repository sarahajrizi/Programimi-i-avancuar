# 👤 User Profile Microservice

A simple user profile microservice built with **Node.js** and **Express**, featuring:

- JWT-based authentication
- User registration and profile management
- Input validation with Joi
- Password hashing with bcrypt
- **Unit and integration tests with Jest and Supertest**
- In-memory storage (Supabase integration coming soon)

---

## 🚀 Tech Stack

- **Node.js** + **Express**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Joi** for validation
- **Jest** + **Supertest** for testing

---

## 📦 API Endpoints

| Method | Endpoint             | Description                      | Auth Required |
|--------|----------------------|----------------------------------|----------------|
| GET    | `/health`            | Health check                     | ❌             |
| POST   | `/users`             | Register a new user              | ❌             |
| POST   | `/auth/login`        | Authenticate and return token    | ❌             |
| GET    | `/users/me`          | Get current user profile         | ✅             |
| GET    | `/users/:id`         | Get user by ID                   | ✅             |
| PUT    | `/users/:id`         | Update user profile              | ✅             |

---

## 🔐 Authentication

All protected routes require a Bearer token in the `Authorization` header:

Authorization: Bearer <your_jwt_token>

yaml
Copy
Edit

Token is returned via `/auth/login`.

---

## 🧪 Running Tests

This project includes:

- ✅ 2 unit tests (e.g. `createUser`)
- ✅ 2 integration tests (e.g. `/users`, `/auth/login`)

### Run all tests:

```bash
npm test

📂 Project Structure
pgsql
Copy
Edit
user-profile-service/
├── server.js
├── package.json
├── jest.config.js
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── models/
│   └── utils/
└── tests/