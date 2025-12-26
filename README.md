# Nestora
https://nestora-psi.vercel.app/
**Contents**

* Project overview

**Nestora** is a full‑stack web application composed of:

* `backend` — **Spring Boot (Java)** REST API
* `nestora-frontend` — **Next.js** application

The backend handles business logic, authentication, and database operations, while the Next.js frontend provides a modern client interface with server-side rendering.

---

## Project overview

**Nestora** is a full‑stack property rental/Hotel Booking web application composed of a frontend client and a backend API. The project is laid out in two top-level folders:

* `nestora-frontend` — React-based single page application
* `backend` — REST related services

The repo also contains Java code (background microservices or processing modules).

### Goals

* Provide a modern, maintainable codebase for building the Nestora product
* Separate concerns between UI, API, and background processing
* Support local development with simple `npm`/`yarn` scripts and environment variables

---

## Tech stack (inferred)

* Frontend: React, TypeScript or JavaScript (create-react-app / Vite)
* Backend: NestJS (Node.js), Express-compatible, TypeScript or JavaScript
* Database: PostgreSQL (recommended), or any relational DB
* Auth: JWT-based authentication (access + refresh tokens)
* Background processing: Java microservice(s) or worker(s)
* Hosting: Vercel for frontend or backend preview, Docker for production

---

## Quick start

> These commands are templates. Replace `npm` with `yarn` if you use Yarn, and confirm exact `scripts` from your `package.json` files.

1. Clone the repository

```bash
git clone https://github.com/kumardeepak07/Nestora.git
cd Nestora
```

2. Start the backend

```bash
cd backend
cp .env.example .env   # set DB, JWT secrets, PORT etc.
npm install
npm run build    # if TypeScript
npm run start:dev
```

3. Start the frontend

```bash
cd ../nestora-frontend
cp .env.example .env   # set REACT_APP_API_URL
npm install
npm start
```

4. Start Java service(s)

```bash
cd ../backend/java-service
# follow service-specific README, or build with maven/gradle
mvn clean install
java -jar target/your-service.jar
```

---

## Environment variables (example)

```
# backend/.env
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/nestora
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=3600s
REFRESH_TOKEN_SECRET=your_refresh_secret
```

```
# frontend/.env
REACT_APP_API_URL=http://localhost:3000/api
```

---

## Architecture & System Design

```mermaid

flowchart LR
  subgraph Client
    A[Next.js Frontend]
  end

  subgraph API
    C[Spring Boot REST API]
    D[(Auth - JWT)]
  end

  subgraph Data
    DB[(Postgres Database)]
  end

  A -->|HTTPS / API Calls| C
  C --> DB
  C --> D

```

**Components explained**

* **React SPA**: UI handling routing, forms, authentication, and API interactions. Uses environment variable for API base URL.
* **NestJS API**: Handles user management, business logic, validation, and data access. Exposes RESTful endpoints under `/api/*` or GraphQL endpoint.
* **Auth (JWT)**: Issues short-lived access tokens and refresh tokens. Tokens signed by secrets stored in environment.
* **Database**: Stores users, roles, application data.
* **File storage**: Object storage for user uploads and media (imagekit.io).
* **Background workers**: Java or Node workers process heavy tasks.

---

## API & Data model (example endpoints)

**Property**

* `POST /api/properties/` — Add new property
* `GET /api/properties/` — Get all properties
* `GET /api/properties/my-properties` — Get owner properties
* `GET /api/properties/{id}` — Get property by ID
* `DELETE /api/properties/delete-property/{id}` — Delete property by ID
* `POST /api/properties/update-availablity` — Update property status
* `GET /api/properties/search-properties` — Get all properties by location

**Auth**

* `POST /api/auth/register` — register new user
* `POST /api/auth/login` — login -> returns access + refresh token

**Users**

* `GET /api/users/get-user` — profile (requires auth)
* `GET /api/users/get-properties` — Get Properties for User
* `PUT /api/users/change-role` — Change User Role

**Bookings**

* `GET /api/bookings/my-bookings` — Get User Bookings
* `GET /api/bookings/book-property` — Book Property
* `PUT /api/bookings/owner-bookings` — Get owner bookings
* `GET /api/bookings/change-status` — Change Owner Status
* `Post /api/bookings/owner-dashboard` — Get Owner dashboard data

**Image**

* `POST /api/images/user-profile` — Upload User Profile

**Newsletter**

* `POST /api/newsletter/subscribe` — subscribe to news letter


Data model (simplified)

```sql
users(id PK)
property(id PK)
booking(id PK)
newsletter(id PK)
address(id PK)
```

