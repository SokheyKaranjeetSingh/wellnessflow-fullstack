# 🌿 WellnessFlow Fullstack Application

A full-stack wellness session management platform built using **React + Vite (Frontend)** and **Spring Boot + MySQL (Backend)**. The platform allows users to create, manage, and explore wellness sessions with a clean UI and secure backend.

---

## 🧱 Project Structure
WellnessFlow-Fullstack/
├── frontend/ # React + Tailwind CSS (Vite)
└── backend/ # Spring Boot + MySQL (Java 17)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React 18 + Vite
- Tailwind CSS 3.x
- React Router DOM 6
- Axios with JWT interceptors
- Lodash (debounce)

### 🔸 Backend
- Java 17
- Spring Boot 3
- Spring Security (JWT)
- Spring Data JPA
- MySQL
- Maven

---

## 🚀 Getting Started

### ⚙️ Backend Setup (`/backend`)

#### Prerequisites
- Java 17+
- Maven
- MySQL

#### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wellnessflow-fullstack.git
   cd backend
2.ceate a MySQL database:
CREATE DATABASE arvyax_db;
3.Configure DB credentials in:
src/main/resources/application.properties
4.Run the backend:
./mvnw spring-boot:run
The backend will run on: http://localhost:8080

🌐 Frontend Setup (/frontend)
Prerequisites
Node.js v16+

Backend running at http://localhost:8080

Steps
1.Navigate to frontend folder:
cd frontend
2.Install dependencies
npm install
3.Start the development server:
npm run dev
App will be available at: http://localhost:3000
🔐 Authentication & Flow
Users can register/login

Sessions can be created as Draft or Published

Authenticated users can manage their sessions

Visitors can browse published sessions

📦 API Endpoints
| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/api/auth/register` | Register new user                |
| POST   | `/api/auth/login`    | Authenticate user and return JWT |
| Method | Endpoint                                  | Description                          |
| ------ | ----------------------------------------- | ------------------------------------ |
| GET    | `/api/sessions`                           | List all published sessions (public) |
| GET    | `/api/sessions/{id}`                      | Get published session by ID          |
| GET    | `/api/my-sessions`                        | List user's sessions (auth required) |
| POST   | `/api/my-sessions/save-draft`             | Save or update a session draft       |
| POST   | `/api/my-sessions/publish?sessionId={id}` | Publish a session                    |
| PUT    | `/api/my-sessions/{id}`                   | Update session                       |
| DELETE | `/api/my-sessions/{id}`                   | Delete session                       |
🧪 App Features
🖥️ Frontend
Login/Register flow with JWT

Draft + Published session management

Auto-save while editing

View other users' published sessions (read-only)

Responsive layout with Tailwind CSS

Protected routes

🛡️ Backend
JWT-based security with Spring Security

Role-based access for session management

Session CRUD operations

MySQL persistence with JPA

🎨 UI/UX Highlights
Wellness-themed color palette (see tailwind.config.js)

Smooth loading spinners and form validation

Toast alerts and error handling

Mobile-first responsive design