---

## Deployment notes

* Use Docker for both frontend and backend. Provide a `docker-compose.yml` that includes:

  * `db` (postgres)
  * `backend`
  * `frontend`
  * `worker`

* CI (GitHub Actions) workflow suggestion:

  * `lint` -> `test` -> `build` -> `publish` (docker images) -> `deploy` (to Vercel/Heroku/AWS ECS)

* For secrets, use GitHub Secrets, or a dedicated secret manager (AWS Secrets Manager, Vault).

---

## Testing

* Unit tests for backend: Jest + Supertest for API endpoints
* Integration tests: spinning a test database container (Postgres) and running tests against it
* Frontend tests: React Testing Library + Jest

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Write tests and code
4. Submit a PR with description of changes

Please follow a conventional commit style (`feat:`, `fix:`, `chore:`) and keep PRs focused.

---

## What I included in this document

* A polished README scaffold you can paste into `README.md`.
* A mermaid system design diagram (above) that you can copy into GitHub to render.

---

## Folder Structure

```
Nestora/
 ├── backend/                     # Spring Boot API
 │    ├── src/main/java/com/nestora/
 │    │      ├── controller/
 │    │      ├── service/
 │    │      ├── repository/
 │    │      ├── entity/
 │    │      └── config/
 │    ├── src/main/resources/application.properties
 │    └── pom.xml
 │
 ├── nestora-frontend/            # Next.js frontend
 │    ├── app/ or pages/          # Depending on routing mode
 │    ├── components/
 │    ├── lib/
 │    ├── public/
 │    └── next.config.js
 │
 └── README.md
```

---

## Spring Boot Module Breakdown

### **Controller Layer**

* Exposes REST endpoints like `/api/auth`, `/api/users`, etc.
* Converts HTTP requests → service calls.

### **Service Layer**

* Contains business logic.
* Handles validation, workflows, orchestration.

### **Repository Layer**

* JPA Repositories (`extends JpaRepository`)
* Interacts with PostgreSQL.

### **Entity Layer**

* Java classes mapped using `@Entity`.
* Represents tables in PostgreSQL.

### **Config Layer**

* Security config (JWT, filters)
* CORS config
* Swagger/OpenAPI

---

## Next.js Routing Structure

### If using **App Router**:

```
nestora-frontend/
 ├── app/
 │    ├── layout.js
 │    ├── page.js
 │    ├── dashboard/
 │    │       ├── page.js
 │    │       └── components/
 │    └── api/
```

### If using **Pages Router**:

```
nestora-frontend/
 ├── pages/
 │    ├── index.js
 │    ├── login.js
 │    ├── dashboard.js
 │    └── api/
```

### Common Directories

* **components/**: UI reusable components
* **lib/**: API wrappers / helper functions
* **public/**: images, favicon, static assets

---

## API Contracts (Spring Boot → Next.js)

### **Auth API**

#### Login

**POST** `/api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "accessToken": "jwt-token",
  "refreshToken": "jwt-refresh"
}
```

#### Register

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "strongpass123"
}
```

### **Users API**

**GET** `/api/users`

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe"
}
```

---

## ER Diagram (Data Model)

```mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email
        string password_hash
        string role
        datetime created_at
    }

    ITEMS {
        int id PK
        int owner_id FK
        string title
        string description
        json metadata
        datetime created_at
    }

    USERS ||--o{ ITEMS : "owns"
```

---

## UML Class Diagram (Spring Boot)

```mermaid
classDiagram

class UserController {
  +login()
  +register()
  +getProfile()
}

class UserService {
  +login()
  +register()
  +getProfile()
}

class UserRepository {
  +findByEmail()
}

class User {
  -id
  -name
  -email
  -password
}

UserController --> UserService
UserService --> UserRepository
UserRepository --> User
```

---

## Deployment Guide

### **Frontend (Next.js → Vercel)**

1. Push repo to GitHub
2. Import repo in Vercel
3. Set environment variables:

```
NEXT_PUBLIC_API_URL=https://your-backend.com/api
```

4. Deploy → Vercel handles build automatically

### **Backend (Spring Boot → Render / Railway / AWS)**

#### Option 1: Render

* Create new Web Service
* Connect GitHub repository
* Build command:

```
mvn clean package -DskipTests
```

* Start command:

```
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

* Add environment variables:

```
DB_URL=...
DB_USER=...
DB_PASSWORD=...
JWT_SECRET=...
```

#### Option 2: Docker Deployment

Dockerfile example:

```
FROM openjdk:17
COPY target/backend.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

---

